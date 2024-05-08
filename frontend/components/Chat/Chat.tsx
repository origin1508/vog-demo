import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import tw from "twin.macro";

import useModal from "@/hooks/useModal";
import useUserState from "@/hooks/useUserState";
import useChatState from "@/hooks/useChatState";
import useLoadingState from "@/hooks/useLoadingState";
import useToast from "@/hooks/useToast";

import MainLayout from "../layout/MainLayout";
import RoomList from "./RoomList";
import ChatEdit from "./ChatEdit";
import {
  Header,
  Search,
  Pagination,
  Button,
  MainCard,
} from "@/components/common";

import {
  createChatRoomRequest,
  joinChatRoomRequest,
  getChatRoomsRequest,
  searchChatRoomsRequest,
} from "@/apis/chat";
import { ChatProps, ChatEditValue, ChatQuery } from "@/types/chat";
import { getAccessToken } from "@/utils/tokenManager";
import { getIcons } from "../icons";
import { CHAT_SEARCH_OPTION } from "@/constants/search";
import { NextPageWithLayout } from "@/pages/_app";

const Chat: NextPageWithLayout<ChatProps> = ({ data }: ChatProps) => {
  const router = useRouter();
  const { result } = data;
  const [roomList, setRoomList] = useState(result.result);
  const [curPage, setCurPage] = useState(1);
  const [totalCount, setTotalCount] = useState(result.totalCount);
  const { userId } = useUserState();
  const { setChat } = useChatState();
  const { setLoadingTrue, setLoadingFalse } = useLoadingState();
  const { toast } = useToast();
  const { isOpen, handleModalClose, handleModalOpen } = useModal();
  const query = router.query as ChatQuery;

  useEffect(() => {
    const keyword = query.keyword;
    if (keyword) {
      (async () => {
        setLoadingTrue();
        setCurPage(1);
        const res = await searchChatRoomsRequest(keyword, curPage);
        if (res.success) {
          if (res.result.totalCount === 0) {
            toast.success("검색 결과가 없습니다.");
          } else {
            setRoomList(res.result.searchedResult);
            setTotalCount(res.result.totalCount);
          }
        } else {
          toast.alert(res.error);
        }
        setLoadingFalse();
      })();
    } else {
      (async () => await updateChatRooms(curPage))();
    }
  }, [query, curPage]);

  const updateChatRooms = async (curPage: number) => {
    setLoadingTrue();
    try {
      const res = await getChatRoomsRequest(curPage);
      setRoomList(res.result.result);
      setTotalCount(res.result.totalCount);
    } catch (error) {
      console.log(error);
    }
    setLoadingFalse();
  };

  const handleChatRoomCreate = async (data: ChatEditValue) => {
    if (userId === null) {
      router.push("/login");
      return;
    }

    const { title, game, maximumMember } = data;
    const res = await createChatRoomRequest(userId, title, game, maximumMember);
    if (res.success) {
      const { roomId } = res.result;
      setChat((prev) => {
        return { ...prev, roomId: roomId, title: title };
      });
      router.push(`/chat/${roomId}`);
    } else {
      toast.alert(res.error);
    }
  };

  const handleRoomClick = async (roomId: string) => {
    if (userId === null) {
      router.push("/login");
      return;
    }

    const res = await joinChatRoomRequest(roomId, userId);
    if (res.success) {
      if (res.result.canParticipant) {
        setChat((prev) => {
          return { ...prev, roomId: roomId, title: res.result.title };
        });
        router.push(`/chat/${roomId}`);
      }
    } else {
      toast.alert(res.error);
    }
  };

  return (
    <>
      <ChatContainer>
        <Header title="채팅" />
        <ChatBody>
          <MainCard>
            <SearchContainer>
              <ChatButtonContainer>
                <Button width={6} bgColor="primary" onClick={handleModalOpen}>
                  방생성
                </Button>
                <RefreshButton onClick={() => updateChatRooms(curPage)}>
                  <RefreshIcon>{getIcons("reload", 30)}</RefreshIcon>
                </RefreshButton>
              </ChatButtonContainer>
              {CHAT_SEARCH_OPTION && <Search options={CHAT_SEARCH_OPTION} />}
            </SearchContainer>
            {roomList.length !== 0 ? (
              <RoomList roomList={roomList} handleRoomClick={handleRoomClick} />
            ) : (
              <Blank>생성된 방이 없습니다.</Blank>
            )}
            <PaginationContainer>
              <Pagination
                curPage={curPage}
                count={totalCount}
                setCurPage={setCurPage}
              />
            </PaginationContainer>
          </MainCard>
        </ChatBody>
      </ChatContainer>
      <ChatEdit
        isOpen={isOpen}
        handleModalClose={handleModalClose}
        handleChatRoomCreate={handleChatRoomCreate}
      />
    </>
  );
};

Chat.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Chat;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req;
  const accessToken = getAccessToken(req);
  const res = await getChatRoomsRequest(1, accessToken);
  if (res.success) {
    return {
      props: {
        data: res,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/login?authorized=false",
        permanvet: false,
      },
      props: {},
    };
  }
};

const ChatContainer = tw.article`
  w-full h-full
`;

const ChatBody = tw.div`
  w-full px-9
`;

const ChatButtonContainer = tw.div`
  flex items-center gap-4
`;

const RefreshButton = tw.button`
  flex items-center justify-center w-10 h-10 rounded
  hover:bg-white/30
`;

const RefreshIcon = tw.div``;

const SearchContainer = tw.div`
  flex items-center justify-between py-4
`;

const PaginationContainer = tw.div`
  relative p-4 clear-both
`;

const Blank = tw.div`
  flex justify-center items-center
`;
