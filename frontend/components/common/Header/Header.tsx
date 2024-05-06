import tw from "twin.macro";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  );
};

const HeaderContainer = tw.header`
  flex justify-between items-center w-full h-20 px-9
`;

const HeaderTitle = tw.h2`
  text-2xl font-medium
`;
