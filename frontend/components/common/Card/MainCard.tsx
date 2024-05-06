import tw from "twin.macro";

export const MainCard = () => {
  return <MainCardStyle />;
};

const MainCardStyle = tw.section`
  w-full p-4 bg-white shadow-md rounded-xl
`;
