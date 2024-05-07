import { useState } from "react";
import tw from "twin.macro";
import CommentEdit from "./CommentEdit";
import { Button } from "@/components/common";
import { CommentProps } from "@/types/community";
import timeDifference from "@/utils/timeDifference";

const Reply = ({
  userId,
  comment: reply,
  handleCommentSubmit,
  handleDeleteCommentClick,
  handleEditCommentSubmit,
  handleUserProfileOpen,
}: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ReplyContainer key={reply.id}>
      <ReplyAuthor>
        <ReplyNickname onClick={() => handleUserProfileOpen(reply.user.id)}>
          {reply.user.nickname}
        </ReplyNickname>
        <ReplyTime>{timeDifference(reply.createdAt)}</ReplyTime>
        {userId === reply.user.id && (
          <ReplyButtonContainer>
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
                await handleDeleteCommentClick(true, reply.id)
              }
            >
              삭제
            </Button>
          </ReplyButtonContainer>
        )}
      </ReplyAuthor>
      {isEditing ? (
        <CommentEdit
          setReply={false}
          isReply={true}
          value={reply.content}
          commentId={reply.id}
          setIsEditing={setIsEditing}
          handleCommentSubmit={handleCommentSubmit}
          handleEditCommentSubmit={handleEditCommentSubmit}
        />
      ) : (
        <ReplyText>{reply.content}</ReplyText>
      )}
    </ReplyContainer>
  );
};

export default Reply;

const ReplyContainer = tw.div`
  relative px-4 mb-2
`;

const ReplyAuthor = tw.div`
  flex justify-between items-center w-full px-4 h-8 bg-caution/20 rounded
`;

const ReplyNickname = tw.span`
  cursor-pointer
`;

const ReplyTime = tw.div`
  ml-2 px-2
`;

const ReplyText = tw.p`
  my-2 px-2
`;

const ReplyButtonContainer = tw.div`
  flex gap-2 ml-auto text-blue-500
`;
