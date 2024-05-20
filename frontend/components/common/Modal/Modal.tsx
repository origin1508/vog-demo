import { ReactNode } from "react";
import tw, { styled } from "twin.macro";
import { Button } from "../index";
import { getIcons } from "@/components/icons";

interface ModalProps {
  isOpen: boolean;
  hasFooter?: boolean;
  title: string;
  content?: string;
  children?: ReactNode;
  onlyClose?: boolean;
  handleClose: () => void;
  handleConfirm?: () => void;
}

export const Modal = ({
  isOpen,
  hasFooter = true,
  title,
  content,
  children,
  onlyClose = false,
  handleClose,
  handleConfirm,
}: ModalProps) => {
  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalCloseButton onClick={handleClose}>
            {getIcons("close", 24)}
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <ModalText>{content}</ModalText>
          {children}
        </ModalBody>
        {hasFooter && (
          <ModalFooter>
            {!onlyClose && (
              <Button
                type="button"
                bgColor="primary"
                width={4}
                onClick={handleConfirm}
              >
                확인
              </Button>
            )}

            <Button
              type="button"
              bgColor="warning"
              width={4}
              onClick={handleClose}
            >
              취소
            </Button>
          </ModalFooter>
        )}
      </ModalContainer>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div<{ isOpen: boolean }>(({ isOpen }) => [
  tw`hidden`,
  isOpen &&
    tw`block fixed flex items-center justify-center inset-0 bg-black/60 z-50 `,
]);

const ModalContainer = tw.div`
  relative min-w-[20rem] shadow bg-zinc-100 rounded-lg
`;

const ModalTitle = tw.h3`
  text-xl font-semibold
`;

const ModalText = tw.p``;

const ModalHeader = tw.div`
  flex items-start justify-between p-4
`;

const ModalCloseButton = tw.button`
  flex items-center justify-center w-8 h-8 rounded
  hover:bg-secondary/10
`;

const ModalBody = tw.div`
  flex flex-col items-center justify-center p-4
`;

const ModalFooter = tw.div`
  flex justify-end py-4 px-8 space-x-4
`;
