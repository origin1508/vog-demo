import tw from "twin.macro";
import useLoadingState from "@/hooks/useLoadingState";
import Circle from "./Circle";

export const Loading = () => {
  const { isLoading } = useLoadingState();
  return <LoadingContainer>{isLoading && <Circle />}</LoadingContainer>;
};

const LoadingContainer = tw.div``;
