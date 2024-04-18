import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import useUserState from "@/hooks/useUserState";
import useUserProfileState from "@/hooks/useUserProfileState";
import useToast from "@/hooks/useToast";
import MainLayout from "@/components/layout/MainLayout";
import Navigation from "../Navigation";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import Post from "./Post";
import { getPostRequest, deletePostRequest } from "@/apis/community";
import {
  getLikeListRequest,
  addLikePostRequest,
  cancelLikePostRequset,
} from "@/apis/like";
import { getTitle } from "@/utils/getTitle";
import { getIcons } from "@/components/icons";
import { CommunityQuery, ContentDetail } from "@/types/community";

const Detail = () => {
  const [content, setContent] = useState<ContentDetail>();
  const [category, setCategory] = useState("");
  const [likes, setLikes] = useState<Number[]>([]);
  const { userId } = useUserState();
  const { handleUserProfileOpen } = useUserProfileState();
  const { toast } = useToast();
  const router = useRouter();
  const query = useMemo(() => router.query as CommunityQuery, [router]);

  useEffect(() => {
    if (!query.id) return;
    const postId = Number(query.id);
    setCategory(query.category);
    updatePostDetail(postId);
    updateLikes(postId);
  }, [query]);

  const updateLikes = async (postId: number) => {
    const res = await getLikeListRequest(postId);

    if (res.success) {
      setLikes(res.result.userIds);
    } else {
      toast.alert(res.error);
    }
  };

  const updatePostDetail = async (postId: number) => {
    const res = await getPostRequest(postId);

    if (res.success) {
      setContent(res.result);
    } else {
      toast.alert(res.error);
    }
  };

  const handleDeletePostClick = async (postId: number) => {
    const res = await deletePostRequest(postId);

    if (res.success) {
      router.push({
        pathname: "/community",
        query: {
          category: category,
        },
      });
    } else {
      toast.alert(res.error);
    }
  };

  const handleListButtonClick = () => {
    router.push(`/community?category=${category}`);
  };

  const handleLikeButtonClick = async () => {
    if (!userId) return;
    const postId = Number(query.id);

    if (likes.includes(userId)) {
      const res = await cancelLikePostRequset(userId, postId);
      if (res.success) {
        updateLikes(postId);
      } else {
        toast.alert(res.error);
      }
    } else {
      const res = await addLikePostRequest(userId, postId);
      if (res.success) {
        updateLikes(postId);
      } else {
        toast.alert(res.error);
      }
    }
  };

  return (
    <MainLayout>
      <DetailWrapper>
        <Navigation category={category} />
        <DetailContainer>
          <Header title={getTitle(query.category)}>
            <Button
              width={5}
              bgColor="transparent"
              onClick={handleListButtonClick}
            >
              <ListButton>{getIcons("list", 24)}목록</ListButton>
            </Button>
          </Header>
          <Post
            userId={userId}
            content={content}
            likes={likes}
            handleDeletePostClick={handleDeletePostClick}
            handleLikeButtonClick={handleLikeButtonClick}
            handleUserProfileOpen={handleUserProfileOpen}
          />
        </DetailContainer>
      </DetailWrapper>
    </MainLayout>
  );
};

export default Detail;

const DetailWrapper = tw.article`
  w-full ml-64 p-4
`;

const DetailContainer = tw.section`
  w-full px-10 pb-24
`;

const ListButton = tw.div`
  flex items-center justify-center
`;
