import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import useToast from "@/hooks/useToast";
import { getIcons } from "@/components/icons";

interface SearchProps {
  options: { value: string; text: string }[];
}

export const Search = ({ options }: SearchProps) => {
  const router = useRouter();
  const [searchOption, setSearchOption] = useState<
    { value: string; text: string }[]
  >([]);
  const [search, setSearch] = useState({
    type: options[0].value,
    keyword: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setSearchOption(options);
  }, [options]);

  useEffect(() => {
    setSearch({
      type: options[0].value,
      keyword: "",
    });
  }, [router]);

  const handleSearchClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.keyword) {
      toast.alert("검색어를 입력해주세요.");
      return;
    }

    router.push({
      query: {
        ...router.query,
        type: search.type,
        keyword: search.keyword,
      },
    });
  };
  return (
    <SearchContainer onSubmit={handleSearchClick}>
      <SearchCategory
        value={search.type}
        onChange={(e) =>
          setSearch((prev) => {
            return { ...prev, type: e.target.value };
          })
        }
      >
        {searchOption.map((option) => {
          return (
            <SearchOption key={option.value} value={option.value}>
              {option.text}
            </SearchOption>
          );
        })}
      </SearchCategory>
      <SeacrhInputContainer>
        <SearchInput
          value={search.keyword}
          onChange={(e) =>
            setSearch((prev) => {
              return { ...prev, keyword: e.target.value };
            })
          }
        />
        <SearchSumbitButton type="submit">
          <SearchIcon>{getIcons("search", 20)}</SearchIcon>
        </SearchSumbitButton>
      </SeacrhInputContainer>
    </SearchContainer>
  );
};

const SearchContainer = tw.form`
  flex gap-2 h-8
`;

const SearchCategory = tw.select`
  w-20 h-full border rounded outline-none focus:(ring-2 ring-primary)
`;

const SearchOption = tw.option``;

const SeacrhInputContainer = tw.div`
  flex border rounded
`;

const SearchInput = tw.input`
  shrink h-full p-2 bg-transparent
`;

const SearchSumbitButton = tw.button`
  w-8 h-full text-white bg-secondary rounded-r
  hover:brightness-125
`;

const SearchIcon = tw.div`
  flex items-center justify-center
`;
