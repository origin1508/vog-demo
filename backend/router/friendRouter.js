const Router = require("express").Router;
const router = Router();

const User = require("../models/UserSchema");
const Friend = require("../models/FriendSchema");

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const friend = await Friend.find({ userId: userId }).populate("following");

    res.status(200).send({
      success: true,
      result: friend,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/search/:nickname", async (req, res) => {
  const { nickname } = req.params;

  try {
    const user = await User.findOne({ nickname: nickname });

    res.status(200).send({
      success: true,
      result: user,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { targetId } = req.body;

  try {
    await Friend.create({ userId: userId, targetId: targetId });

    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { targetId } = req.body;

  try {
    await Friend.deleteOne({ userId: userId, targetId: targetId });

    res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
