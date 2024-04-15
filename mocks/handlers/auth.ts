import { http, HttpResponse } from "msw";
import { users } from "./data";

export const handler = [
  http.post("/auth/login/:provider", ({ params }) => {
    const { provider } = params;
    const user = users[0];

    return HttpResponse.json({ success: true, result: { ...user, provider } });
  }),
];
