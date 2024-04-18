import { StaticImageData } from "next/image";
import profilePic from "./profile.jpg";
import { Comment, ContentDetail } from "@/types/community";

interface User {
  oauthId: string;
  id: number;
  nickname: string;
  sex: "남" | "여";
  jwtAccessToken: string;
  profileUrl: StaticImageData | string;
}
interface Post extends Omit<ContentDetail, "user"> {
  likes: number[];
  writerId: number;
  postCategory: "free" | "humor" | "championship";
}

interface Posts {
  free: Post[];
  humor: Post[];
  championship: Post[];
}

interface Comments {
  [key: string]: Comment[];
}

export const users: User[] = [
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

export const posts: Posts = {
  free: [
    {
      id: 0,
      writerId: 0,
      title: "",
      content: "",
      view: 0,
      likeCount: 0,
      likes: [],
      postCategory: "free",
      createdAt: "2024-04-18T11:03:43.315Z",
      updatedAt: "2024-04-18T11:03:43.315Z",
    },
  ],
  humor: [],
  championship: [],
};

export const comments: Comments = {};
