import { http, HttpResponse } from "msw";
import { users, friends } from "./data";

interface FriendParams {
  userId: string;
}

interface FriendRequest {
  targetId: number;
}

interface SearchFriendParams {
  nickname: string;
}

export const handler = [
  http.get<FriendParams>("/friend/:userId", ({ params }) => {
    const { userId } = params;
    const result = friends[userId];

    return HttpResponse.json({ success: true, result: result });
  }),

  http.get<SearchFriendParams>("/friend/search/:nickname", ({ params }) => {
    const { nickname } = params;
    const result = users.find((it) => it.nickname === nickname);

    return HttpResponse.json({ success: true, result: result });
  }),

  http.post<FriendParams, FriendRequest>(
    "/friend/:userId",
    async ({ params, request }) => {
      const { userId } = params;
      const { targetId } = await request.json();

      const target = users.find((it) => it.id === targetId);
      friends[userId].push({
        userId: parseInt(userId),
        following: {
          id: target!.id,
          nickname: target!.nickname,
          email: "",
          profileUrl: target!.profileUrl,
          sex: target!.sex,
          createdAt: "",
          updatedAt: "",
        },
      });

      return HttpResponse.json({ success: true });
    }
  ),

  http.patch<FriendParams, FriendRequest>(
    "/friend/:userId",
    async ({ params, request }) => {
      const { userId } = params;
      const { targetId } = await request.json();

      friends[userId] = friends[userId].filter(
        (it) => it.following.id !== targetId
      );

      return HttpResponse.json({ success: true });
    }
  ),
];
