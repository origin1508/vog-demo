import { http, HttpResponse } from "msw";
import { likes } from "./data";

interface LikeParams {
  postId: string;
}

interface LikeRequest {
  userId: number;
}

export const handler = [
  http.get<LikeParams>("/like/:postId", ({ params }) => {
    const { postId } = params;
    const result = likes[postId];

    return HttpResponse.json({
      success: true,
      result: { userIds: result },
    });
  }),

  http.post<LikeParams, LikeRequest>(
    "/like/:postId",
    async ({ params, request }) => {
      const { postId } = params;
      const { userId } = await request.json();

      likes[postId].push(userId);

      return HttpResponse.json({ success: true });
    }
  ),

  http.patch<LikeParams, LikeRequest>(
    "/like/:postId",
    async ({ params, request }) => {
      const { postId } = params;
      const { userId } = await request.json();

      likes[postId] = likes[postId].filter((it) => it !== userId);

      return HttpResponse.json({ success: true });
    }
  ),
];
