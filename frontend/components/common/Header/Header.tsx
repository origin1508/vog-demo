import tw from "twin.macro";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = tw.header`
  flex justify-between items-center w-full h-20 px-9
`;

const HeaderTitle = tw.h2`
  text-2xl font-medium
`;
