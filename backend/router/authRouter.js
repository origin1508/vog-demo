const Router = require("express").Router;
const router = Router();
const axios = require("axios");
const { jwtDecode } = require("jwt-decode");
const jwt = require("../utils/jwt-util");

const User = require("../models/UserSchema");

const {
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET,
  KAKAO_CLIENT_ID,
  KAKAO_CLIENT_SECRET,
} = process.env;

router.post("/login/naver", async (req, res) => {
  const { code, state } = req.body;
  const origin = req.get("origin");

  const result = await axios.get(
    `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&redirect_uri=${origin}/naver&code=${code}&state=${state}`,
    {
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
      },
    }
  );
  const { access_token } = result.data;

  const infoResult = await axios.get("https://openapi.naver.com/v1/nid/me", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const { id: oauthId } = infoResult.data.response;

  const user = await User.findOne({ oauthId: oauthId }).lean();

  if (!user) {
    res.status(200).send({
      success: true,
      message:
        "oauthId는 발급되었지만 해당하는 유저 데이터가 없습니다. 유저 데이터 입력 창으로 리다이렉트 해주세요",
      result: {
        oauthId: oauthId,
        redirectUrl: `${origin}/sign-up`,
      },
    });
  } else {
    const jwtAccessToken = jwt.sign({ id: user.id, nickname: user.nickname });

    res.status(200).send({
      success: true,
      result: {
        ...user,
        jwtAccessToken,
      },
    });
  }
});

router.post("/login/kakao", async (req, res) => {
  const { code, state } = req.body;
  const origin = req.origin;

  const result = await axios.post(
    `https://kauth.kakao.com/oauth/token`,
    {
      grant_type: "authorization_code",
      client_id: KAKAO_CLIENT_ID,
      client_secret: KAKAO_CLIENT_SECRET,
      redirect_uri: `${origin}/kakao`,
      code: code,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }
  );
  const { id_token } = result.data;
  const { sub: oauthId } = jwtDecode(id_token);

  const user = await User.findOne({ oauthId: oauthId }).lean();

  if (!user) {
    res.status(200).send({
      success: true,
      message:
        "oauthId는 발급되었지만 해당하는 유저 데이터가 없습니다. 유저 데이터 입력 창으로 리다이렉트 해주세요",
      result: {
        oauthId: oauthId,
        redirectUrl: `${origin}/sign-up`,
      },
    });
  } else {
    const jwtAccessToken = jwt.sign({ id: user.id, nickname: user.nickname });

    res.status(200).send({
      success: true,
      result: {
        ...user,
        jwtAccessToken,
      },
    });
  }
});

module.exports = router;
