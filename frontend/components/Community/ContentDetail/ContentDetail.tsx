import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import useUserState from "@/hooks/useUserState";
import useUserProfileState from "@/hooks/useUserProfileState";
import useToast from "@/hooks/useToast";
import MainLayout from "@/components/layout/MainLayout";
import Navigation from "../Navigation";
import { MainCard, Header } from "@/components/common";
import { Content, ContentHeader } from "./Content";
import Comments from "./Comments";
import { getPostRequest, deletePostRequest } from "@/apis/community";
import {
  getLikeListRequest,
  addLikePostRequest,
  cancelLikePostRequset,
} from "@/apis/like";
import { getTitle } from "@/utils/getTitle";
import {
  CommunityQuery,
  ContentDetail as ContentDetailType,
} from "@/types/community";
import { NextPageWithLayout } from "@/pages/_app";
import timeDifference from "@/utils/timeDifference";

const ContentDetail: NextPageWithLayout = () => {
  const [content, setContent] = useState<ContentDetailType>();
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

  const handleEditContent = () => {
    router.push({
      pathname: "/community/edit",
      query: {
        ...router.query,
        editMode: "true",
      },
    });
  };

  const handleDeleteContent = async (postId: number) => {
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

  const handleLikeButtonClick = async () => {
    if (userId === null) return;
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

  if (content === undefined) return null;

  return (
    <ContentDetailContainer>
      <ContentDetailHeader>
        <Navigation category={category} />
        <Header title={getTitle(query.category)} />
      </ContentDetailHeader>
      <ContentDetailBody>
        <MainCard>
          <ContentHeader
            title={content.title}
            isOwner={content.user.id === userId}
            onEdit={handleEditContent}
            onRemove={() => handleDeleteContent(content.id)}
          />
          <Content
            nickname={content.user.nickname}
            text={content.content}
            viewCount={content.view}
            likeCount={likes.length}
            createdAt={timeDifference(content.createdAt)}
            onOpenProfile={() => handleUserProfileOpen(userId)}
            onClickLike={handleLikeButtonClick}
          />
          <Comments
            userId={content.user.id}
            handleUserProfileOpen={() => handleUserProfileOpen(userId)}
          />
        </MainCard>
      </ContentDetailBody>
    </ContentDetailContainer>
  );
};

ContentDetail.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default ContentDetail;

const ContentDetailContainer = tw.article`
  w-full
`;

const ContentDetailHeader = tw.header``;

const ContentDetailBody = tw.section`
  px-9 pb-9
`;
