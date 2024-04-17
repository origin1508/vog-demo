import profilePic from "./profile.jpg";

export const users = [
  {
    oauthId: "test-oauth",
    id: 0,
    nickname: "테스트",
    sex: "남",
    jwtAccessToken: "test-access-token",
    profileUrl: profilePic,
  },
  {
    oauthId: "test-oauth",
    id: 1,
    nickname: "테스트1",
    sex: "남",
    jwtAccessToken: "test-access-token",
    profileUrl: profilePic,
  },
  {
    oauthId: "test-oauth",
    id: 2,
    nickname: "테스트2",
    sex: "남",
    jwtAccessToken: "test-access-token",
    profileUrl: profilePic,
  },
  {
    oauthId: "test-oauth",
    id: 3,
    nickname: "테스트3",
    sex: "남",
    jwtAccessToken: "test-access-token",
    profileUrl: profilePic,
  },
];

export const posts = {
  free: [
    {
      id: 0,
      writerId: 0,
      title: "",
      content: "",
      view: 0,
      likeCount: 0,
      postCategory: "",
      createAt: "",
      updatedAt: "",
    },
  ],
  humor: [],
  championship: [],
};
