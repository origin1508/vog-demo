import { http, HttpResponse, PathParams } from "msw";
import { comments, users } from "./data";

interface CommentsRequest {
  writerId: number;
  postId: number;
  content: string;
}

interface CommentParams {
  commentId: string;
}

type EditCommentsRequest = Omit<CommentsRequest, "writerId" | "postId">;

export const handler = [
  http.get("/comments", ({ request }) => {
    const url = new URL(request.url);
    const postId = url.searchParams.get("postId");
    const page = url.searchParams.get("page");

    if (postId === null || page === null)
      return HttpResponse.json({ success: false });

    if (!comments[postId]) comments[postId] = [];
    const result = comments[postId];

    return HttpResponse.json({
      success: true,
      result: { result: [...result], totalCount: result.length },
    });
  }),

  http.post<PathParams, CommentsRequest>("/comments", async ({ request }) => {
    const { writerId, postId, content } = await request.json();
    const user = users.find((it) => it.id === writerId);

    if (!user) return HttpResponse.json({}, { status: 404 });

    const createdAt = new Date().toISOString();
    comments[postId].push({
      id: new Date().getMilliseconds(),
      content: content,
      createdAt: createdAt,
      updatedAt: createdAt,
      replies: [],
      user: {
        id: user.id,
        nickname: user.nickname,
        profileUrl: user.profileUrl,
        sex: user.sex,
      },
    });

    return HttpResponse.json({ success: true });
  }),

  http.delete<CommentParams>("/comments/:commentId", ({ params }) => {
    const { commentId } = params;

    const postIds = Object.keys(comments) as (keyof typeof comments)[];
    const postId = postIds.find((k) =>
      comments[k].find((it) => it.id === parseInt(commentId))
    );
    if (!postId) return HttpResponse.json({ status: 404 });

    comments[postId] = comments[postId].filter(
      (it) => it.id !== parseInt(commentId)
    );
    return HttpResponse.json({ success: true });
  }),

  http.patch<CommentParams, EditCommentsRequest>(
    "/comments/:commentId",
    async ({ params, request }) => {
      const { content } = await request.json();
      const { commentId } = params;

      const postIds = Object.keys(comments) as (keyof typeof comments)[];
      const postId = postIds.find((k) =>
        comments[k].find((it) => it.id === parseInt(commentId))
      );
      if (!postId) return HttpResponse.json({ status: 404 });

      comments[postId] = comments[postId].map((it) => {
        if (it.id === parseInt(commentId)) {
          return { ...it, content: content };
        } else return it;
      });
      return HttpResponse.json({ success: true });
    }
  ),
];
