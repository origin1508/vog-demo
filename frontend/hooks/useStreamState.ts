import { useRecoilState, useResetRecoilState } from "recoil";
import { streamState } from "@/recoil/atoms/streamState";

const useStreamState = () => {
  const [streams, setStreams] = useRecoilState(streamState);
  const resetStreams = useResetRecoilState(streamState);

  return { streams, setStreams, resetStreams };
};

export default useStreamState;
