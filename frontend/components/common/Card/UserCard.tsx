import Image from "next/image";
import tw from "twin.macro";

interface UserCardProps {
  nickname: string;
  profilePic: string;
}

export const UserCard = ({ nickname, profilePic }: UserCardProps) => {
  return (
    <UserCardContainer>
      <UserProfile
        src={profilePic}
        width={128}
        height={128}
        alt="user profilePic"
      />
      <UserName>{nickname}</UserName>
    </UserCardContainer>
  );
};

const UserCardContainer = tw.div`
  flex items-center h-8
`;

const UserProfile = tw(Image)`
  w-8 h-8 rounded-full bg-white
`;

const UserName = tw.span`
  flex-1 flex items-center h-10 px-4
`;
