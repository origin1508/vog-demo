import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import tw, { styled } from "twin.macro";
import useUserState from "@/hooks/useUserState";
import useFriendState from "@/hooks/useFriendState";
import useUserProfileState from "@/hooks/useUserProfileState";
import UserCard from "../common/UserCard";
import { getIcons } from "../icons";
import { deleteAccessToken } from "@/utils/tokenManager";
import { NAV_MENU } from "@/constants/nav";
import { useEffect } from "react";

const Sidebar = () => {
  const router = useRouter();
  const [selected, setSelected] = useState("/");
  const { user, resetUser } = useUserState();
  const { resetFriend, handleFriendToggle } = useFriendState();
  const { handleUserProfileOpen } = useUserProfileState();

  useEffect(() => {
    setSelected(router.pathname);
  }, [router]);

  const handleVogClick = () => {
    router.push("/");
  };

  const handleLogout = async () => {
    deleteAccessToken();
    resetUser();
    resetFriend();
    router.replace("/login");
  };

  return (
    <SidebarContainer>
      <SidebarLogo onClick={handleVogClick}>VOG</SidebarLogo>
      <SidebarUser onClick={() => handleUserProfileOpen(user.id)}>
        <UserCard nickname={user.nickname} profilePic={user.profileUrl} />
      </SidebarUser>
      <SidebarNavigation>
        {NAV_MENU.map((menu) => {
          const { name, pathname, icon, query } = menu;
          return (
            <SidebarItem key={name} isSelected={selected === pathname}>
              <SidebarLink
                href={{
                  pathname: pathname,
                  query: query,
                }}
              >
                <ItemIcon>{icon}</ItemIcon>
                {name}
              </SidebarLink>
            </SidebarItem>
          );
        })}
      </SidebarNavigation>
      <SidebarBtns>
        <SidebarItem onClick={handleFriendToggle}>
          <SidebarBtn>
            <ItemIcon>{getIcons("friends", 34)}</ItemIcon>
            친구목록
          </SidebarBtn>
        </SidebarItem>
        <SidebarItem onClick={handleLogout}>
          <SidebarBtn>
            <ItemIcon>{getIcons("exit", 34)}</ItemIcon>
            로그아웃
          </SidebarBtn>
        </SidebarItem>
      </SidebarBtns>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = tw.nav`
  shrink-0 flex flex-col w-64 h-full p-4 gap-8 bg-primary text-white text-xl
`;

const SidebarLogo = tw.div`
  py-2 px-4 text-4xl font-bold cursor-pointer
`;

const SidebarUser = tw.div`
  relative py-2 px-4 cursor-pointer
`;

const SidebarNavigation = tw.ul`
`;

const SidebarBtns = tw.ul``;

const SidebarItem = styled.li<{ isSelected?: boolean }>(({ isSelected }) => [
  tw`h-12 py-2 px-4 rounded cursor-pointer hover:(bg-white/20 text-white)`,
  isSelected && tw`bg-white text-primary`,
]);

const SidebarBtn = tw.button`
  flex items-center
`;

const SidebarLink = tw(Link)`
  flex flex-row items-center w-full
`;

const ItemIcon = tw.div`
  mr-4
`;
