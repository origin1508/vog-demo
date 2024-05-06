import { Dispatch, SetStateAction } from "react";
import tw, { styled } from "twin.macro";
import usePagination from "@/hooks/usePagination";
import { getIcons } from "../../icons";

interface PaginationProps {
  count: number;
  curPage: number;
  setCurPage: Dispatch<SetStateAction<number>>;
}

export const Pagination = ({ count, curPage, setCurPage }: PaginationProps) => {
  const {
    pageList,
    handleNextPageClick,
    handlePrevPageClick,
    handlePageClick,
  } = usePagination({
    totalPage: Math.ceil(count / 10),
    pageRange: 10,
    curPage,
    setCurPage,
  });
  if (count === 0) return null;

  return (
    <PaginationContainer>
      <PrevOrNextPageButton onClick={handlePrevPageClick}>
        {getIcons("left", 16)}
      </PrevOrNextPageButton>
      {pageList.map((page, index) => {
        return (
          <PageButton
            key={index}
            isActive={curPage === page}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </PageButton>
        );
      })}
      <PrevOrNextPageButton onClick={handleNextPageClick}>
        {getIcons("right", 16)}
      </PrevOrNextPageButton>
    </PaginationContainer>
  );
};

const PaginationContainer = tw.div`
  flex gap-2 items-center justify-center w-full h-10
  [> button]:(border border-zinc-200 rounded-md)
`;

const PageButton = styled.button<{ isActive: boolean }>(({ isActive }) => [
  tw`w-6 h-6`,
  isActive && tw`bg-primary border-none text-white `,
]);

const PrevOrNextPageButton = tw.button`
  flex items-center justify-center w-6 h-6 text-primary 
`;
