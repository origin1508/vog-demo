import tw from "twin.macro";
import useChatEditForm from "@/hooks/useChatEditForm";
import { Input, Modal, Button } from "@/components/common";
import { ChatEditProps } from "@/types/chat";
import { CHAT_GAME } from "@/constants/chat";

const ChatEdit = ({
  isOpen,
  handleModalClose,
  handleChatRoomCreate,
}: ChatEditProps) => {
  const { register, handleSubmit, reset } = useChatEditForm();

  return (
    <Modal
      title="방생성"
      isOpen={isOpen}
      hasFooter={false}
      handleClose={handleModalClose}
      handleConfirm={handleModalClose}
    >
      <ChatEditForm onSubmit={handleSubmit(handleChatRoomCreate)}>
        <ChatEditInput>
          <ChatEditLabel>제목</ChatEditLabel>
          <Input
            register={register("title")}
            width={18}
            placeholder="제목을 입력하세요"
          />
        </ChatEditInput>
        <ChatEditInput>
          <ChatEditLabel>게임</ChatEditLabel>
          <ChatGameSelect {...register("game")} defaultValue="etc">
            {CHAT_GAME.map((it, idx) => (
              <option key={idx} value={it.value}>
                {it.text}
              </option>
            ))}
          </ChatGameSelect>
        </ChatEditInput>
        <ChatEditInput>
          <ChatEditLabel>최대 인원수</ChatEditLabel>
          <Input
            type="number"
            register={register("maximumMember")}
            width={18}
            placeholder="최대 인원을 입력해주세요"
            min={2}
            max={10}
          />
        </ChatEditInput>
        <ChatEditButtonContainer>
          <Button
            type="button"
            bgColor="secondary"
            width={4}
            onClick={() => {
              reset();
              handleModalClose();
            }}
          >
            취소
          </Button>
          <Button type="submit" bgColor="primary" width={4}>
            생성
          </Button>
        </ChatEditButtonContainer>
      </ChatEditForm>
    </Modal>
  );
};

export default ChatEdit;

const ChatEditForm = tw.form`
  flex flex-col w-auto
`;

const ChatEditButtonContainer = tw.div`
  flex justify-end p-4 space-x-4
`;

const ChatEditInput = tw.div`
  flex flex-col w-full p-4
`;

const ChatGameSelect = tw.select`
  h-10 bg-transparent border rounded
`;

const ChatEditLabel = tw.label``;
