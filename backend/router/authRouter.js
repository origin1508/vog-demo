const Router = require("express").Router;
const router = Router();
const axios = require("axios");
const { jwtDecode } = require("jwt-decode");

const User = require("../models/UserSchema");

const { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, REDIRECT_URI } = process.env;

router.post("/login/:provider", async (req, res) => {
  const { provider } = req.params;
  const { code, state } = req.body;

  const result = await axios.get(
    `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&redirect_uri=http://localhost:3002/auth/login/naver&code=${code}&state=${state}`,
    {
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
      },
    }
  );
  const { access_token, refresh_token } = result.data;

  const infoResult = await axios.get("https://openapi.naver.com/v1/nid/me", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const { id: oauthId } = infoResult.data.response;

  const user = await User.findOne({ oauthId: oauthId });

  if (!user) {
    res.status(200).send({
      success: true,
      message:
        "oauthId는 발급되었지만 해당하는 유저 데이터가 없습니다. 유저 데이터 입력 창으로 리다이렉트 해주세요",
      result: {
        oauthId: oauthId,
        redirectUrl: "http://localhost:3002/sign-up",
      },
    });
  }
});

module.exports = router;
