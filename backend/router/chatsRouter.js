const Router = require("express").Router;
const router = Router();

const Chat = require("../models/ChatSchema");
const ChatParticipant = require("../models/ChatParticipantSchema");

const chatPerPage = 20;

router.get("/rooms/list", async (req, res) => {
  const { page } = req.query;

  try {
    const chat = await Chat.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * chatPerPage)
      .limit(chatPerPage);

    res.status(200).send({
      success: true,
      result: { result: chat, totalCount: chat.length },
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/rooms", async (req, res) => {
  const { userId, title, game, maximumMember } = req.body;

  try {
    const chatParticipant = await ChatParticipant.findOne({ userId: userId });
    if (!chatParticipant) {
      const chat = await Chat.create({
        title,
        game,
        maximumMember,
        currentMember: 1,
      });

      await ChatParticipant.create({ userId: userId, roomId: chat.roomId });

      res.status(200).send({ success: true, result: { roomId: chat.roomId } });
    } else {
      res.status(401).send({
        success: false,
        statusCode: 401,
        error: "이미 참여 중인 채팅방이 존재합니다.",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/rooms/info", async (req, res) => {
  try {
    const chat = await Chat.find().sort({ createdAt: -1 }).limit(8);

    res.status(200).send({ success: true, result: { latestChatRoom: chat } });
  } catch (err) {
    console.log(err);
  }
});

router.get("/rooms/:roomId", async (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.query;

  try {
    const chat = await Chat.findOne({ roomId: roomId });
    if (!chat) {
      res.status(400).send({
        success: false,
        statusCode: 400,
        error: "존재하지 않는 방 입니다.",
      });
    } else {
      await ChatParticipant.create({ userId: userId, roomId: roomId });

      chat.currentMember++;
      await chat.save();

      res.status(200).send({
        success: true,
        result: { title: chat.title, canParticipant: true },
      });
    }
  } catch (err) {
    console.log(err);
    if (err.name === "ValidationError") {
      res.status(400).send({
        success: false,
        statusCode: 400,
        error: "이미 가득 찬 방입니다.",
      });
    }

    if (err.code === 11000) {
      res.status(401).send({
        success: false,
        statusCode: 401,
        error: "이미 참여 중인 채팅방이 존재합니다.",
      });
    }
  }
});

router.get("/rooms", async (req, res) => {
  const { title } = req.query;

  const reg = new RegExp(`${title}`, "g");
  try {
    const chat = await Chat.find({ title: reg });

    res.status(200).send({
      success: true,
      result: {
        searchedResult: chat,
        totalCount: chat.length,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
