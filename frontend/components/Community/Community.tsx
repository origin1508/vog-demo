import { useEffect, useState, useMemo } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import tw from "twin.macro";
import useToast from "@/hooks/useToast";
import useLoadingState from "@/hooks/useLoadingState";
import { Header, Button } from "@/components/common";
import Navigation from "./Navigation";
import { Contents, ContentsFilter } from "./Contents";
import MainLayout from "../layout/MainLayout";
import { MainCard, Pagination } from "@/components/common";
import { getPostsRequest, searchPostRequest } from "@/apis/community";
import { getAccessToken } from "@/utils/tokenManager";
import type { CommunityProps, CommunityQuery } from "@/types/community";
import type { NextPageWithLayout } from "@/pages/_app";

const Community: NextPageWithLayout<CommunityProps> = ({
  data,
}: CommunityProps) => {
  const [curPage, setCurPage] = useState(1);
  const [contents, setContents] = useState(data.result.result);
  const [totalCount, setTotalCount] = useState(data.result.totalCount);
  const router = useRouter();
  const { toast } = useToast();
  const { setLoadingFalse, setLoadingTrue } = useLoadingState();
  const query = useMemo(() => router.query as CommunityQuery, [router]);
  const category = useMemo(() => query.category, [query]);
  const searchType = useMemo(() => query.type, [query]);
  const keyword = useMemo(() => query.keyword, [query]);

  useEffect(() => {
    const initContent = async () => {
      setLoadingTrue();
      try {
        const res = await getPostsRequest(category, 1);
        setContents(res.result.result);
        setTotalCount(res.result.totalCount);
      } catch (error) {
        console.log(error);
      }
      setLoadingFalse();
    };

    initContent();
  }, [query]);

  useEffect(() => {
    if (searchType && keyword) {
      (async () => {
        setLoadingTrue();
        const res = await searchPostRequest(
          category,
          searchType,
          keyword,
          curPage
        );
        if (res.success) {
          if (res.result.totalCount === 0) {
            toast.success("검색결과가 없습니다.");
          } else {
            setContents(res.result.searchedResult);
            setTotalCount(res.result.totalCount);
            setCurPage(1);
          }
        } else {
          toast.alert(res.error);
        }
        setLoadingFalse();
      })();
    }
  }, [searchType, keyword, curPage]);

  const handleEditButtonClick = () => {
    router.push({
      pathname: "/community/edit",
      query: {
        category: category,
      },
    });
  };

  const handleContentClick = (postId: number) => {
    router.push({
      pathname: "/community/[id]",
      query: { id: postId, category: category },
    });
  };

  return (
    <CommunityContainer>
      <CommunityHeader>
        <Navigation category={category} />
        <Header title="커뮤니티" />
      </CommunityHeader>
      <CommunityBody>
        <MainCard>
          <ContentsFilter />
          <Contents
            contents={contents}
            handleContentClick={handleContentClick}
          />
          <CommunityButtonContainer>
            <Pagination
              curPage={curPage}
              count={totalCount}
              setCurPage={setCurPage}
            />
            <Button
              width={6}
              bgColor="secondary"
              position={{ type: "absolute", right: "0", bottom: "0" }}
              onClick={handleEditButtonClick}
            >
              글쓰기
            </Button>
          </CommunityButtonContainer>
        </MainCard>
      </CommunityBody>
    </CommunityContainer>
  );
};

Community.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Community;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req;
  const accessToken = getAccessToken(req);
  const query = context.query as CommunityQuery;
  const category = query.category;

  const res = await getPostsRequest(category, 1, accessToken);
  if (res.success) {
    return {
      props: {
        data: { ...res },
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

const CommunityContainer = tw.article`
  w-full
`;

const CommunityHeader = tw.header``;

const CommunityBody = tw.section`
  w-full px-9
`;

const CommunityButtonContainer = tw.div`
  relative w-full
`;
