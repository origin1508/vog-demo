import { useRouter } from "next/router";
import Image from "next/image";
import tw from "twin.macro";
import Button from "../common/Button";

const Home = () => {
  const router = useRouter();
  return (
    <HomeContainer>
      <Image src="/image/home.jpg" alt="background image" fill />
      <HomeContent>
        <HomeTitle>Need A Communication?</HomeTitle>
        <HomeText>
          음성채팅으로 완벽한 팀워크를 이루세요.
          <br />
          커뮤니티에서 여러 정보를 공유하세요.
        </HomeText>
        <ButtonContainer>
          <Button
            bgColor="primary"
            width={5}
            onClick={() => {
              router.push("/chat");
            }}
          >
            채팅
          </Button>
          <Button
            bgColor="primary"
            width={5}
            onClick={() => {
              router.push({
                pathname: "/community",
                query: {
                  category: "free",
                },
              });
            }}
          >
            커뮤니티
          </Button>
        </ButtonContainer>
      </HomeContent>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = tw.article`
  relative flex justify-center items-center w-full h-full
  after:absolute after:inset-0 after:bg-black after:opacity-20
`;

const HomeContent = tw.div`
  absolute z-10
`;

const HomeTitle = tw.h2`
  font-bold text-xl
`;

const HomeText = tw.p``;

const ButtonContainer = tw.div`
  flex justify-around
`;
