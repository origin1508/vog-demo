import tw from "twin.macro";
import useComments from "@/hooks/useComments";
import Comment from "./Comment";
import CommentEdit from "./CommentEdit";
import { CommentsProps } from "@/types/community";
import Pagination from "@/components/Pagination";

const Comments = ({ userId, handleUserProfileOpen }: CommentsProps) => {
  const {
    comments,
    curPage,
    totalCount,
    setCurPage,
    handleCommentSubmit,
    handleDeleteCommentClick,
    handleEditCommentSubmit,
  } = useComments();

  return (
    <CommentsContainer>
      <CommentsTitle>댓글</CommentsTitle>
      <CommentEdit
        setReply={false}
        isReply={false}
        handleCommentSubmit={handleCommentSubmit}
      />
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            userId={userId}
            handleCommentSubmit={handleCommentSubmit}
            handleDeleteCommentClick={handleDeleteCommentClick}
            handleEditCommentSubmit={handleEditCommentSubmit}
            handleUserProfileOpen={handleUserProfileOpen}
          />
        );
      })}
      <Pagination
        count={totalCount}
        curPage={curPage}
        setCurPage={setCurPage}
      />
    </CommentsContainer>
  );
};

export default Comments;

const CommentsContainer = tw.div`
  relative divide-y divide-neutral-700
`;

const CommentsTitle = tw.div`
  flex items-center px-4 h-8 bg-zinc-900
`;
