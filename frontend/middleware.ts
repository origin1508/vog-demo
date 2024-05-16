import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (!request.cookies.get("ACCESS_TOKEN")) {
    return NextResponse.redirect(
      new URL("/login?alert=로그인 후 이용이 가능한 서비스입니다", request.url)
    );
  }
}

// See "Matching Paths" below to learn more
export const config = { matcher: ["/community/edit", "/mypage"] };
