import { ReactNode } from "react";
import tw from "twin.macro";

interface RightProps {
  children: ReactNode;
}

export const MyPageCardRight = ({ children }: RightProps) => {
  return <RightContainer>{children}</RightContainer>;
};

const RightContainer = tw.div`
  w-full p-16 bg-stone-800
`;
