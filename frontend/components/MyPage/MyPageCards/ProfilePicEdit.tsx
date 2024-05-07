import { useState, useEffect } from "react";
import tw, { styled, css } from "twin.macro";
import useProfilePicEditForm from "@/hooks/useProfilePicEditForm";
import { MyPageCard, Button } from "@/components/common";
import { getIcons } from "@/components/icons";
import imageResize from "@/utils/imageResize";
import { ProfilePicEditProps } from "@/types/myPage";

const ProfilePicEdit = ({ handleProfilePicUpload }: ProfilePicEditProps) => {
  const [preview, setPreview] = useState("");
  const { isDirty, isValid, watchProfilePic, reset, register, handleSubmit } =
    useProfilePicEditForm();

  useEffect(() => {
    const image = watchProfilePic && watchProfilePic.item(0);

    if (!image) {
      return setPreview("");
    }

    (async () => {
      if (image) {
        const compressImage = await imageResize(image);
        if (compressImage) {
          setPreview(URL.createObjectURL(compressImage));
        }
      }
    })();
  }, [watchProfilePic]);

  function removeImage(): void {
    setPreview("");
    reset();
  }

  return (
    <ProfilePicEditContainer>
      <MyPageCard title="프로필이미지 변경">
        <ProfilePicEditForm
          acceptCharset="UTF-8"
          onSubmit={async (e) => {
            await handleSubmit(handleProfilePicUpload)(e);
            reset();
          }}
        >
          <ProfilePicUpload preview={preview}>
            <ProfilePicInput
              {...register("profilePic")}
              type="file"
              accept="image/*"
            ></ProfilePicInput>
            {!preview && (
              <ProfilePicIcon>{getIcons("plus", 64, "white")}</ProfilePicIcon>
            )}
          </ProfilePicUpload>
          <ProfilePicSumbitButton>
            <Button
              type="button"
              width={8}
              bgColor="secondary"
              onClick={removeImage}
              disabled={!isDirty || !isValid}
            >
              취소하기
            </Button>
            <Button
              type="submit"
              width={8}
              bgColor="primary"
              disabled={!isDirty || !isValid}
            >
              변경하기
            </Button>
          </ProfilePicSumbitButton>
        </ProfilePicEditForm>
      </MyPageCard>
    </ProfilePicEditContainer>
  );
};

export default ProfilePicEdit;

const ProfilePicEditContainer = tw.div`
  flex w-full
`;

const ProfilePicEditForm = tw.form`
`;

const ProfilePicUpload = styled.div<{ preview?: string }>(({ preview }) => [
  tw`relative flex items-center justify-center h-48 w-48 m-auto rounded-full bg-secondary/20 bg-cover
  hover:brightness-125`,
  preview &&
    css`
      background-image: url(${preview});
    `,
]);

const ProfilePicIcon = tw.div`
  absolute
`;

const ProfilePicInput = tw.input`
  h-full w-full opacity-0 cursor-pointer z-20
`;

const ProfilePicSumbitButton = tw.div`
  flex justify-end gap-6 w-full mt-6
`;
