const Router = require("express").Router;
const router = Router();

const Post = require("../models/PostSchema");

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findOne({ id: postId });

    res.status(200).send({
      success: true,
      result: { userIds: post.likes },
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await Post.findOne({ id: postId });
    post.likes.push(userId);
    post.likeCount++;
    await post.save();

    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await Post.findOne({ id: postId });
    post.likes.pull(userId);
    post.likeCount--;
    await post.save();

    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
