import {
  ReactNode,
  createContext,
  useRef,
  useContext,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from "react";
import { ExtendedSocket } from "@/utils/socketClient";
import { Stream } from "@/types/chat";

export const PeerConnectionsContext = createContext<
  | {
      ref: MutableRefObject<{
        [key: string]: RTCPeerConnection;
      }>;
      createPeerConnection: (
        socketId: string,
        socket: ExtendedSocket,
        localStreamRef: MutableRefObject<MediaStream | undefined>,
        setStreams: Dispatch<SetStateAction<Stream>>
      ) => RTCPeerConnection;
    }
  | undefined
>(undefined);

export const PeerConnectionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const peerConnectionsRef = useRef<{ [key: string]: RTCPeerConnection }>({});

  const createPeerConnection = (
    socketId: string,
    socket: ExtendedSocket,
    localStreamRef: MutableRefObject<MediaStream | undefined>,
    setStreams: Dispatch<SetStateAction<Stream>>
  ) => {
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun1.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
          ],
        },
      ],
    });

    pc.addEventListener("icecandidate", (e) => {
      console.log("onicecandidate", e.candidate);
      if (e.candidate) {
        socket.emit("iceCandidate", {
          to: socketId,
          iceCandidate: e.candidate,
        });
      }
    });

    pc.addEventListener("track", (e) => {
      console.log("ontrack", e.streams);
      const stream = e.streams[0];
      if (stream) {
        setStreams((prev) => {
          return { ...prev, socketId: stream };
        });
      }
    });

    pc.addEventListener("negotiationneeded", (e) => {
      console.log(e);
    });

    if (localStreamRef.current) {
      const stream = localStreamRef.current;
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
    }

    peerConnectionsRef.current = {
      ...peerConnectionsRef.current,
      [socketId]: pc,
    };

    return pc;
  };

  return (
    <PeerConnectionsContext.Provider
      value={{
        ref: peerConnectionsRef,
        createPeerConnection: createPeerConnection,
      }}
    >
      {children}
    </PeerConnectionsContext.Provider>
  );
};

export const usePeerConnectionsContext = () => {
  const context = useContext(PeerConnectionsContext);
  if (context === undefined) {
    throw new Error("context must be within provider");
  }

  return context;
};
