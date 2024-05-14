import { Socket, io } from "socket.io-client";

interface ExtendedSocket extends Socket {
  socketId?: string;
}

export const socketClient: ExtendedSocket = io(
  `${process.env.NEXT_PUBLIC_SOCKET}/chat`,
  {
    transports: ["websocket", "polling"],
    autoConnect: false,
    closeOnBeforeunload: true,
  }
);

export const sendMessageEmit = (
  content: string,
  roomId: string,
  nickname: string,
  profileUrl: string
) => {
  socketClient.emit("inputChat", {
    content,
    roomId,
    nickname,
    profileUrl,
  });
};

export const leaveRoomEmit = (userId: number, roomId: string) => {
  socketClient.emit("leaveChatRoom", {
    userId,
    roomId,
  });
};

export const enterRoomEmit = (userId: number, roomId: string) => {
  socketClient.emit("enterChatRoom", {
    userId,
    roomId,
  });
};

export const enterVoiceChat = (roomId: string) => {
  socketClient.emit("enterVoiceChat", roomId);
};
