import { type ReactElement } from "react";
import tw from "twin.macro";
import useToast from "@/hooks/useToast";
import useUserState from "@/hooks/useUserState";
import MainLayout from "../layout/MainLayout";
import Profile from "./Profile";
import { Header, MainCard } from "@/components/common";
import ProfilePicEdit from "./MyPageCards/ProfilePicEdit";
import NicknameEdit from "./MyPageCards/NicknameEdit";
import { uploadProfilePicRequest, changeNicknameRequest } from "@/apis/user";
import { NicknameEditValue, ProfilePicEditValue } from "@/types/myPage";
import imageResize from "@/utils/imageResize";
import { NextPageWithLayout } from "@/pages/_app";

const MyPage: NextPageWithLayout = () => {
  const { toast } = useToast();
  const { user, userId, setUser } = useUserState();

  const handleProfilePicUpload = async (data: ProfilePicEditValue) => {
    if (userId === null) return;

    const { profilePic } = data;
    const image = profilePic.item(0);
    image &&
      (await imageResize(image)
        .then(async (image) => {
          const res = image && (await uploadProfilePicRequest(userId, image));
          if (res.success) {
            const uploadedProfileUrl = res.result.profileUrl;
            setUser((prev) => {
              return { ...prev, profileUrl: uploadedProfileUrl };
            });
            toast.success("프로필이미지가 변경되었습니다.");
          } else {
            toast.alert(res.error);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.alert("이미지 압축에 실패하였습니다.");
        }));
  };

  const handleNicknameChangeSubmit = async (data: NicknameEditValue) => {
    if (userId === null) return;

    const { nickname } = data;
    const res = await changeNicknameRequest(userId, nickname);
    if (res.success) {
      const changedNickname = res.result.nickname;
      setUser((prev) => {
        return { ...prev, nickname: changedNickname };
      });
      toast.success("닉네임이 변경되었습니다.");
    } else {
      toast.alert(res.error);
    }
  };

  return (
    <MyPageContainer>
      <Header title="마이페이지" />
      <MyPageCardsContainer>
        <MainCard>
          <Profile user={user} />
          <ProfilePicEdit handleProfilePicUpload={handleProfilePicUpload} />
          <NicknameEdit handleNicknameEditSubmit={handleNicknameChangeSubmit} />
        </MainCard>
      </MyPageCardsContainer>
    </MyPageContainer>
  );
};

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default MyPage;

const MyPageContainer = tw.article`
  w-full
`;

const MyPageCardsContainer = tw.div`
  p-9
`;
