import tw from "twin.macro";

interface LeftProps {
  title: string;
  description?: string;
}

export const MyPageCardLeft = ({ title, description }: LeftProps) => {
  return (
    <LeftContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </LeftContainer>
  );
};

const LeftContainer = tw.div`
  shrink-0 flex items-center w-72 p-8 border-r
`;

const Title = tw.h2`
  text-xl
`;

const Description = tw.p`
  text-zinc-400
`;
