import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import useUserState from "@/hooks/useUserState";
import useToast from "@/hooks/useToast";
import useLoadingState from "@/hooks/useLoadingState";
import {
  getCommentsRequest,
  createReplyRequest,
  createCommentRequest,
  deleteReplyRequest,
  deleteCommentRequest,
  editReplyRequest,
  editCommentRequest,
} from "@/apis/comment";
import {
  CommunityQuery,
  Comment,
  HandleDeleteCommentClick,
  HandleCommentSubmit,
  HandleEditCommentSubmit,
} from "@/types/community";

const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const router = useRouter();
  const { userId } = useUserState();
  const { toast } = useToast();
  const { setLoadingFalse, setLoadingTrue } = useLoadingState();
  const query = useMemo(() => router.query as CommunityQuery, [router]);

  useEffect(() => {
    updateComments(curPage);
  }, [curPage]);

  const updateComments = async (page: number) => {
    if (!query.id) return;

    const postId = Number(query.id);
    setLoadingTrue();
    try {
      const res = await getCommentsRequest(postId, page);
      if (res.success) {
        setComments(res.result.result);
        setTotalCount(res.result.totalCount);
      } else {
        toast.alert(res.error);
      }
    } catch (error) {
      console.error(error);
    }

    setLoadingFalse();
  };

  const handleCommentSubmit: HandleCommentSubmit = async (
    content,
    commentId
  ) => {
    if (userId === null) return;
    if (!query.id) return;
    if (!content) {
      toast.alert("댓글을 입력해주세요.");
      return;
    }

    const postId = Number(query.id);
    const res = commentId
      ? await createReplyRequest(userId, commentId, content)
      : await createCommentRequest(userId, postId, content);
    if (res.success) {
      updateComments(curPage);
    }
  };

  const handleDeleteCommentClick: HandleDeleteCommentClick = async (
    isReply,
    commentId
  ) => {
    const res = isReply
      ? await deleteReplyRequest(commentId)
      : await deleteCommentRequest(commentId);
    if (res.success) {
      updateComments(curPage);
      toast.success("댓글이 삭제되었습니다.");
    } else {
      toast.alert(res.error);
    }
  };

  const handleEditCommentSubmit: HandleEditCommentSubmit = async (
    isReply,
    content,
    setIsEditing,
    commentId
  ) => {
    if (!commentId) return;
    if (!content) {
      toast.alert("댓글을 입력해주세요.");
      return;
    }

    const res = isReply
      ? await editReplyRequest(commentId, content)
      : await editCommentRequest(commentId, content);
    if (res.success) {
      updateComments(curPage);
      if (setIsEditing) {
        setIsEditing(false);
        toast.success("댓글이 수정되었습니다.");
      }
    } else {
      toast.alert(res.error);
    }
  };

  return {
    comments,
    curPage,
    totalCount,
    setCurPage,
    handleCommentSubmit,
    handleDeleteCommentClick,
    handleEditCommentSubmit,
  };
};

export default useComments;
