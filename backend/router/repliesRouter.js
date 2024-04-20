const Router = require("express").Router;
const router = Router();

const Reply = require("../models/ReplySchema");

router.post("/", async (req, res) => {
  const { writerId, commentId, content } = req.body;

  try {
    await Reply.create({ writerId, commentId, content });

    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:replyId", async (req, res) => {
  const { replyId } = req.params;
  const { content } = req.body;

  try {
    await Reply.updateOne({ id: replyId }, { content: content });

    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:replyId", async (req, res) => {
  const { replyId } = req.params;

  try {
    await Reply.deleteOne({ id: replyId });

    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
