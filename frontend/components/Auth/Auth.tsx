import { useEffect } from "react";
import { useRouter } from "next/router";
import useUserState from "@/hooks/useUserState";
import useFriendState from "@/hooks/useFriendState";
import useToast from "@/hooks/useToast";
import Circle from "@/components/common/Loading/Circle";
import { oauthLoginRequest } from "@/apis/auth";
import { AuthQuery } from "@/types/auth";
import { setAccessToken } from "@/utils/tokenManager";

const Auth = () => {
  const router = useRouter();
  const { setUser } = useUserState();
  const { toast } = useToast();
  const { updateFriendList } = useFriendState();
  useEffect(() => {
    const query = router.query as AuthQuery;
    if (query.code && query.state) {
      (async () => {
        const code = query.code;
        const state = query.state;
        const provider = query.provider;
        const res = await oauthLoginRequest(code, state, provider);
        if (res.success) {
          const {
            oauthId,
            id,
            nickname,
            profileUrl,
            sex,
            jwtAccessToken: accessToken,
            redirectUrl,
          } = res.result;

          if (redirectUrl) {
            return router.replace(
              `${redirectUrl}?oauthId=${oauthId}&provider=${provider}`
            );
          }

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
        } else {
          toast.alert(res.error);
        }
      })();
    }
  }, [router]);

  return <Circle />;
};

export default Auth;
