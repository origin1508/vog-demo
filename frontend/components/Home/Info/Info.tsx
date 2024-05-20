import { useState, useEffect } from "react";
import tw from "twin.macro";
import PostInfo from "./PostInfo";
import ChatInfo from "./ChatInfo";
import { getPostsInfo } from "@/apis/community";
import { getChatRoomInfoRequest } from "@/apis/chat";
import { Content } from "@/types/community";
import { ChatRoom } from "@/types/chat";

const Info = () => {
  const [latestPosts, setLatestPosts] = useState<Content[]>([]);
  const [latestChatRoom, setLatestChatRoom] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const initPostInfo = async () => {
      const res = await getPostsInfo();
      if (res.success) {
        setLatestPosts(res.result.latestPosts);
      }
    };

    const initChatInfo = async () => {
      const res = await getChatRoomInfoRequest();
      if (res.success) {
        setLatestChatRoom(res.result.latestChatRoom);
      }
    };

    initPostInfo();
    initChatInfo();
  }, []);
  return (
    <InfoContainer>
      <PostInfo latestPosts={latestPosts} />
      <ChatInfo latestChatRoom={latestChatRoom} />
    </InfoContainer>
  );
};

export default Info;

const InfoContainer = tw.div`
  flex flex-col gap-6 w-full
`;
