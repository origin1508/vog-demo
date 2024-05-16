import { useEffect } from "react";
import tw from "twin.macro";
import { useRouter } from "next/router";
import useUserState from "@/hooks/useUserState";
import useFriendState from "@/hooks/useFriendState";
import useToast from "@/hooks/useToast";
import LoginLayout from "../layout/LoginLayout";
import { NextPageWithLayout } from "@/pages/_app";
import OAuthLogin from "./OAuthLogin";
import { deleteAccessToken } from "@/utils/tokenManager";

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const { resetUser } = useUserState();
  const { resetFriend } = useFriendState();
  const { toast } = useToast();
  useEffect(() => {
    if (router.query.authorized) {
      resetUser();
      resetFriend();
      deleteAccessToken();
      toast.alert("다른 컴퓨터에서 로그인 되었습니다.");
    }
  }, []);

  return (
    <LoginForm>
      <OAuthLogin />
    </LoginForm>
  );
};

Login.getLayout = function getLayout(page) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default Login;

const LoginForm = tw.div`
flex flex-col justify-center py-6 px-9 w-[28rem] h-96 drop-shadow bg-white z-10`;
