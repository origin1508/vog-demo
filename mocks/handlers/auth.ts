import { http, HttpResponse } from "msw";
import { user } from "./data";

export const handler = [
  http.post("/auth/login/:provider", ({ params }) => {
    const { provider } = params;

    return HttpResponse.json({ success: true, result: { ...user, provider } });
  }),
];
