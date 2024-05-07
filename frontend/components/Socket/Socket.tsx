import { useEffect, useRef } from "react";
import useStreamState from "@/hooks/useStreamState";
import useChatState from "@/hooks/useChatState";
import useUserState from "@/hooks/useUserState";
import { socketClient } from "@/utils/socketClient";
import { Audio } from "../common/";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

const Socket = () => {
  const { userId } = useUserState();
  const { setChat } = useChatState();
  const { streams, setStreams } = useStreamState();

  const localStreamRef = useRef<MediaStream>();
  const peerConnectionsRef = useRef<{ [key: string]: RTCPeerConnection }>({});

  const getLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStreamRef.current = stream;
    } catch (err) {
      console.log(err);
    }
  };

  const createPeerConnection = (socketId: string) => {
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
        socketClient.emit("iceCandidate", {
          to: socketId,
          iceCandidate: e.candidate,
        });
      }
    });

    pc.addEventListener("track", (e) => {
      console.log("ontrack", e.streams);
      const stream = e.streams[0];
      if (stream) {
        setStreams((prev) => [...prev, { [socketId]: stream }]);
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

  const connectSocket = () => {
    if (userId === null) return;

    const sessionId = getLocalStorage("socketSessionId");
    if (sessionId) {
      socketClient.auth = { sessionId: sessionId };
    }

    socketClient.connect();
  };

  useEffect(() => {
    connectSocket();
    getLocalStream();

    socketClient.on("session", ({ sessionId, socketId }) => {
      socketClient.auth = { sessionId };

      setLocalStorage("socketSessionId", sessionId);
      socketClient.socketId = socketId;
    });

    socketClient.on("setChat", ({ roomId, chatParticipant }) => {
      console.log(chatParticipant);
      setChat((prev) => {
        return { ...prev, roomId, chatParticipant };
      });
    });

    socketClient.on("inputChat", ({ content, nickname, profileUrl }) => {
      setChat((prev) => {
        return {
          ...prev,
          messages: [
            ...prev.messages,
            { content, nickname, profileUrl, isSender: false },
          ],
        };
      });
    });

    socketClient.on("leaveMember", ({ socketId }) => {
      console.log("유저나감", socketId, peerConnectionsRef.current);
      peerConnectionsRef.current[socketId].close();
    });

    // webRTC 시그널링
    socketClient.on("welcome", async (socketId) => {
      const pc = createPeerConnection(socketId);
      await pc.setLocalDescription();
      const offer = pc.localDescription;
      console.log("send offer: ", offer);
      socketClient.emit("offer", { to: socketId, offer: offer });
    });

    socketClient.on("offer", async ({ from, offer }) => {
      console.log("getOffer", from, offer);
      const pc = createPeerConnection(from);
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      await pc.setLocalDescription();
      const answer = pc.localDescription;
      console.log("send answer: ", answer);
      socketClient.emit("answer", { to: from, answer: answer });
    });

    socketClient.on("answer", async ({ from, answer }) => {
      console.log("getAnswer", from, answer);
      const pc = peerConnectionsRef.current[from];
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socketClient.on("iceCandidate", ({ from, iceCandidate }) => {
      const peerConnection = peerConnectionsRef.current[from];
      console.log(
        "getCandidate",
        from,
        new RTCIceCandidate(iceCandidate),
        peerConnection
      );
      peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
    });

    return () => {
      socketClient.removeAllListeners();
      socketClient.disconnect();
    };
  }, []);

  return (
    <>
      {streams.map((stream) => (
        <Audio
          key={Object.keys(stream)[0]}
          stream={Object.values(stream)[0]}
          isMuted={false}
        />
      ))}
    </>
  );
};

export default Socket;
