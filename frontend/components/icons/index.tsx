import {
  BsChat,
  BsCardList,
  BsEyeFill,
  BsHandThumbsUp,
  BsList,
  BsChevronLeft,
  BsChevronDoubleLeft,
  BsChevronRight,
  BsChevronDoubleRight,
  BsPlus,
  BsCheck2,
  BsExclamationTriangle,
  BsToggleOff,
  BsToggleOn,
  BsPeople,
  BsMicFill,
  BsMicMuteFill,
  BsVolumeMuteFill,
  BsVolumeUpFill,
  BsGearFill,
  BsGenderFemale,
  BsGenderMale,
  BsSearch,
  BsHouse,
  BsChatDots,
} from "react-icons/bs";
import { RxTriangleDown, RxAvatar } from "react-icons/rx";
import {
  BiTime,
  BiLogOut,
  BiLogIn,
  BiUserPlus,
  BiUserMinus,
} from "react-icons/bi";
import { IoClose, IoReload, IoMan } from "react-icons/io5";

export function getIcons(name: string, size: number, color?: string) {
  switch (name) {
    case "chat":
      return <BsChat size={size} color={color} />;
    case "cardList":
      return <BsCardList size={size} color={color} />;
    case "down":
      return <RxTriangleDown size={size} color={color} />;
    case "eye":
      return <BsEyeFill size={size} color={color} />;
    case "time":
      return <BiTime size={size} color={color} />;
    case "thumb":
      return <BsHandThumbsUp size={size} color={color} />;
    case "list":
      return <BsList size={size} color={color} />;
    case "left":
      return <BsChevronLeft size={size} color={color} />;
    case "doubleLeft":
      return <BsChevronDoubleLeft size={size} color={color} />;
    case "right":
      return <BsChevronRight size={size} color={color} />;
    case "doubleRight":
      return <BsChevronDoubleRight size={size} color={color} />;
    case "avatar":
      return <RxAvatar size={size} color={color} />;
    case "plus":
      return <BsPlus size={size} color={color} />;
    case "close":
      return <IoClose size={size} color={color} />;
    case "success":
      return <BsCheck2 size={size} color={color} />;
    case "alert":
      return <BsExclamationTriangle size={size} color={color} />;
    case "exit":
      return <BiLogOut size={size} color={color} />;
    case "off":
      return <BsToggleOff size={size} color={color} />;
    case "on":
      return <BsToggleOn size={size} color={color} />;
    case "addFriend":
      return <BiUserPlus size={size} color={color} />;
    case "removeFriend":
      return <BiUserMinus size={size} color={color} />;
    case "friends":
      return <BsPeople size={size} color={color} />;
    case "mic":
      return <BsMicFill size={size} color={color} />;
    case "micMute":
      return <BsMicMuteFill size={size} color={color} />;
    case "volumeMute":
      return <BsVolumeMuteFill size={size} color={color} />;
    case "volume":
      return <BsVolumeUpFill size={size} color={color} />;
    case "setting":
      return <BsGearFill size={size} color={color} />;
    case "reload":
      return <IoReload size={size} color={color} />;
    case "male":
      return <BsGenderMale size={size} color={color} />;
    case "female":
      return <BsGenderFemale size={size} color={color} />;
    case "search":
      return <BsSearch size={size} color={color} />;
    case "home":
      return <BsHouse size={size} color={color} />;
    case "person":
      return <IoMan size={size} color={color} style={{ width: size / 2 }} />;
    case "login":
      return <BiLogIn size={size} color={color} />;
    case "chatDots":
      return <BsChatDots size={size} color={color} />;
    default:
      console.log("Not implemented!");
      return;
  }
}
