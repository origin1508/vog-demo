import { ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import tw from "twin.macro";

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
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
