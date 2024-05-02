import tw from "twin.macro";

const ChatInfo = () => {
  return (
    <ChatInfoContainer>
      <ChatInfoHeader>
        <ChatInfoTitle>입장 가능한 채팅</ChatInfoTitle>
        <ChatInfoMore>더보기</ChatInfoMore>
      </ChatInfoHeader>
      <ChatList>
        <Chat></Chat>
      </ChatList>
      <Blank>입장 가능한 채팅이 없습니다.</Blank>
    </ChatInfoContainer>
  );
};

export default ChatInfo;

const ChatInfoContainer = tw.article`
  p-4 bg-white shadow-md rounded-xl
`;

const ChatInfoHeader = tw.header`
  flex justify-between items-center px-2 py-1 border-b-2
`;

const ChatInfoTitle = tw.h2`
  text-xl
`;

const ChatInfoMore = tw.div`

`;

const Blank = tw.div`
  flex justify-center items-center w-full h-40
`;

const ChatList = tw.ul``;

const Chat = tw.li``;
