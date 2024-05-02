import tw from "twin.macro";
import PostInfo from "./PostInfo";
import ChatInfo from "./ChatInfo";

const Info = () => {
  return (
    <InfoContainer>
      <PostInfo />
      <ChatInfo />
    </InfoContainer>
  );
};

export default Info;

const InfoContainer = tw.div`
  flex flex-col gap-6 w-full
`;
