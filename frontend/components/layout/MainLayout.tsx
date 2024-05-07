import { ReactNode } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import tw from "twin.macro";
import Socket from "../Socket";
import Toast from "../Toast";

const DynamicSidebar = dynamic(() => import("../Sidebar"), {
  ssr: false,
});

const DynamicFriend = dynamic(() => import("../Friend"), {
  ssr: false,
});

const DynamicUserProfileModal = dynamic(() => import("../UserProfileModal"), {
  ssr: false,
});

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Head>
        <title>VOG</title>
        <link rel="icon" href="/image/VOG_small.png"></link>
      </Head>
      <Toast />
      <Socket />
      <DynamicSidebar />
      <MainLayoutContainer>
        {children}
        <DynamicFriend />
        <DynamicUserProfileModal />
      </MainLayoutContainer>
    </>
  );
};

export default MainLayout;

const MainLayoutContainer = tw.div`
  relative ml-60 flex max-w-[1920px] h-full overflow-x-hidden text-sm
  max-xl:ml-16
  max-md:text-xs
`;
