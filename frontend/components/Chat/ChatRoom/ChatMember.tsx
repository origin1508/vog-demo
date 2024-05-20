import { useState, useMemo } from "react";
import Image from "next/image";
import tw from "twin.macro";
import { usePeerConnectionsContext, useLocalStreamContext } from "@/context";
import useChatState from "@/hooks/useChatState";
import useUserState from "@/hooks/useUserState";
import useStreamState from "@/hooks/useStreamState";
import { Header, Button } from "@/components/common";
import { getIcons } from "@/components/icons";
import { ChatMemberProps } from "@/types/chat";
import MediaControl from "./MediaControl";

const ChatMember = ({
  emitEnterVoiceChat,
  handleChatRoomLeave,
}: ChatMemberProps) => {
  const {
    ref: localStreamRef,
    getLocalStream,
    stopLocalStream,
  } = useLocalStreamContext();
  const { closePeerConnection } = usePeerConnectionsContext();
  const [isEntered, setIsEnterd] = useState(!!localStreamRef.current);
  const {
    chat: { chatParticipant },
  } = useChatState();
  const { resetStreams } = useStreamState();
  const { userId } = useUserState();

  const handleEnterVoiceChatClick = async () => {
    await getLocalStream();
    setIsEnterd(true);
    emitEnterVoiceChat();
  };

  const handleLeaveVoiceChatClick = async () => {
    stopLocalStream();
    resetStreams();
    closePeerConnection();
    setIsEnterd(false);
  };

  const sortedChatParticipant = useMemo(
    () =>
      [...chatParticipant].sort((a, b) => {
        if (a.userId === userId) return -1;
        if (b.userId === userId) return 1;
        return 0;
      }),
    [chatParticipant, userId]
  );

  return (
    <ChatMemberContainer>
      <Header title="멤버" />
      <ChatMemberList>
        {sortedChatParticipant.map((member) => {
          return (
            <MemberInfoContainer key={member.userId}>
              <MemberInfo>
                <MemberProfilePic
                  src={member.user.profileUrl}
                  alt="profile pic"
                  width={128}
                  height={128}
                />
                <MemberNickname>{member.user.nickname}</MemberNickname>
              </MemberInfo>
              <MediaControl
                isLoggedInUser={member.userId === userId}
                isEntered={isEntered}
              />
            </MemberInfoContainer>
          );
        })}
      </ChatMemberList>
      <ChatButtonContainer>
        {isEntered ? (
          <Button
            type="button"
            bgColor="warning"
            onClick={handleLeaveVoiceChatClick}
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
  flex flex-col h-full min-w-80
  max-md:min-w-fit
`;

const ChatMemberList = tw.div`
  grow flex flex-col overflow-auto
`;

const MemberInfoContainer = tw.div`
  flex justify-between items-center p-4
  max-md:(flex-col p-1)
`;

const MemberInfo = tw.div`
  flex items-center
`;

const MemberProfilePic = tw(Image)`
  w-16 h-16 rounded-full
  max-md:(w-8 h-8)
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
