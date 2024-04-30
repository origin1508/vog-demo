import { useEffect } from "react";
import tw from "twin.macro";
import useChatSocket from "@/hooks/useChatSocket";
import MainLayout from "@/components/layout/MainLayout";
import Header from "@/components/common/Header";
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
      <ChatMember handleChatRoomLeave={handleChatRoomLeave} />
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
              SEND
            </ChatSubmitBtn>
          </ChatBntContainer>
        </ChatTextAreaContainer>
      </ChatText>
    </ChatRoomContainer>
  );
};

ChatRoom.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default ChatRoom;

const ChatRoomContainer = tw.article`
  flex w-full p-4 gap-2
`;

const ChatText = tw.div`
  flex flex-col w-full h-full px-2 bg-white/5
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
  flex p-4 border-t border-neutral-700
`;

const ChatTextArea = tw.textarea`
  shrink grow p-4 w-full max-h-96 rounded-l-lg bg-stone-800 resize-none 
  focus:(outline-none placeholder-transparent)
`;

const ChatBntContainer = tw.div`
`;

const ChatSubmitBtn = tw.button`
  float-right w-20 h-full rounded-r-lg bg-primary
`;
