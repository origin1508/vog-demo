const Router = require("express").Router;
const router = Router();

const Comment = require("../models/CommentSchema");

const commentPerPage = 10;

router.get("/", async (req, res) => {
  const { postId, page } = req.query;

  try {
    const comment = await Comment.find({ postId: postId })
      .skip((page - 1) * commentPerPage)
      .limit(commentPerPage)
      .populate("user")
      .populate({ path: "replies", populate: "user" });

    const totalCount = await Comment.countDocuments();

    res.status(200).send({
      success: true,
      result: { result: comment, totalCount: totalCount },
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const { writerId, postId, content } = req.body;

  try {
    const comment = await Comment.create({
      writerId,
      postId,
      content,
    });

    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:commentId", async (req, res) => {
  const { commentId } = req.params;

  try {
    await Comment.deleteOne({ id: commentId });

    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    await Comment.updateOne({ id: commentId }, { content: content });

    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
