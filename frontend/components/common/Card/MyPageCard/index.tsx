import { ReactNode } from "react";
import tw from "twin.macro";
import { MyPageCardLeft } from "./MyPageCardLeft";
import { MyPageCardRight } from "./MyPageCardRight";

interface MyPageCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const MyPageCard = ({
  title,
  description,
  children,
}: MyPageCardProps) => {
  return (
    <MyPageCardContainer>
      <MyPageCardLeft title={title} description={description} />
      <MyPageCardRight>{children}</MyPageCardRight>
    </MyPageCardContainer>
  );
};

const MyPageCardContainer = tw.div`
  flex w-full bg-zinc-100 py-6 rounded
`;
