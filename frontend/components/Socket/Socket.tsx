import { useEffect } from "react";
import useStreamState from "@/hooks/useStreamState";
import useChatState from "@/hooks/useChatState";
import useUserState from "@/hooks/useUserState";
import { useLocalStreamContext, usePeerConnectionsContext } from "@/context";
import { socketClient } from "@/utils/socketClient";
import { Audio } from "../common/";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

const Socket = () => {
  const { userId } = useUserState();
  const { chat, setChat } = useChatState();
  const { streams, setStreams } = useStreamState();
  const { ref: localStreamRef } = useLocalStreamContext();
  const { ref: peerConnectionsRef, createPeerConnection } =
    usePeerConnectionsContext();

  const connectSocket = () => {
    if (userId === null) return;

    const sessionId = getLocalStorage("socketSessionId");
    if (sessionId) {
      socketClient.auth = { sessionId: sessionId };
    }

    socketClient.connect();

    if (!chat.roomId) {
      socketClient.emit("participantRecord");
    }
  };

  useEffect(() => {
    connectSocket();

    socketClient.on("session", ({ sessionId, socketId }) => {
      socketClient.auth = { sessionId };

      setLocalStorage("socketSessionId", sessionId);
      socketClient.socketId = socketId;
    });

    socketClient.on(
      "participantRecord",
      ({ roomId, title, chatParticipant }) => {
        setChat((prev) => {
          return { ...prev, roomId, title, chatParticipant };
        });
      }
    );

    socketClient.on("setChat", ({ roomId, chatParticipant }) => {
      setChat((prev) => {
        return { ...prev, roomId, chatParticipant, isConnected: true };
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
      setStreams((prev) => {
        delete prev.sokcetId;
        return prev;
      });
    });

    // webRTC 시그널링
    socketClient.on("welcome", async (socketId: string) => {
      if (!localStreamRef.current) return;

      const pc = createPeerConnection(
        socketId,
        socketClient,
        localStreamRef,
        setStreams
      );
      await pc.setLocalDescription();
      const offer = pc.localDescription;
      console.log("send offer: ", offer);
      socketClient.emit("offer", { to: socketId, offer: offer });
    });

    socketClient.on("offer", async ({ from, offer }) => {
      console.log("getOffer", from, offer);
      const pc = createPeerConnection(
        from,
        socketClient,
        localStreamRef,
        setStreams
      );
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
      {Object.entries(streams).map(([socketId, stream]) => {
        return (
          <Audio key={socketId} stream={stream} isMuted={chat.isVolumeMuted} />
        );
      })}
    </>
  );
};

export default Socket;
