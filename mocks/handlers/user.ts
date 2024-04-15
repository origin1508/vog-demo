import { http, HttpResponse } from "msw";

export const handler = [
  http.get("https://nid.naver.com/oauth2.0/authorize", () => {
    return HttpResponse.json({});
  }),
];
