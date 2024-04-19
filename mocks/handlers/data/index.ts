import { Comment, ContentDetail } from "@/types/community";
import { Friend } from "@/types/friend";
import { ChatRoom } from "@/types/chat";

interface User {
  oauthId: string;
  id: number;
  nickname: string;
  sex: "남" | "여";
  jwtAccessToken: string;
  profileUrl: string;
}
interface Post extends Omit<ContentDetail, "user"> {
  likes: number[];
  writerId: number;
  postCategory: "free" | "humor" | "championship";
  user: User;
}

interface Posts {
  free: Post[];
  humor: Post[];
  championship: Post[];
}

interface Comments {
  [key: string]: Comment[];
}

interface Likes {
  [key: string]: number[];
}

interface Friends {
  [key: string]: Friend[];
}

export const users: User[] = [
  {
    oauthId: "test-oauth",
    id: 0,
    nickname: "테스트",
    sex: "남",
    jwtAccessToken: "test-access-token",
    profileUrl: "/_next/static/media/profile.74838f04.jpg",
  },
  {
    oauthId: "test-oauth",
    id: 1,
    nickname: "테스트1",
    sex: "남",
    jwtAccessToken: "test-access-token",
    profileUrl: "/_next/static/media/profile.74838f04.jpg",
  },
  {
    oauthId: "test-oauth",
    id: 2,
    nickname: "테스트2",
    sex: "남",
    jwtAccessToken: "test-access-token",
    profileUrl: "/_next/static/media/profile.74838f04.jpg",
  },
  {
    oauthId: "test-oauth",
    id: 3,
    nickname: "테스트3",
    sex: "남",
    jwtAccessToken: "test-access-token",
    profileUrl: "/_next/static/media/profile.74838f04.jpg",
  },
];

export const posts: Posts = {
  free: [
    {
      id: 0,
      writerId: 0,
      title: "테스트",
      content: "테스트 중",
      view: 0,
      likeCount: 0,
      likes: [],
      postCategory: "free",
      createdAt: "2024-04-18T11:03:43.315Z",
      updatedAt: "2024-04-18T11:03:43.315Z",
      user: {
        oauthId: "test-oauth",
        id: 0,
        nickname: "테스트",
        sex: "남",
        jwtAccessToken: "test-access-token",
        profileUrl: "/_next/static/media/profile.74838f04.jpg",
      },
    },
  ],
  humor: [],
  championship: [],
};

export const likes: Likes = { "0": [] };

export const comments: Comments = { "0": [] };

export const friends: Friends = { "0": [] };

export const rooms: ChatRoom[] = [];

export const addInformation = (posts: Post[]) => {
  return posts.map((it) => {
    const commentCount = comments[it.writerId].length;
    const likeCount = likes[it.id].length;
    return { ...it, likeCount: likeCount, commentCount: commentCount };
  });
};
