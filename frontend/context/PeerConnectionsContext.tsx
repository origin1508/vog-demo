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
      closePeerConnection: () => void;
      switchingAudio: (audioTrack: MediaStreamTrack) => void;
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

  const switchingAudio = (audioTrack: MediaStreamTrack) => {
    const peerConnections = peerConnectionsRef.current;
    Object.values(peerConnections).forEach((pc) => {
      const sender = pc.getSenders().find((s) => s.track?.kind === "audio");
      if (sender) {
        sender.replaceTrack(audioTrack);
      }
    });
  };

  const closePeerConnection = () => {
    peerConnectionsRef.current = {};
  };

  return (
    <PeerConnectionsContext.Provider
      value={{
        ref: peerConnectionsRef,
        createPeerConnection: createPeerConnection,
        closePeerConnection: closePeerConnection,
        switchingAudio: switchingAudio,
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
