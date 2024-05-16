import tw from "twin.macro";
import { useRouter } from "next/router";
import { ChatRoom } from "@/types/chat";
import RoomList from "@/components/Chat/RoomList";

interface ChatRoomProps {
  latestChatRoom: ChatRoom[];
}

const ChatInfo = ({ latestChatRoom }: ChatRoomProps) => {
  const router = useRouter();
  return (
    <ChatInfoContainer>
      <ChatInfoHeader>
        <ChatInfoTitle>입장 가능한 채팅</ChatInfoTitle>
        <ChatInfoMore onClick={() => router.push("/chat")}>더보기</ChatInfoMore>
      </ChatInfoHeader>
      <ChatList>
        {latestChatRoom.length > 0 ? (
          <RoomList
            roomList={latestChatRoom}
            handleRoomClick={(roomId) => router.push(`/chat?focus=${roomId}`)}
          />
        ) : (
          <Blank>입장 가능한 채팅이 없습니다.</Blank>
        )}
        <Chat></Chat>
      </ChatList>
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
  cursor-pointer
`;

const Blank = tw.div`
  flex justify-center items-center w-full h-40
`;

const ChatList = tw.ul``;

const Chat = tw.li``;
