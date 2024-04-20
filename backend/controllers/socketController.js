const ChatParticipant = require("../models/ChatParticipantSchema");
const Chat = require("../models/ChatSchema");

function setupSocket(io) {
  const chatNamespace = io.of("/chat");

  chatNamespace.on("connection", (socket) => {
    console.log(`${socket.id} socket connected`);

    socket.on("enterChatRoom", async ({ userId, nickname, roomId }) => {
      socket.join(roomId);

      await ChatParticipant.updateOne(
        { userId: userId, roomId: roomId },
        { socketId: socket.id }
      );

      const chatParticipant = await ChatParticipant.find({
        roomId: roomId,
      }).populate("user");

      const { title } = await Chat.findOne({ roomId: roomId });

      chatNamespace.to(roomId).emit("setChat", {
        roomId,
        chatParticipant,
        title,
      });

      socket.to(roomId).emit("welcome", socket.id);
    });

    socket.on("inputChat", ({ content, roomId, nickname }) => {
      socket.to(roomId).emit("inputChat", { content, roomId, nickname });
    });

    socket.on("leaveChatRoom", async ({ userId, roomId }) => {
      await ChatParticipant.deleteOne({ userId: userId });
      await Chat.updateOne({ roomId: roomId }, { $inc: { currentMember: -1 } });

      const { currentMember } = await Chat.findOne({ roomId: roomId });
      if (!currentMember) {
        await Chat.deleteOne({ roomId: roomId });
      }

      const chatParticipant = await ChatParticipant.find({
        roomId: roomId,
      }).populate("user");
      const { title } = await Chat.findOne({ roomId: roomId });

      socket.to(roomId).emit("setChat", { roomId, chatParticipant, title });
      socket.disconnect();
    });

    // webRTC
    socket.on("offer", ({ targetId, offer }) => {
      socket.to(targetId).emit("offer", { socketId: socket.id, offer: offer });
    });

    socket.on("answer", ({ targetId, answer }) => {
      socket
        .to(targetId)
        .emit("answer", { socketId: socket.id, answer: answer });
    });

    socket.on("iceCandidate", ({ targetId, iceCandidate }) => {
      socket
        .to(targetId)
        .emit({ socketId: socket.id, iceCandidate: iceCandidate });
    });
  });
}

module.exports = { setupSocket };
