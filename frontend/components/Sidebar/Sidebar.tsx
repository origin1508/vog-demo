import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import tw, { styled } from "twin.macro";
import useUserState from "@/hooks/useUserState";
import useFriendState from "@/hooks/useFriendState";
import useUserProfileState from "@/hooks/useUserProfileState";
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
    <SidebarContainer className="group">
      <SidebarLogo onClick={handleVogClick}>
        <Logo src="/image/VOG.png" width={128} height={128} alt="VOG" />
        <SmallLogo
          src="/image/VOG_small.png"
          width={128}
          height={128}
          alt="VOG"
        />
      </SidebarLogo>
      <SidebarUser onClick={() => handleUserProfileOpen(user.id)}>
        <UserImage
          src={user.profileUrl}
          width={128}
          height={128}
          alt="profileImage"
        />
        <SidebarText>{user.nickname}</SidebarText>
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
                <SidebarText>{name}</SidebarText>
              </SidebarLink>
            </SidebarItem>
          );
        })}
      </SidebarNavigation>
      <SidebarBtns>
        <SidebarItem onClick={handleFriendToggle}>
          <SidebarBtn>
            <ItemIcon>{getIcons("friends", 24)}</ItemIcon>
            <SidebarText>친구목록</SidebarText>
          </SidebarBtn>
        </SidebarItem>
        <SidebarItem onClick={handleLogout}>
          <SidebarBtn>
            <ItemIcon>{getIcons("exit", 24)}</ItemIcon>
            <SidebarText>로그아웃</SidebarText>
          </SidebarBtn>
        </SidebarItem>
      </SidebarBtns>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = tw.nav`
  fixed shrink-0 flex flex-col w-16 h-full p-2 gap-8 bg-primary text-white text-lg overflow-hidden transition-all z-10 
  hover:w-60
  xl:(w-60)
`;

const SidebarLogo = tw.div`
  flex justify-center items-center h-14 py-2 cursor-pointer
`;

const Logo = tw(Image)`
  hidden
  group-hover:block
  xl:(block)
`;
const SmallLogo = tw(Image)`
  shrink-0 w-8 h-8
  group-hover:hidden
  xl:(hidden)
`;

const SidebarUser = tw.div`
  flex items-center gap-4 h-12 px-2 cursor-pointer rounded hover:bg-white/20
`;

const UserImage = tw(Image)`
  shrink-0 w-8 h-8 rounded-full
`;

const SidebarNavigation = tw.ul`
`;

const SidebarBtns = tw.ul``;

const SidebarItem = styled.li<{ isSelected?: boolean }>(({ isSelected }) => [
  tw`flex justify-center items-center h-12 py-2 px-2 rounded cursor-pointer hover:(bg-white/20 text-white)`,
  isSelected && tw`bg-white text-primary`,
]);

const SidebarBtn = tw.button`
  flex items-center w-full h-full px-1
`;

const SidebarText = tw.span`
  grow-0 whitespace-nowrap
`;

const SidebarLink = tw(Link)`
  flex items-center w-full h-full px-1
`;

const ItemIcon = tw.div`
  shrink-0 w-12
`;
