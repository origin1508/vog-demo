import { useState, useEffect } from "react";
import tw from "twin.macro";
import PostInfo from "./PostInfo";
import ChatInfo from "./ChatInfo";
import { getPostsInfo } from "@/apis/community";
import { Content } from "@/types/community";

const Info = () => {
  const [latestPosts, setLatestPosts] = useState<Content[]>([]);

  useEffect(() => {
    const initPostInfo = async () => {
      const res = await getPostsInfo();
      if (res.success) {
        setLatestPosts(res.result.latestPosts);
      }
    };

    initPostInfo();
  }, []);
  return (
    <InfoContainer>
      <PostInfo latestPosts={latestPosts} />
      <ChatInfo />
    </InfoContainer>
  );
};

export default Info;

const InfoContainer = tw.div`
  flex flex-col gap-6 w-full
`;
