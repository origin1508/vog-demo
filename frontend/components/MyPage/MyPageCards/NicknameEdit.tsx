import tw from "twin.macro";
import useNicknameEditForm from "@/hooks/useNicknameEditForm";
import { MyPageCard, Button, Input, ErrorMessage } from "@/components/common";
import { NicknameEditProps } from "@/types/myPage";

const NicknameEdit = ({ handleNicknameEditSubmit }: NicknameEditProps) => {
  const { errorsNickname, isDirty, isValid, reset, register, handleSubmit } =
    useNicknameEditForm();

  return (
    <NicknameEditContainer>
      <MyPageCard title="닉네임 변경">
        <NicknameEditForm
          onSubmit={async (e) => {
            await handleSubmit(handleNicknameEditSubmit)(e);
            reset();
          }}
        >
          <NicknameEditInput>
            <Input
              height={3}
              register={register("nickname")}
              placeholder="닉네임을 입력해주세요"
            />
            {isDirty && errorsNickname && (
              <ErrorMessage>
                닉네임은 2글자 이상 10글자이하로 작성해주세요.
              </ErrorMessage>
            )}
          </NicknameEditInput>
          <NicknameEditSumbit>
            <Button
              type="submit"
              width={8}
              bgColor="primary"
              disabled={!isDirty || !isValid}
            >
              변경하기
            </Button>
          </NicknameEditSumbit>
        </NicknameEditForm>
      </MyPageCard>
    </NicknameEditContainer>
  );
};

export default NicknameEdit;

const NicknameEditContainer = tw.div`
  flex w-full
`;

const NicknameEditForm = tw.form`
  flex items-center w-full gap-6
`;

const NicknameEditInput = tw.div`
  m-auto w-full
`;

const NicknameEditSumbit = tw.div`
  float-right
`;
