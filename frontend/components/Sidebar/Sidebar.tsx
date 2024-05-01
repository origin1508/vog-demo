import { useRouter } from "next/router";
import Link from "next/link";
import tw from "twin.macro";
import useUserState from "@/hooks/useUserState";
import useFriendState from "@/hooks/useFriendState";
import useUserProfileState from "@/hooks/useUserProfileState";
import UserCard from "../common/UserCard";
import { getIcons } from "../icons";
import { deleteAccessToken } from "@/utils/tokenManager";
import { NAV_MENU } from "@/constants/nav";

const Sidebar = () => {
  const router = useRouter();
  const { user, resetUser } = useUserState();
  const { resetFriend, handleFriendToggle } = useFriendState();
  const { handleUserProfileOpen } = useUserProfileState();

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
          const { name, href, icon } = menu;
          return (
            <SidebarMenu key={name}>
              <SidebarLink href={href}>
                <ItemIcon>{icon}</ItemIcon>
                {name}
              </SidebarLink>
            </SidebarMenu>
          );
        })}
        <SidebarMenu>
          <SidebarBtn onClick={handleFriendToggle}>
            <ItemIcon>{getIcons("friends", 34)}</ItemIcon>
            친구목록
          </SidebarBtn>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarBtn onClick={handleLogout}>
            <ItemIcon>{getIcons("exit", 34)}</ItemIcon>
            로그아웃
          </SidebarBtn>
        </SidebarMenu>
      </SidebarNavigation>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = tw.nav`
  flex flex-col w-80 h-full p-4 gap-5 border-r border-neutral-700 text-xl
`;

const SidebarLogo = tw.div`
  py-2 px-4 text-4xl font-bold cursor-pointer
`;

const SidebarUser = tw.div`
  relative py-2 px-4 cursor-pointer
`;

const SidebarNavigation = tw.ul`
  font-semibold
`;

const SidebarMenu = tw.li`
  h-12 py-2 px-4 rounded cursor-pointer
  hover:(bg-primary text-black)
`;

const SidebarBtn = tw.button`
  flex items-center
`;

const SidebarLink = tw(Link)`
  flex flex-row items-center w-full
`;

const ItemIcon = tw.div`
  mr-4
`;
