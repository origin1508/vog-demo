import { atom } from "recoil";
import { Stream } from "@/types/chat";
import { recoilPersist } from "recoil-persist";
import { sessionStorage } from "@/utils/sessionStorage";

const { persistAtom } = recoilPersist({
  key: "STREAM",
  storage: sessionStorage,
});

export const streamState = atom<Stream[]>({
  key: "Stream",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
