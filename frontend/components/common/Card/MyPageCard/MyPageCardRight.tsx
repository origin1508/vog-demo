import { ReactNode } from "react";
import tw from "twin.macro";

interface MyPageCardRightProps {
  children: ReactNode;
}

export const MyPageCardRight = ({ children }: MyPageCardRightProps) => {
  return <RightContainer>{children}</RightContainer>;
};

const RightContainer = tw.div`
  w-full p-16
`;
