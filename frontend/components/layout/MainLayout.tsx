import { ReactNode } from "react";
import dynamic from "next/dynamic";
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
      <Toast />
      <Socket />
      <MainLayoutContainer>
        <DynamicSidebar />
        {children}
        <DynamicFriend />
        <DynamicUserProfileModal />
      </MainLayoutContainer>
    </>
  );
};

export default MainLayout;

const MainLayoutContainer = tw.div`
  relative flex max-w-[1920px] h-full m-auto overflow-x-hidden
`;
