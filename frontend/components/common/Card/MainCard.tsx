import { ReactNode } from "react";
import tw from "twin.macro";

interface MainCardProps {
  children: ReactNode;
}

export const MainCard = ({ children }: MainCardProps) => {
  return <MainCardStyle>{children}</MainCardStyle>;
};

const MainCardStyle = tw.section`
  flex flex-col gap-4 w-full p-6 bg-white shadow-md rounded-xl
`;
