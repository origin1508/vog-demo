import { useEffect, useRef } from "react";
import useStreamState from "@/hooks/useStreamState";
import useUserState from "@/hooks/useUserState";
import useChatState from "@/hooks/useChatState";
import { socketClient } from "@/utils/socketClient";
import Audio from "../common/Audio";

const Socket = () => {
  const {
    userId,
    user: { nickname },
  } = useUserState();
  const {
    chat: { roomId },
    setChat,
  } = useChatState();
  const { streams, setStreams } = useStreamState();

  const localStreamRef = useRef<MediaStream>();
  const peerConnectionsRef = useRef<{ [key: string]: RTCPeerConnection }>({});

  const createPeerConnection = (socketId: string) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.addEventListener("icecandidate", (e) => {
      if (e.candidate) {
        console.log("onicecandidate", e.candidate);
        socketClient.emit("iceCandidate", {
          targetId: socketId,
          iceCandidate: e.candidate,
        });
      }
    });

    pc.addEventListener("track", (e) => {
      console.log("ontrack", e.streams);
      const stream = e.streams[0];
      if (stream) {
        setStreams((prev) => [...prev, { socketId, stream }]);
      }
    });

    if (localStreamRef.current) {
      const localStream = localStreamRef.current;
      localStream.getAudioTracks().forEach((track) => {
        if (!localStream) return;
        pc.addTrack(track, localStream);
      });
    }

    peerConnectionsRef.current = {
      ...peerConnectionsRef.current,
      [socketId]: pc,
    };

    return pc;
  };

  const socketConnect = () => {
    if (!userId) return;

    socketClient.connect();
    socketClient.emit("enterChatRoom", { userId, nickname, roomId });
  };

  useEffect(() => {
    socketConnect();

    socketClient.on("setChat", ({ roomId, chatParticipant }) => {
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

    // // webRTC 시그널링
    // socketClient.on("welcome", async (socketId) => {
    //   const pc = createPeerConnection(socketId);
    //   const offer = await pc.createOffer({
    //     offerToReceiveAudio: true,
    //   });
    //   pc.setLocalDescription(offer);
    //   console.log("send offer: ", offer);
    //   socketClient.emit("offer", { targetId: socketId, offer: offer });
    // });

    // socketClient.on("offer", async (data) => {
    //   const { socketId, offer } = data;
    //   console.log("getOffer", socketId, offer);
    //   const pc = createPeerConnection(socketId);
    //   await pc.setRemoteDescription(offer);
    //   const answer = await pc.createAnswer({
    //     offerToReceiveAudio: true,
    //   });
    //   pc.setLocalDescription(answer);
    //   console.log("send answer: ", answer);
    //   socketClient.emit("answer", { targetId: socketId, answer: answer });
    // });

    // socketClient.on("answer", async (data) => {
    //   const { socketId, answer } = data;
    //   console.log("getAnswer", socketId, answer);
    //   const pc = peerConnectionsRef.current[socketId];

    //   await pc.setRemoteDescription(answer);
    // });

    // socketClient.on("iceCandidate", (data) => {
    //   const { socketId } = data;
    //   const iceCandidate = new RTCIceCandidate(data.iceCandidate);
    //   const peerConnection = peerConnectionsRef.current[socketId];
    //   console.log("getCandidate", socketId, iceCandidate, peerConnection);
    //   peerConnection.addIceCandidate(iceCandidate);
    // });

    return () => {
      socketClient.removeAllListeners();
      socketClient.disconnect();
    };
  }, []);

  return (
    <>
      {streams.map(({ socketId, stream }) => (
        <Audio key={socketId} stream={stream} isMuted={false} />
      ))}
    </>
  );
};

export default Socket;
