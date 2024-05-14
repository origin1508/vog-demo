import { useState } from "react";
import Image from "next/image";
import tw from "twin.macro";
import { useLocalStreamContext } from "@/context/LocalStreamContext";
import useChatState from "@/hooks/useChatState";
import { Header, Button } from "@/components/common";
import { getIcons } from "@/components/icons";
import { ChatMemberProps } from "@/types/chat";

const ChatMember = ({
  emitEnterVoiceChat,
  handleChatRoomLeave,
}: ChatMemberProps) => {
  const {
    ref: localStreamRef,
    getLocalStream,
    stopLocalStream,
  } = useLocalStreamContext();
  const [isEntered, setIsEnterd] = useState(!!localStreamRef.current);
  const {
    chat: { chatParticipant },
  } = useChatState();

  const handleEnterVoiceChatClick = async () => {
    await getLocalStream();
    setIsEnterd(true);
    emitEnterVoiceChat();
  };

  return (
    <ChatMemberContainer>
      <Header title="멤버" />
      <ChatMemberList>
        {chatParticipant.map((member) => {
          return (
            <MemberInfo key={member.userId}>
              <MemberProfilePic
                src={member.user.profileUrl}
                alt="profile pic"
                width={128}
                height={128}
              />
              <MemberNickname>{member.user.nickname}</MemberNickname>
            </MemberInfo>
          );
        })}
      </ChatMemberList>
      <ChatButtonContainer>
        {isEntered ? (
          <Button
            type="button"
            bgColor="warning"
            onClick={() => {
              stopLocalStream();
              setIsEnterd(false);
            }}
          >
            <ExitIcon>{getIcons("mic", 24)}음성채팅 퇴장</ExitIcon>
          </Button>
        ) : (
          <Button
            type="button"
            bgColor="secondary"
            onClick={handleEnterVoiceChatClick}
          >
            <ExitIcon>{getIcons("mic", 24)}음성채팅 입장</ExitIcon>
          </Button>
        )}

        <Button
          type="button"
          bgColor="caution"
          onClick={() => {
            stopLocalStream();
            handleChatRoomLeave();
          }}
        >
          <ExitIcon>{getIcons("exit", 32)}나가기</ExitIcon>
        </Button>
      </ChatButtonContainer>
    </ChatMemberContainer>
  );
};

export default ChatMember;

const ChatMemberContainer = tw.div`
  flex flex-col h-full
`;

const ChatMemberList = tw.div`
  grow flex flex-col overflow-auto
`;

const MemberInfo = tw.div`
  flex p-4
`;

const MemberProfilePic = tw(Image)`
  w-16 h-16 rounded-full
`;

const MemberNickname = tw.span`
  flex items-center h-16 ml-4
`;

const ExitIcon = tw.div`
  flex items-center justify-center
`;

const ChatButtonContainer = tw.div`
  flex flex-col gap-4 justify-end w-full
`;
