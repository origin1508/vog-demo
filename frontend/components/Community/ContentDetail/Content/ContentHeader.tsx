import tw from "twin.macro";
import { Button } from "@/components/common";

interface ContentHeaderProps {
  title: string;
  isOwner: boolean;
  onRemove: () => void;
  onEdit: () => void;
}

export const ContentHeader = ({
  title,
  isOwner,
  onRemove,
  onEdit,
}: ContentHeaderProps) => {
  return (
    <ContentHeaderContainer>
      <ContentTitle>{title}</ContentTitle>
      {isOwner && (
        <ContentHeaderButtonContainer>
          <Button bgColor="secondary" width={4} onClick={onEdit}>
            수정
          </Button>
          <Button bgColor="warning" width={4} onClick={onRemove}>
            삭제
          </Button>
        </ContentHeaderButtonContainer>
      )}
    </ContentHeaderContainer>
  );
};

const ContentHeaderContainer = tw.header`
 flex justify-between items-center w-full h-16
`;

const ContentTitle = tw.h3`
  text-2xl
`;

const ContentHeaderButtonContainer = tw.div`
  flex gap-6
`;
