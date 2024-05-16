import { useRouter } from "next/router";
import tw from "twin.macro";
import useSignUpForm from "@/hooks/useSignUpForm";
import useUserState from "@/hooks/useUserState";
import useToast from "@/hooks/useToast";
import useFriendState from "@/hooks/useFriendState";
import { Input, Button, ErrorMessage } from "@/components/common";
import LoginLayout from "../layout/LoginLayout";
import { signUpRequest } from "@/apis/user";
import { SignUpValue } from "@/types/auth";
import { setAccessToken } from "@/utils/tokenManager";
import { ParsedUrlQuery } from "querystring";
import { NextPageWithLayout } from "@/pages/_app";

interface SignUpQuery extends ParsedUrlQuery {
  oauthId: string;
  provider: string;
}

const SignUp: NextPageWithLayout = () => {
  const { watchNickname, nicknameError, register, handleSubmit } =
    useSignUpForm();
  const { setUser } = useUserState();
  const { toast } = useToast();
  const { updateFriendList } = useFriendState();
  const router = useRouter();
  const { oauthId, provider } = router.query as SignUpQuery;

  const handleSignUp = async ({ nickname, gender }: SignUpValue) => {
    const res = await signUpRequest(oauthId, provider, nickname, gender);
    if (res.success) {
      const id = res.result.id;
      const nickname = res.result.nickname;
      const profileUrl = res.result.profileUrl;
      const sex = res.result.sex;
      const accessToken = res.result.jwtAccessToken;
      setAccessToken(accessToken);
      await updateFriendList(id);
      setUser((prev) => {
        return {
          ...prev,
          id: id,
          profileUrl: profileUrl,
          nickname: nickname,
          sex: sex,
        };
      });
      router.replace("/");
    } else {
      toast.alert(res.error);
    }
  };
  return (
    <SignUpContainer>
      <SignUpForm onSubmit={handleSubmit(handleSignUp)}>
        <SignUpInputContainer>
          <SignUpLabel>닉네임 설정</SignUpLabel>
          <Input
            register={register("nickname")}
            placeholder="닉네임은 2~10자 사이로 적어주세요"
            height={3}
          />
          {watchNickname && nicknameError && (
            <ErrorMessage>닉네임은 2~10자 사이로 적어주세요</ErrorMessage>
          )}
        </SignUpInputContainer>
        <Button type="submit" bgColor="caution">
          회원가입
        </Button>
      </SignUpForm>
    </SignUpContainer>
  );
};

SignUp.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default SignUp;

const SignUpContainer = tw.div`py-10 w-[28rem] bg-white`;

const SignUpForm = tw.form`flex flex-col px-16 gap-6`;

const SignUpLabel = tw.h2`
  mb-4 text-xl font-medium
`;

const SignUpInputContainer = tw.div`relative flex flex-col my-4`;
