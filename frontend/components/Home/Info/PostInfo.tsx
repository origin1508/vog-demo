import tw from "twin.macro";

const PostInfo = () => {
  return (
    <PostInfoContainer>
      <LatestPosts>
        <PostsHeader>
          <PostsTitle>최신 글</PostsTitle>
        </PostsHeader>
        <Posts>
          {/* <Post>
            <PostCategory>대회</PostCategory>
            <PostTitle>오늘의 대회</PostTitle>
            <PostDate>1일전</PostDate>
          </Post> */}
          <Blank>최신 글이 없습니다.</Blank>
        </Posts>
      </LatestPosts>
      <PopularPosts>
        <PostsHeader>
          <PostsTitle>인기 글</PostsTitle>
        </PostsHeader>
        <Posts>
          <Post>
            <PostCategory>유머</PostCategory>
            <PostTitle>오늘의 유머</PostTitle>
            <PostDate>1일전</PostDate>
          </Post>
          {/* <Blank>인기 글이 없습니다.</Blank> */}
        </Posts>
      </PopularPosts>
    </PostInfoContainer>
  );
};

export default PostInfo;

const PostInfoContainer = tw.article`
  flex gap-6
`;

const LatestPosts = tw.section`
  w-full p-4 bg-white shadow-md rounded-xl
`;

const PopularPosts = tw.section`
  w-full p-4 bg-white shadow-md rounded-xl
`;

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
  flex gap-2 p-2 border-b border-zinc-200
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
