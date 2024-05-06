import tw from "twin.macro";
import { ContentItem } from "./ContentItem";
import type { Content } from "@/types/community";
import timeDifference from "@/utils/timeDifference";

interface ContentsProps {
  contents: Content[];
  handleContentClick: (postId: number) => void;
}

export const Contents = ({ contents, handleContentClick }: ContentsProps) => {
  return (
    <ContentsContainer>
      <ContentItem
        likeCount={"추천 수"}
        title="제목"
        author="작성자"
        viewCount="조회수"
        createdAt="작성일"
      />
      {contents.length > 0 ? (
        contents.map((content) => {
          return (
            <ContentItem
              key={content.id}
              likeCount={content.likeCount}
              title={content.title}
              author={content.user.nickname}
              viewCount={content.view}
              createdAt={timeDifference(content.createdAt)}
              commentCount={content.commentCount}
              onClick={() => handleContentClick(content.id)}
            />
          );
        })
      ) : (
        <Blank>작성된 글이 없습니다.</Blank>
      )}
    </ContentsContainer>
  );
};

const ContentsContainer = tw.ul`
  w-full rounded-md bg-white
`;

const Blank = tw.div`
  flex justify-center items-center w-full h-64
`;
