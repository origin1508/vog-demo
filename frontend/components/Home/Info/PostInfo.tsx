import tw from "twin.macro";
import { useRouter } from "next/router";
import { Content } from "@/types/community";
import timeDifference from "@/utils/timeDifference";

interface PostsInfoProps {
  latestPosts: Content[];
}

const CATEGORY = {
  free: "자유",
  humor: "유머",
  championship: "대회",
};

const PostInfo = ({ latestPosts }: PostsInfoProps) => {
  const router = useRouter();
  return (
    <PostInfoContainer>
      <LatestPosts>
        <PostsHeader>
          <PostsTitle>최신 글</PostsTitle>
        </PostsHeader>
        <Posts>
          {latestPosts.length > 0 ? (
            latestPosts.map((it) => (
              <Post
                key={it.id}
                onClick={() =>
                  router.push({
                    pathname: `/community/${it.id}`,
                    query: { cateogry: it.postCategory },
                  })
                }
              >
                <PostCategory>{CATEGORY[it.postCategory]}</PostCategory>
                <PostTitle>{it.title}</PostTitle>
                <PostDate>{timeDifference(it.createdAt)}</PostDate>
              </Post>
            ))
          ) : (
            <Blank>최신 글이 없습니다.</Blank>
          )}
        </Posts>
      </LatestPosts>
      {/* <PopularPosts>
        <PostsHeader>
          <PostsTitle>인기 글</PostsTitle>
        </PostsHeader>
        <Posts>
          <Post>
            <PostCategory>유머</PostCategory>
            <PostTitle>오늘의 유머</PostTitle>
            <PostDate>1일전</PostDate>
          </Post>
        </Posts>
      </PopularPosts> */}
    </PostInfoContainer>
  );
};

export default PostInfo;

const PostInfoContainer = tw.article`
  flex gap-6
  max-lg:flex-col
`;

const LatestPosts = tw.section`
  w-full p-4 bg-white shadow-md rounded-xl
`;

// const PopularPosts = tw.section`
//   w-full p-4 bg-white shadow-md rounded-xl
// `;

const PostsHeader = tw.header`
  px-2 py-1 border-b-2
`;

const PostsTitle = tw.h2`
  text-xl
`;

const Posts = tw.ul`
  h-[410px]
`;

const Post = tw.li`
  flex gap-2 p-2 border-b border-zinc-200 cursor-pointer
`;

const PostCategory = tw.span`
  px-2 rounded text-white bg-zinc-400
`;

const PostTitle = tw.p`
  grow
`;

const PostDate = tw.span``;

const Blank = tw.div`
  flex justify-center items-center h-full
`;
