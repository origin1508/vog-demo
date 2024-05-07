import Image from "next/image";
import tw from "twin.macro";
import { getIcons } from "@/components/icons";
import { RoomListProps } from "@/types/chat";

const RoomList = ({ roomList, handleRoomClick }: RoomListProps) => {
  return (
    <RoomListContainer>
      {roomList.map((room) => {
        return (
          <Room key={room.roomId} onClick={() => handleRoomClick(room.roomId)}>
            <RoomInfo>
              <RoomMemberCount>
                {new Array(room.currentMember).fill(
                  getIcons("person", 40, "green")
                )}
                {new Array(room.maximumMember - room.currentMember).fill(
                  getIcons("person", 40, "lightgray")
                )}
              </RoomMemberCount>
              <RoomTitle>{room.title}</RoomTitle>
            </RoomInfo>
            <Image
              src="/image/room/valorant.jpg"
              alt="lol"
              fill={true}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </Room>
        );
      })}
    </RoomListContainer>
  );
};

export default RoomList;

const RoomListContainer = tw.ul`
  grid grid-cols-4 gap-8 w-full
`;

const Room = tw.li`
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
