const { randomUUID } = require("crypto");
const Chat = require("../models/ChatSchema");
const ChatParticipant = require("../models/ChatParticipantSchema");
const SocketSession = require("../models/SocketSessionSchema");

function setupSocket(io) {
  const chatNamespace = io.of("/chat");

  chatNamespace.use(async (socket, next) => {
    const sessionId = socket.handshake.auth.sessionId;

    if (sessionId) {
      try {
        const session = await SocketSession.findOneAndUpdate(
          { sessionId: sessionId },
          { online: true }
        );
        if (session) {
          socket.sessionId = sessionId;
          socket.socketId = session.socketId;

          return next();
        } else {
          socket.socketId = randomUUID();

          await SocketSession.create({
            sessionId: sessionId,
            socketId: socket.socketId,
          });
        }
      } catch (err) {
        consol.log(err);
      }
    } else {
      socket.sessionId = randomUUID();
      socket.socketId = randomUUID();

      await SocketSession.create({
        sessionId: socket.sessionId,
        socketId: socket.socketId,
      });

      return next();
    }
  });

  chatNamespace.on("connection", async (socket) => {
    console.log(`${socket.id} socket connected`);

    socket.emit("session", {
      sessionId: socket.sessionId,
      socketId: socket.socketId,
    });

    socket.on("participantRecord", async () => {
      try {
        const participationRecord = await ChatParticipant.findOne({
          socketId: socket.socketId,
        });
        if (participationRecord) {
          const chat = await Chat.findOne({
            roomId: participationRecord.roomId,
          });
          const chatParticipant = await ChatParticipant.find({
            roomId: participationRecord.roomId,
          }).populate("user");

          socket.emit("participantRecord", {
            roomId: chat.roomId,
            title: chat.title,
            chatParticipant,
          });
        }
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("enterChatRoom", async ({ userId, roomId }) => {
      socket.join(roomId);
      socket.join(socket.socketId);

      await ChatParticipant.updateOne(
        { userId: userId, roomId: roomId },
        { socketId: socket.socketId }
      );

      const chatParticipant = await ChatParticipant.find({
        roomId: roomId,
      }).populate("user");

      chatNamespace.to(roomId).emit("setChat", {
        roomId,
        chatParticipant,
      });
    });

    socket.on("enterVoiceChat", (roomId) => {
      socket.to(roomId).emit("welcome", socket.socketId);
    });

    socket.on("inputChat", ({ content, roomId, nickname, profileUrl }) => {
      socket.to(roomId).emit("inputChat", { content, nickname, profileUrl });
    });

    socket.on("leaveChatRoom", async ({ userId, roomId }) => {
      await ChatParticipant.deleteOne({ userId: userId });
      await Chat.updateOne({ roomId: roomId }, { $inc: { currentMember: -1 } });

      const { currentMember } = await Chat.findOne({ roomId: roomId });
      if (!currentMember) {
        await Chat.deleteOne({ roomId: roomId });
      } else {
        const chatParticipant = await ChatParticipant.find({
          roomId: roomId,
        }).populate("user");
        const { title } = await Chat.findOne({ roomId: roomId });

        socket.to(roomId).emit("setChat", { roomId, chatParticipant, title });
      }
    });

    // webRTC
    socket.on("offer", ({ to, offer }) => {
      socket.to(to).emit("offer", {
        from: socket.socketId,
        offer: offer,
      });
    });

    socket.on("answer", ({ to, answer }) => {
      socket.to(to).emit("answer", {
        from: socket.socketId,
        answer: answer,
      });
    });

    socket.on("iceCandidate", ({ to, iceCandidate }) => {
      socket.to(to).emit("iceCandidate", {
        from: socket.socketId,
        iceCandidate: iceCandidate,
      });
    });

    socket.on("disconnect", async () => {
      try {
        await SocketSession.updateOne(
          { sessionId: socket.sessionId },
          { online: false }
        );

        setTimeout(async () => {
          try {
            const session = await SocketSession.findOne({
              sessionId: socket.sessionId,
            });

            if (!session.online) {
              const chatParticipant = await ChatParticipant.findOneAndDelete({
                socketId: session.socketId,
              });

              if (chatParticipant === null) return;

              const roomId = chatParticipant.roomId;

              await Chat.updateOne(
                { roomId: roomId },
                { $inc: { currentMember: -1 } }
              );

              const { currentMember } = await Chat.findOne({ roomId: roomId });
              if (!currentMember) {
                await Chat.deleteOne({ roomId: roomId });
              } else {
                const chatParticipant = await ChatParticipant.find({
                  roomId: roomId,
                }).populate("user");
                const { title } = await Chat.findOne({ roomId: roomId });

                socket
                  .to(roomId)
                  .emit("setChat", { roomId, chatParticipant, title });
              }
            }
          } catch (err) {
            console.log(err);
          }
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    });
  });
}

module.exports = { setupSocket };
