import tw from "twin.macro";
import { Button } from "@/components/common";
import { getIcons } from "@/components/icons";

interface ContentProps {
  nickname: string;
  text: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  onOpenProfile: () => void;
  onClickLike: () => void;
}

export const Content = ({
  nickname,
  text,
  viewCount,
  likeCount,
  createdAt,
  onOpenProfile,
  onClickLike,
}: ContentProps) => {
  return (
    <ContentContainer>
      <ContentInfoContainer>
        <ContentInfoLeft>
          <ContentInfo onClick={onOpenProfile}>{nickname}</ContentInfo>
        </ContentInfoLeft>
        <ContentInfoRight>
          <ContentInfo>
            {getIcons("thumb", 16)}
            {likeCount}
          </ContentInfo>
          <ContentInfo>
            {getIcons("eye", 16)}
            {viewCount}
          </ContentInfo>
          <ContentInfo>
            {getIcons("time", 16)}
            {createdAt}
          </ContentInfo>
        </ContentInfoRight>
      </ContentInfoContainer>
      <ContentTextContainer>
        <ContentText dangerouslySetInnerHTML={{ __html: text }} />
        <ContentLike>
          <Button bgColor="secondary" width={6} onClick={onClickLike}>
            <LikeButton>
              {getIcons("thumb", 20)}
              <LikeCount>{likeCount}</LikeCount>
            </LikeButton>
          </Button>
        </ContentLike>
      </ContentTextContainer>
    </ContentContainer>
  );
};

const ContentContainer = tw.div`
`;

const ContentInfoContainer = tw.div`
  flex items-center justify-between px-4 h-8 bg-secondary/10 rounded
`;

const ContentInfoLeft = tw.div``;

const ContentInfoRight = tw.div`
  flex gap-16
`;

const ContentInfo = tw.div`
  flex items-center justify-center gap-1
`;

const ContentTextContainer = tw.div`
  text-base
`;

const ContentText = tw.div`
  py-8 px-4
`;

const ContentLike = tw.div`
  w-full text-center
`;

const LikeButton = tw.div`
  flex gap-2 items-center justify-center
`;

const LikeCount = tw.div`
  text-xl font-medium
`;
