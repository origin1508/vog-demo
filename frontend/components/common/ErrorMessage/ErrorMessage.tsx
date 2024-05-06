import { ReactNode } from "react";
import tw from "twin.macro";

interface ErrorMessageProps {
  children: ReactNode;
}

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <>
      <StyledErrorMessage>{children}</StyledErrorMessage>
    </>
  );
};

const StyledErrorMessage = tw.p`
  px-2 text-red-600 mb-2
`;
