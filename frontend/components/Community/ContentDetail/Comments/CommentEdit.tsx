import { useRef, useState, useEffect } from "react";
import tw from "twin.macro";
import { Textarea, Button } from "@/components/common/";
import { CommentEditProps } from "@/types/community";

const CommentEdit = ({
  setReply,
  isReply,
  value,
  commentId,
  setIsEditing,
  handleCommentSubmit,
  handleEditCommentSubmit,
}: CommentEditProps) => {
  const [isShow, setIsShow] = useState(!setReply);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current && value) {
      textareaRef.current.value = value;
    }
  }, []);

  const handleIsShowToggle = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <CommentEditContainer>
      {setReply && (
        <CommentEditButton>
          <Button bgColor="transparent" height={2} onClick={handleIsShowToggle}>
            답글
          </Button>
        </CommentEditButton>
      )}

      {isShow && (
        <CommentTextarea>
          <Textarea
            placeholder="댓글을 입력하세요."
            textareaRef={textareaRef}
            buttonRef={buttonRef}
          />
          <CommentBntContainer>
            {setReply && (
              <CommentButton onClick={handleIsShowToggle}>취소</CommentButton>
            )}
            <CommentButton
              ref={buttonRef}
              onClick={async () => {
                handleEditCommentSubmit
                  ? await handleEditCommentSubmit(
                      isReply,
                      textareaRef.current?.value,
                      setIsEditing,
                      commentId
                    )
                  : await handleCommentSubmit(
                      textareaRef.current?.value,
                      commentId
                    );
                if (textareaRef.current) {
                  textareaRef.current.value = "";
                  textareaRef.current.style.height = "auto";
                }
              }}
            >
              댓글
            </CommentButton>
          </CommentBntContainer>
        </CommentTextarea>
      )}
    </CommentEditContainer>
  );
};

export default CommentEdit;

const CommentEditContainer = tw.div`
  w-full mb-6
`;

const CommentEditButton = tw.div`
  w-16 mt-6 mb-2
`;

const CommentTextarea = tw.div`
  flex h-auto
`;

const CommentBntContainer = tw.div`
  flex h-auto rounded-br overflow-hidden
`;

const CommentButton = tw.button`
  w-16 h-full bg-secondary text-white hover:brightness-110
`;
