import tw from "twin.macro";
import MainLayout from "../layout/MainLayout";
import Info from "./Info";
import type { NextPageWithLayout } from "@/pages/_app";

const Home: NextPageWithLayout = () => {
  return (
    <HomeContainer>
      <HomeHeader>
        <HomeTitle>홈</HomeTitle>
      </HomeHeader>
      <Info />
    </HomeContainer>
  );
};

Home.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;

const HomeContainer = tw.div`
  w-full p-9
`;

const HomeHeader = tw.header`
  mb-4
`;

const HomeTitle = tw.h1`
  text-3xl
`;
