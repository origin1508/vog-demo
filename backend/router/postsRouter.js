const Router = require("express").Router;
const router = Router();

const Post = require("../models/PostSchema");

router.get("/", async (req, res) => {
  const { board, page } = req.query;

  const post = await Post.find({ postCategory: board })
    .populate("user")
    .populate("comment")
    .sort({ createdAt: -1 })
    .lean();

  const modifiedPost = post.map((it) => {
    const repliesCount = it.comment.reduce(
      (acc, cur) => (acc += cur.repliesCount),
      0
    );
    const commentCount = it.comment.length + repliesCount;
    return { ...it, commentCount: commentCount };
  });

  res.status(200).send({
    success: true,
    result: { result: modifiedPost, totalCount: post.length },
  });
});

router.post("/", async (req, res) => {
  const { writerId, title, content, postCategory } = req.body;

  try {
    const post = await Post.create({ writerId, title, content, postCategory });

    res.status(200).send({
      success: true,
      result: { id: post.id, postCategory: post.postCategory },
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findOne({ id: postId }).populate("user");
    post.$inc("view", 1);
    await post.save();

    res.status(200).send({
      success: true,
      result: post,
    });
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  try {
    const post = await Post.findOneAndUpdate(
      { id: postId },
      { title: title, content: content },
      { returnDocument: "after" }
    );

    res.status(200).send({
      success: true,
      result: post,
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    await Post.deleteOne({ id: postId });

    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
