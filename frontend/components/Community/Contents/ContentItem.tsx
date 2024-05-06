import tw from "twin.macro";
import { getIcons } from "@/components/icons";

interface ContentProps {
  likeCount: number | string;
  title: string;
  author: string;
  viewCount: number | string;
  createdAt: string;
  commentCount?: number;
  onClick?: () => void;
}

export const ContentItem = ({
  likeCount,
  title,
  author,
  viewCount,
  createdAt,
  commentCount,
  onClick,
}: ContentProps) => {
  return (
    <ContentItemContainer onClick={onClick}>
      <ContentLikeCount>
        {typeof likeCount === "number" && getIcons("thumb", 14, "gray")}
        {likeCount}
      </ContentLikeCount>
      <ContentTitle>
        {title}
        {commentCount !== undefined && (
          <CommentCount>{`[${commentCount}]`}</CommentCount>
        )}
      </ContentTitle>
      <ContentAuthor>{author}</ContentAuthor>
      <ContentViewCount>
        {typeof viewCount === "number" && getIcons("eye", 14, "gray")}
        {viewCount}
      </ContentViewCount>
      <ContentTime>{createdAt}</ContentTime>
    </ContentItemContainer>
  );
};

const ContentItemContainer = tw.li`
  flex items-center w-full h-10 px-4 text-center border-b
  first:(font-medium)
`;

const ContentLikeCount = tw.span`
flex gap-1 justify-center items-center px-2 w-20
`;

const ContentTitle = tw.span`
grow text-left
`;

const CommentCount = tw.span`
text-blue-600
`;

const ContentAuthor = tw.span`
w-1/12
`;

const ContentViewCount = tw.span`
  flex w-[8%] justify-center items-center gap-1 px-2
`;
const ContentTime = tw.div`
  flex justify-center items-center w-1/12
`;
