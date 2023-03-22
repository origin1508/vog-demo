import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import tw from "twin.macro";
import MainLayout from "../layout/MainLayout";
import Header from "../common/Header";
import Search from "../common/Search";
import Navigation from "./Navigation";
import Contents from "./Contents";
import Pagination from "../Pagination";
import Button from "../common/Button";
import { getPostsRequest } from "@/apis/community";
import { getTitle } from "@/utils/getTitle";
import { CommunityProps, CommunityQuery } from "@/types/community";

const Community = ({ data }: CommunityProps) => {
  const [contents, setContents] = useState(data.result);
  const router = useRouter();
  const query = router.query as CommunityQuery;
  const category = query.category;
  const title = getTitle(category || "");

  const handleEditButton = () => {
    router.push({
      pathname: "/community/edit",
      query: {
        category: category,
      },
    });
  };

  useEffect(() => {
    (async () => {
      const res = await getPostsRequest(category, 1);
      setContents(res.result);
    })();
  }, [category]);

  return (
    <MainLayout>
      <CommunityWrapper>
        <Navigation category={category} />
        <CommunityContainer>
          <Header title={title ? title : "전체"}>
            <Search />
          </Header>
          <Contents contents={contents} category={category} />
        </CommunityContainer>
        <CommunityButtonContainer>
          <Pagination />
          <Button
            width={6}
            bgColor="primary"
            position={{ type: "absolute", top: "0", right: "8rem" }}
            onClick={handleEditButton}
          >
            글쓰기
          </Button>
        </CommunityButtonContainer>
      </CommunityWrapper>
    </MainLayout>
  );
};

export default Community;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query as CommunityQuery;
  const category = query.category;
  const res = await getPostsRequest(category, 1);

  return { props: { data: res } };
};

const CommunityWrapper = tw.article`
  w-full ml-64 p-4
`;

const CommunityContainer = tw.section`
  w-full px-10
`;

const CommunityButtonContainer = tw.div`
  relative p-4
`;
