import Socket from "./Socket";
import useChatState from "@/hooks/useChatState";

const SocketContainer = () => {
  const {
    chat: { roomId },
  } = useChatState();

  return <>{roomId && <Socket />}</>;
};

export default SocketContainer;
