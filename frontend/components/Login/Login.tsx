import { useEffect } from "react";
import tw from "twin.macro";
import { useRouter } from "next/router";
import useUserState from "@/hooks/useUserState";
import useFriendState from "@/hooks/useFriendState";
import useToast from "@/hooks/useToast";
import LoginLayout from "../layout/LoginLayout";
import { NextPageWithLayout } from "@/pages/_app";
import OAuthLogin from "./OAuthLogin";
import { Button } from "../common";
import { testLoginRequest } from "@/apis/auth";
import { setAccessToken, deleteAccessToken } from "@/utils/tokenManager";

const TEST_LOGIN = [
  { oauthId: "test-demo-00", name: "테스트 로그인 1" },
  { oauthId: "test-demo-01", name: "테스트 로그인 2" },
];

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const { resetUser, setUser } = useUserState();
  const { resetFriend, updateFriendList } = useFriendState();
  const { toast } = useToast();
  useEffect(() => {
    if (router.query.authorized) {
      resetUser();
      resetFriend();
      deleteAccessToken();
      toast.alert("다른 컴퓨터에서 로그인 되었습니다.");
    }
  }, []);

  const handleTestLoginClick = async (oauthId: string) => {
    try {
      const res = await testLoginRequest(oauthId);

      if (res.success) {
        const {
          oauthId,
          id,
          nickname,
          profileUrl,
          sex,
          provider,
          jwtAccessToken: accessToken,
        } = res.result;

        setAccessToken(accessToken);
        await updateFriendList(id);

        setUser((prev) => {
          return {
            ...prev,
            id: id,
            nickname: nickname,
            profileUrl: profileUrl,
            sex: sex,
            oauthId: oauthId,
            provider: provider,
          };
        });
        router.replace("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoginForm>
      <OAuthLogin />
      <TestLoginContainer>
        {TEST_LOGIN.map((it) => (
          <Button
            key={it.oauthId}
            bgColor="primary"
            onClick={() => handleTestLoginClick(it.oauthId)}
          >
            {it.name}
          </Button>
        ))}
      </TestLoginContainer>
    </LoginForm>
  );
};

Login.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default Login;

const LoginForm = tw.div`
flex flex-col justify-center py-6 px-9 w-[28rem] h-96 drop-shadow bg-white z-10`;

const TestLoginContainer = tw.div`
  flex flex-col gap-4
`;
