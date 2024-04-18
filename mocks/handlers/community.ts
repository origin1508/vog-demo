import { http, HttpResponse, PathParams } from "msw";
import { users, posts } from "./data";

interface CreatePostRequest {
  writerId: number;
  title: string;
  content: string;
  postCategory?: "free" | "humor" | "championship";
}

interface EditPostRequest
  extends Omit<CreatePostRequest, "postCategory" | "writerId"> {}

interface PostParams {
  postId: string;
}

export const handler = [
  http.get("/post", ({ request }) => {
    const url = new URL(request.url);
    const board = url.searchParams.get("board");
    if (board === "free" || board === "humor" || board === "championship") {
      const result = posts[board].map((it) => {
        const writerId = it.writerId;
        const writer = users.find((user) => user.id === writerId);
        return { ...it, user: { id: writer?.id, nickname: writer?.nickname } };
      });

      return HttpResponse.json({
        success: true,
        result: { result: [...result] },
      });
    }

    return new HttpResponse(null, { status: 404 });
  }),

  http.get("http://localhost:3002/posts", ({ request }) => {
    const url = new URL(request.url);
    const board = url.searchParams.get("board");
    if (board === "free" || board === "humor" || board === "championship") {
      const result = posts[board].map((it) => {
        const writerId = it.writerId;
        const writer = users.find((user) => user.id === writerId);
        return { ...it, user: { id: writer?.id, nickname: writer?.nickname } };
      });

      return HttpResponse.json({
        success: true,
        result: { result: [...result] },
      });
    }

    return new HttpResponse(null, { status: 404 });
  }),

  http.post<PathParams, CreatePostRequest>("/posts", async ({ request }) => {
    const { writerId, title, content, postCategory } = await request.json();
    const id = new Date().getTime();
    const createdAt = new Date().toISOString();
    let category: "free" | "humor" | "championship";
    if (!postCategory) category = "free";
    else category = postCategory;
    posts[category].unshift({
      id: id,
      writerId: writerId,
      title: title,
      content: content,
      view: 0,
      likeCount: 0,
      likes: [],
      postCategory: category,
      createdAt: createdAt,
      updatedAt: createdAt,
    });

    return HttpResponse.json({
      success: true,
      result: { id: id, postCategory: category },
    });
  }),

  http.patch<PostParams, EditPostRequest>(
    "/posts/:postId",
    async ({ params, request }) => {
      const { postId } = params;
      const { title, content } = await request.json();

      const categories = Object.keys(posts) as (keyof typeof posts)[];
      const category = categories.find((k) =>
        posts[k].find((it) => it.id === parseInt(postId))
      );
      if (!category) return HttpResponse.json({ status: 404 });

      posts[category] = posts[category].map((it) => {
        if (it.id === parseInt(postId)) {
          return {
            ...it,
            title: title,
            content: content,
            updatedAt: new Date().toISOString(),
          };
        } else return it;
      });

      return HttpResponse.json({
        success: true,
        result: {
          title: title,
          content: content,
          id: postId,
          postCategory: category,
        },
      });
    }
  ),

  http.get<PostParams>("/posts/:postId", ({ params }) => {
    const { postId } = params;
    const result = Object.values(posts)
      .flat()
      .find((it) => it.id === parseInt(postId));

    const user = users.find((it) => it.id === result.writerId);
    return HttpResponse.json({
      success: true,
      result: { ...result, user: user },
    });
  }),

  http.delete<PostParams>("/posts/:postId", ({ params }) => {
    const { postId } = params;

    const categories = Object.keys(posts) as (keyof typeof posts)[];
    const category = categories.find((k) =>
      posts[k].find((it) => it.id === parseInt(postId))
    );
    if (!category) return HttpResponse.json({ status: 404 });

    posts[category] = posts[category].filter(
      (it) => it.id !== parseInt(postId)
    );

    return HttpResponse.json({ success: true });
  }),
];
