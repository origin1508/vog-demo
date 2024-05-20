import { http, HttpResponse, PathParams } from "msw";
import { rooms } from "./data";

interface ChatRequest {
  userId: number;
  title: string;
  game: "lol" | "valorant" | "etc";
  maximumMember: number;
}

interface JoinChatParams {
  roomId: string;
}

export const handler = [
  http.get("/chats/rooms/list", ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");

    if (!page) return HttpResponse.json({}, { status: 404 });

    return HttpResponse.json({
      success: true,
      result: { result: rooms, totalCount: rooms.length },
    });
  }),

  http.get("http://localhost:3002/chats/rooms/list", ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");

    if (!page) return HttpResponse.json({}, { status: 404 });

    return HttpResponse.json({
      success: true,
      result: { result: rooms, totalCount: rooms.length },
    });
  }),

  http.post<PathParams, ChatRequest>("/chats/rooms", async ({ request }) => {
    const { title, game, maximumMember } = await request.json();
    const createdAt = new Date().toISOString();
    const roomId = new Date().getMilliseconds().toString();

    rooms.push({
      roomId: roomId,
      title: title,
      game: game,
      currentMember: 1,
      maximumMember: maximumMember,
      no: 1,
      createdAt: createdAt,
      updatedAt: createdAt,
    });

    return HttpResponse.json({ success: true, result: { roomId: roomId } });
  }),

  http.get<JoinChatParams>("/chats/rooms/:roomId", ({ params, request }) => {
    const { roomId } = params;
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) return HttpResponse.json({}, { status: 404 });

    if (
      rooms[parseInt(roomId)].currentMember <
      rooms[parseInt(roomId)].maximumMember
    ) {
      rooms[parseInt(roomId)].currentMember++;
      return HttpResponse.json({
        success: true,
        result: { canParticipant: true },
      });
    } else return HttpResponse.json({ error: "인원이 꽉 찼습니다." });
  }),

  http.get("/chats/rooms", ({ request }) => {
    const url = new URL(request.url);
    const title = url.searchParams.get("title");

    if (!title) return HttpResponse.json({}, { status: 404 });

    const reg = new RegExp(`${title}`, "g");
    const searchedResult = rooms.filter((it) => it.title.match(reg));

    return HttpResponse.json({
      success: true,
      result: {
        searchedResult: searchedResult,
        totalCount: searchedResult.length,
      },
    });
  }),
];
