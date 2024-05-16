import { getIcons } from "@/components/icons";

export const COMMUNITY_NAV_MENU = [
  { name: "전체", query: undefined },
  { name: "자유게시판", query: "free" },
  { name: "유머게시판", query: "humor" },
  { name: "대회소식", query: "championship" },
];

export const NAV_MENU = [
  {
    name: "홈",
    pathname: "/",
    icon: getIcons("home", 24),
    loginRquired: false,
  },
  {
    name: "커뮤니티",
    pathname: "/community",
    icon: getIcons("cardList", 24),
    loginRquired: false,
  },
  {
    name: "채팅",
    pathname: "/chat",
    icon: getIcons("chat", 24),
    loginRquired: false,
  },
  {
    name: "마이페이지",
    pathname: "/mypage",
    icon: getIcons("avatar", 24),
    loginRquired: true,
  },
];
