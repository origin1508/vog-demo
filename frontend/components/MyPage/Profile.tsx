import { useState, useEffect } from "react";
import Image from "next/image";
import tw from "twin.macro";
import { ProfileProps } from "@/types/myPage";

const Profile = ({ user }: ProfileProps) => {
  const [profileUrl, setProfileUrl] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    setProfileUrl(user.profileUrl);
    setNickname(user.nickname);
  }, [user]);

  return (
    <ProfileContainer>
      <ProfilePic src={profileUrl} alt="profilePic" width={1280} height={800} />
      <ProfileInfo>
        <Nickname>{nickname}</Nickname>
      </ProfileInfo>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = tw.div`
  flex flex-col gap-4 items-center w-full
`;

const ProfilePic = tw(Image)`
  h-48 w-48 rounded-full
`;

const ProfileInfo = tw.div``;

const Nickname = tw.span`
  text-2xl
`;
