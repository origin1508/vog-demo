import tw from "twin.macro";
import { Search } from "@/components/common";
import { COMMUNITY_SEARCH_OPTION } from "@/constants/search";

export const ContentsFilter = () => {
  return (
    <ContentsFilterContainer>
      <Search options={COMMUNITY_SEARCH_OPTION} />
    </ContentsFilterContainer>
  );
};

const ContentsFilterContainer = tw.div`
  flex w-full justify-end
`;
