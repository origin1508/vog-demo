import { http, HttpResponse, PathParams, StrictRequest } from "msw";
import { users } from "./data";

interface UserParams extends PathParams {
  userId: string;
}

export const handler = [
  http.get<UserParams>("/users/:userId", ({ params }) => {
    const { userId } = params;
    const user = users.filter((it) => it.id === parseInt(userId));
    return HttpResponse.json({ success: true, result: { ...user[0] } });
  }),

  http.patch("/uploads/users/:userId", async ({ request }) => {
    const data = await request.formData();
    const image = data.get("image") as Blob;

    const profileUrl = URL.createObjectURL(image);
    return HttpResponse.json({
      success: true,
      result: { profileUrl: profileUrl },
    });
  }),

  http.patch(
    "/users/:userId/nickname",
    async ({
      request,
    }: {
      request: StrictRequest<{ newNickname: string }>;
    }) => {
      const { newNickname } = await request.json();

      return HttpResponse.json({
        success: true,
        result: { nickname: newNickname },
      });
    }
  ),

  http.delete(
    "/users/:userId/withdrawal",
    async ({ request }: { request: StrictRequest<{ password: string }> }) => {
      const { password } = await request.json();

      if (password !== "test1234")
        return HttpResponse.json({
          success: false,
          error: "비밀번호가 틀렸습니다.",
        });
      return HttpResponse.json({ success: true });
    }
  ),
];
