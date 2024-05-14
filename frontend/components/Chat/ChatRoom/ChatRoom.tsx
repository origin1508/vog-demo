import { useEffect } from "react";
import tw from "twin.macro";
import useChatSocket from "@/hooks/useChatSocket";
import MainLayout from "@/components/layout/MainLayout";
import { Header, MainCard } from "@/components/common";
import ChatMember from "./ChatMember";
import ChatMessage from "./ChatMessage";
import { NextPageWithLayout } from "@/pages/_app";

const ChatRoom: NextPageWithLayout = () => {
  const {
    title,
    messages,
    buttonRef,
    textareaRef,
    scrollRef,
    enterRoom,
    emitEnterVoiceChat,
    handleMessageSend,
    handleChatRoomLeave,
    handleTextAreaChange,
    handleTextAreaKeyDown,
  } = useChatSocket();

  useEffect(() => {
    enterRoom();
  }, []);

  return (
    <ChatRoomContainer>
      <MainCard>
        <ChatMember
          emitEnterVoiceChat={emitEnterVoiceChat}
          handleChatRoomLeave={handleChatRoomLeave}
        />
      </MainCard>
      <MainCard>
        <ChatText>
          <Header title={title} />
          <ChatLogs>
            <FlexBox />
            <ChatLog ref={scrollRef}>
              <ChatMessage messages={messages} />
            </ChatLog>
          </ChatLogs>
          <ChatTextAreaContainer>
            <ChatTextArea
              placeholder="메시지를 입력하세요"
              onChange={handleTextAreaChange}
              onKeyDown={handleTextAreaKeyDown}
              rows={1}
              ref={textareaRef}
            ></ChatTextArea>
            <ChatBntContainer>
              <ChatSubmitBtn
                type="button"
                ref={buttonRef}
                onClick={handleMessageSend}
              >
                보내기
              </ChatSubmitBtn>
            </ChatBntContainer>
          </ChatTextAreaContainer>
        </ChatText>
      </MainCard>
    </ChatRoomContainer>
  );
};

ChatRoom.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default ChatRoom;

const ChatRoomContainer = tw.article`
  grid grid-cols-[1fr, 3fr] grid-rows-1 gap-6 w-full p-9  
`;

const ChatText = tw.div`
  flex flex-col w-full h-full
`;

const ChatLogs = tw.div`
  flex flex-col shrink w-full h-full overflow-y-auto
`;

const ChatLog = tw.div`
  w-full p-8
`;

const FlexBox = tw.div`
  flex-1 w-full
`;

const ChatTextAreaContainer = tw.div`
  flex
`;

const ChatTextArea = tw.textarea`
  shrink grow px-4 py-2 w-full h-10 max-h-96 rounded-l bg-zinc-200 resize-none
  focus:(outline-none placeholder-transparent)
`;

const ChatBntContainer = tw.div`
`;

const ChatSubmitBtn = tw.button`
  float-right w-20 h-full rounded-r bg-primary text-white
`;
