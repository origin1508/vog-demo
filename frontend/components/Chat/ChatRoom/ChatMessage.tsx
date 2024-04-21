import Image from "next/image";
import tw, { styled } from "twin.macro";
import { ChatMessageProps } from "@/types/chat";

const ChatMessage = ({ messages }: ChatMessageProps) => {
  return (
    <>
      {messages.map((message, index) => {
        return (
          <ChatMessageContainer key={index} isSender={message.isSender}>
            <ChatProfilePic>
              <ProfilePic
                src={message.profileUrl}
                alt="profilePic"
                width={32}
                height={32}
              />
            </ChatProfilePic>
            <ChatContent>
              <Nickname>{message.nickname}</Nickname>
              <Content>{message.content}</Content>
            </ChatContent>
          </ChatMessageContainer>
        );
      })}
    </>
  );
};

export default ChatMessage;

const ChatMessageContainer = styled.div<{ isSender: boolean }>(
  ({ isSender }) => [
    tw`flex gap-2 mt-8`,
    isSender && tw`flex-row-reverse [& div]:text-right`,
  ]
);

const ChatProfilePic = tw.div`
  shrink-0 pt-1
`;

const ProfilePic = tw(Image)`
  rounded-full
`;

const ChatContent = tw.div``;

const Nickname = tw.div`
  m-2 font-semibold
`;

const Content = tw.p`
  w-auto p-4 border border-primary rounded-lg bg-zinc-800 break-all whitespace-pre-wrap
`;
