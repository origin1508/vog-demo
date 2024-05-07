import { useState } from "react";
import tw from "twin.macro";
import CommentEdit from "./CommentEdit";
import { Button } from "@/components/common";
import Reply from "./Reply";
import { CommentProps } from "@/types/community";
import timeDifference from "@/utils/timeDifference";
import { getIcons } from "@/components/icons";

const Comment = ({
  comment,
  userId,
  handleCommentSubmit,
  handleDeleteCommentClick,
  handleEditCommentSubmit,
  handleUserProfileOpen,
}: CommentProps) => {
  const [replyToggle, setReplyToggle] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const replies = comment.replies;
  const isOwner = userId === comment.user.id;
  return (
    <CommentContainer>
      <CommentAuthor>
        <CommentNickname onClick={() => handleUserProfileOpen(comment.user.id)}>
          {comment.user.nickname}
        </CommentNickname>
        <CommentTime>{timeDifference(comment.createdAt)}</CommentTime>
        {isOwner && (
          <CommentButtonContainer>
            <Button
              bgColor="transparent"
              width={4}
              height={2}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              수정
            </Button>
            <Button
              bgColor="transparent"
              width={4}
              height={2}
              onClick={async () =>
                await handleDeleteCommentClick(false, comment.id)
              }
            >
              삭제
            </Button>
          </CommentButtonContainer>
        )}
      </CommentAuthor>
      {isEditing ? (
        <CommentEdit
          setReply={false}
          isReply={false}
          value={comment.content}
          commentId={comment.id}
          setIsEditing={setIsEditing}
          handleCommentSubmit={handleCommentSubmit}
          handleEditCommentSubmit={handleEditCommentSubmit}
        />
      ) : (
        <CommentText>{comment.content}</CommentText>
      )}
      <CommentEdit
        setReply={true}
        isReply={true}
        commentId={comment.id}
        handleCommentSubmit={handleCommentSubmit}
      />
      {replies.length > 0 && (
        <ReplyToggle onClick={() => setReplyToggle((prev) => !prev)}>
          {replyToggle
            ? getIcons("on", 24, "gray")
            : getIcons("off", 24, "gray")}
          답글
          {replies.length}개
        </ReplyToggle>
      )}
      {replyToggle &&
        replies.map((reply) => {
          return (
            <Reply
              key={reply.id}
              userId={userId}
              comment={reply}
              handleCommentSubmit={handleCommentSubmit}
              handleDeleteCommentClick={handleDeleteCommentClick}
              handleEditCommentSubmit={handleEditCommentSubmit}
              handleUserProfileOpen={handleUserProfileOpen}
            />
          );
        })}
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = tw.div`
`;

const CommentAuthor = tw.div`
  flex justify-between items-center w-full px-4 h-8 bg-secondary/10 rounded
`;

const CommentNickname = tw.span`
  cursor-pointer
`;

const CommentTime = tw.div`
  ml-2 px-2
`;

const CommentText = tw.p`
  my-2 px-2 whitespace-pre-wrap
`;

const CommentButtonContainer = tw.div`
  flex gap-2 ml-auto text-blue-500
`;

const ReplyToggle = tw.div`
  flex gap-1 mb-2 text-primary cursor-pointer
`;
