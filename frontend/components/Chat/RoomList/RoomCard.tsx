import tw from "twin.macro";
import Image from "next/image";
import { getIcons } from "@/components/icons";
import { ROOM_IMAGE } from "@/constants/chat";

interface RoomCardProps {
  title: string;
  game: "lol" | "valorant" | "etc";
  currentMember: number;
  maximumMember: number;
  onClickCard: () => void;
}

const RoomCard = ({
  title,
  game,
  currentMember,
  maximumMember,
  onClickCard,
}: RoomCardProps) => {
  return (
    <RoomCardContainer onClick={onClickCard}>
      <RoomInfo>
        <RoomMemberCount>
          {new Array(currentMember).fill(getIcons("person", 40, "green"))}
          {new Array(maximumMember - currentMember).fill(
            getIcons("person", 40, "lightgray")
          )}
        </RoomMemberCount>
        <RoomTitle>{title}</RoomTitle>
      </RoomInfo>
      <Image
        src={ROOM_IMAGE[game]}
        alt={game}
        fill={true}
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    </RoomCardContainer>
  );
};

export default RoomCard;

const RoomCardContainer = tw.li`
  relative inline-block h-36 border rounded-md overflow-hidden cursor-pointer
`;

const RoomInfo = tw.div`
  absolute z-1 flex flex-col justify-center w-full h-full p-2  text-white bg-black/50
`;

const RoomTitle = tw.div`
  grow flex items-center justify-center w-full text-3xl
`;

const RoomMemberCount = tw.div`
  flex
`;
