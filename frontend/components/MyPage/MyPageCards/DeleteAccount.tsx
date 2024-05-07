import tw from "twin.macro";
import { MyPageCard, Button } from "@/components/common";
import { DeleteAccountProps } from "@/types/myPage";

const DeleteAccount = ({ handleModalOpen }: DeleteAccountProps) => {
  return (
    <DeleteAccountContainer>
      <MyPageCard title="회원탈퇴">
        <DeleteAccountButton>
          <Button
            type="button"
            bgColor="secondary"
            width={12}
            onClick={handleModalOpen}
          >
            회원탈퇴
          </Button>
        </DeleteAccountButton>
      </MyPageCard>
    </DeleteAccountContainer>
  );
};

export default DeleteAccount;

const DeleteAccountContainer = tw.div`
  flex w-full
`;

const DeleteAccountButton = tw.div`
  flex justify-center
`;
