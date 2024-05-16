import { ReactNode, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import tw from "twin.macro";

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  const router = useRouter();
  const { alert: alertMessage } = router.query;

  useEffect(() => {
    if (alertMessage) {
      alert(alertMessage.toString());
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>VOG 로그인</title>
        <link rel="icon" href="/image/VOG_small.png"></link>
      </Head>
      <LoginLayoutWrapper>
        <LoginLayoutContainer>
          <LoginLogoContainer>
            <Image src="/image/VOG.png" width={128} height={128} alt="VOG" />
          </LoginLogoContainer>
          {children}
        </LoginLayoutContainer>
      </LoginLayoutWrapper>
    </>
  );
};

export default LoginLayout;

const LoginLayoutWrapper = tw.div`
  flex justify-center items-center h-full
`;

const LoginLayoutContainer = tw.div`
  flex rounded-xl overflow-hidden drop-shadow
`;

const LoginLogoContainer = tw.div`
  flex justify-center items-center w-48 bg-primary
`;
