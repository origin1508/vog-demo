import tw from "twin.macro";
import { RoomListProps } from "@/types/chat";
import RoomCard from "./RoomCard";

const RoomList = ({ roomList, handleRoomClick }: RoomListProps) => {
  return (
    <RoomListContainer>
      {roomList.map((room) => (
        <RoomCard
          key={room.roomId}
          title={room.title}
          game={room.game}
          currentMember={room.currentMember}
          maximumMember={room.maximumMember}
          onClickCard={() => handleRoomClick(room.roomId)}
        />
      ))}
    </RoomListContainer>
  );
};

export default RoomList;

const RoomListContainer = tw.ul`
  grid grid-cols-4 gap-8 w-full
  max-lg:grid-cols-2
`;
