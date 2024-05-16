import React, { useEffect, useState, type ReactElement } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import tw from "twin.macro";
import useUserState from "@/hooks/useUserState";
import useToast from "@/hooks/useToast";
import MainLayout from "@/components/layout/MainLayout";
import { Button, MainCard } from "@/components/common";
import {
  createPostRequest,
  getPostRequest,
  editPostRequest,
} from "@/apis/community";
import { CommunityQuery } from "@/types/community";
import { NextPageWithLayout } from "@/pages/_app";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const CATEGORY = [
  { value: "free", text: "자유게시판" },
  { value: "humor", text: "유머게시판" },
  { value: "championship", text: "대회소식" },
];

const Edit: NextPageWithLayout = () => {
  const router = useRouter();
  const { toast } = useToast();
  const query = router.query as CommunityQuery;
  const { userId } = useUserState();
  const [post, setPost] = useState({
    title: "",
    content: "",
    category: query.category || "free",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (query.editMode === "true") {
      setEditMode(true);
      const postId = Number(query.id);
      (async () => {
        const res = await getPostRequest(postId);

        if (res.success) {
          const title = res.result.title;
          const content = res.result.content;
          setPost((prev) => {
            return {
              ...prev,
              title: title,
              content: content,
            };
          });
        } else {
          router.back();
        }
      })();
    }
  }, []);

  const handlePostSumbit = async () => {
    if (userId === null) return;

    const res = editMode
      ? await editPostRequest(Number(query.id), post.title, post.content)
      : await createPostRequest({
          writerId: userId,
          title: post.title,
          content: post.content,
          postCategory: post.category,
        });
    if (res.success) {
      const postId = res.result.id;
      const postCategory = res.result.postCategory;
      router.replace({
        pathname: `/community/${postId}`,
        query: {
          category: postCategory,
        },
      });
    } else {
      toast.alert(res.error);
    }
  };

  return (
    <EditContainer>
      <MainCard>
        <EditCategory
          defaultValue={router.query.category}
          disabled={editMode ? true : false}
          onChange={(e) =>
            setPost((prev) => {
              return { ...prev, category: e.target.value };
            })
          }
        >
          {CATEGORY.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.text}
              </option>
            );
          })}
        </EditCategory>
        <EditTitle
          width={32}
          placeholder="제목을 입력하세요"
          value={post.title}
          onChange={(e) => {
            return setPost((prev) => {
              return { ...prev, title: e.target.value };
            });
          }}
        ></EditTitle>
        <Editor>
          <ReactQuill
            theme="snow"
            value={post.content}
            onChange={(value) => {
              setPost((prev) => {
                return { ...prev, content: value };
              });
            }}
          />
        </Editor>
        <EditButtonContainer>
          <Button
            type="button"
            width={8}
            bgColor="secondary"
            onClick={handlePostSumbit}
          >
            글쓰기
          </Button>
          <Button
            type="button"
            width={8}
            bgColor="caution"
            onClick={() => {
              router.push({
                pathname: "/community",
                query: { category: query.category },
              });
            }}
          >
            취소
          </Button>
        </EditButtonContainer>
      </MainCard>
    </EditContainer>
  );
};

Edit.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Edit;

const EditContainer = tw.div`
  flex flex-col w-full p-9
`;

const EditTitle = tw.input`
  p-2 border-b-2 border-caution text-2xl outline-none
  placeholder:text-neutral-700
`;

const Editor = tw.div`
  relative h-full
  [& .quill]:(absolute flex flex-col h-full w-full)
  [& .ql-container]:(overflow-auto)
`;

const EditCategory = tw.select`
  w-32 p-2 border rounded text-base
`;

const EditButtonContainer = tw.div`
  flex gap-8 items-center justify-end
`;
