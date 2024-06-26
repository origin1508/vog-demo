import { memo } from "react";
import Link from "next/link";
import tw, { styled } from "twin.macro";
import { COMMUNITY_NAV_MENU } from "@/constants/nav";

interface NavigationProps {
  category: string;
}

const Navigation = ({ category }: NavigationProps) => {
  return (
    <NavConatiner>
      <NavMenu>
        {COMMUNITY_NAV_MENU.map((menu) => {
          const { name, query } = menu;
          return (
            <NavLink key={name} isActive={category === query}>
              <Link
                href={
                  query
                    ? {
                        pathname: "/community",
                        query: { category: query },
                      }
                    : "/community"
                }
              >
                {name}
              </Link>
            </NavLink>
          );
        })}
      </NavMenu>
    </NavConatiner>
  );
};

export default memo(Navigation, (prevProps, nextProps) => {
  return prevProps.category === nextProps.category;
});

const NavConatiner = tw.nav`
  w-full px-9 py-6 bg-white shadow-md
`;

const NavMenu = tw.div`
  flex items-center gap-20 text-xl
  max-md:(gap-10 text-base)
`;

const NavLink = styled.div<{ isActive: boolean }>(({ isActive }) => [
  tw`
  relative flex items-center h-full align-middle  font-medium
  after:(absolute bottom-0
    hover:(w-full border-b-2 border-caution)
    )
`,
  isActive && tw`text-primary border-b-2 border-caution`,
]);
