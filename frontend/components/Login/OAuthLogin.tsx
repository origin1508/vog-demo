import Link from "next/link";
import Image from "next/image";
import tw from "twin.macro";

const OAuthLogin = () => {
  const STATE = Math.random().toString(36).substring(2, 12);

  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;

  return (
    <OAuthContainer>
      <NaverLogin
        href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=http://localhost:3002/auth/login/naver`}
      >
        <LogoIcon
          src={"/image/logo_naver.png"}
          width={200}
          height={200}
          quality={100}
          alt="naver"
        />
        <LoginText>네이버로 로그인</LoginText>
      </NaverLogin>
      <KakaoLogin
        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3002/auth/login/kakao&state=${STATE}`}
      >
        <LogoIcon
          src={"/image/logo_kakao.png"}
          width={200}
          height={200}
          quality={100}
          alt="kakao"
        />
        <LoginText>카카오로 로그인</LoginText>
      </KakaoLogin>
    </OAuthContainer>
  );
};

export default OAuthLogin;

const OAuthContainer = tw.div`
  flex flex-col items-center gap-5 w-full m-auto text-[14px]
`;

const LogoIcon = tw(Image)`
  shrink-0 w-[18px] h-[18px] mr-[8px]
`;

const NaverLogin = tw(Link)`
  flex items-center justify-center w-full h-12 rounded bg-[#03c75a]
`;

const KakaoLogin = tw(Link)`
  flex items-center justify-center w-full h-12 rounded bg-[#FEE500] text-black
`;

const LoginText = tw.span`
  flex items-center justify-center w-32 text-center
`;
