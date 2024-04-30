import { useState, useRef, KeyboardEvent, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import useChatState from "@/hooks/useChatState";
import {
  socketClient,
  enterRoomEmit,
  sendMessageEmit,
  leaveRoomEmit,
} from "@/utils/socketClient";
import useUser from "@/hooks/useUserState";

const useChatSocket = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const { user, userId } = useUser();
  const {
    setChat,
    chat: { title, roomId, messages },
    resetChat,
  } = useChatState();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages]);

  const enterRoom = () => {
    if (userId === null) return;

    enterRoomEmit(userId, roomId);
  };

  const handleMessageSend = () => {
    if (!message) return;
    setChat((prev) => {
      return {
        ...prev,
        messages: [
          ...prev.messages,
          {
            content: message,
            nickname: user.nickname,
            profileUrl: user.profileUrl,
            isSender: true,
          },
        ],
      };
    });
    sendMessageEmit(message, roomId, user.nickname, user.profileUrl);
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
    setMessage("");
  };

  const handleChatRoomLeave = () => {
    if (userId === null) return;
    leaveRoomEmit(userId, roomId);
    resetChat();
    router.push("/chat");
  };

  const handleTextAreaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      buttonRef.current?.click();
    }
    return;
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    const scrollHeight = e.target.scrollHeight;
    const message = e.target.value.trim();
    if (message) {
      setMessage(message);
    }
    e.target.style.height = scrollHeight + "px";
  };

  return {
    title,
    messages,
    socketClient,
    buttonRef,
    textareaRef,
    scrollRef,
    enterRoom,
    handleMessageSend,
    handleChatRoomLeave,
    handleTextAreaKeyDown,
    handleTextAreaChange,
  };
};

export default useChatSocket;
