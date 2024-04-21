import { useEffect } from "react";
// import useStreamState from "@/hooks/useStreamState";
import useUserState from "@/hooks/useUserState";
import useChatState from "@/hooks/useChatState";
import { socketClient } from "@/utils/socketClient";

const Socket = () => {
  const {
    userId,
    user: { nickname },
  } = useUserState();
  const {
    chat: { roomId },
    setChat,
  } = useChatState();

  // const localStreamRef = useRef<MediaStream>();
  // const peerConnectionsRef = useRef<{ [key: string]: RTCPeerConnection }>({});

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

    socketClient.on("inputChat", (data) => {
      setChat((prev) => {
        return {
          ...prev,
          messages: [...prev.messages, { ...data, isSender: false }],
        };
      });
    });

    return () => {
      socketClient.removeAllListeners();
      socketClient.disconnect();
    };
  }, []);

  return <></>;
};

export default Socket;
