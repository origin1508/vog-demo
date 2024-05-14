const Router = require("express").Router;
const router = Router();
const jwt = require("../utils/jwt-util");

const User = require("../models/UserSchema");

router.post("/register", async (req, res) => {
  const { oauthId, provider, nickname, sex } = req.body;
  try {
    const newUser = await User.create({
      oauthId: oauthId,
      nickname: nickname,
      sex: sex,
      provider: provider,
    });
    const user = newUser.toJSON();

    const jwtAccessToken = jwt.sign({ id: user._id, nickname: user.nickname });

    res.status(200).send({
      success: true,
      result: {
        ...user,
        jwtAccessToken,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).send({
        statusCode: 400,
        error: "이미 존재하는 닉네임입니다.",
      });
    }
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ id: userId });

    res.status(200).send({
      success: true,
      result: user,
    });
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:userId/nickname", async (req, res) => {
  const { userId } = req.params;
  const { newNickname } = req.body;

  try {
    const user = await User.findOne({ id: userId });

    user.nickname = newNickname;
    await user.save();

    res.status(200).send({
      success: true,
      result: { nickname: newNickname },
    });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).send({
        statusCode: 400,
        error: "이미 존재하는 닉네임입니다.",
      });
    }
  }
});

module.exports = router;
