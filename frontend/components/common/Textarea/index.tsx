import { RefObject, ChangeEvent, KeyboardEvent } from "react";
import tw from "twin.macro";

interface TextareaProps {
  placeholder: string;
  textareaRef: RefObject<HTMLTextAreaElement>;
  buttonRef: RefObject<HTMLButtonElement>;
}

export const Textarea = ({
  placeholder,
  textareaRef,
  buttonRef,
}: TextareaProps) => {
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    const scrollHeight = e.target.scrollHeight;
    e.target.style.height = scrollHeight + "px";
  };

  const handleTextAreaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      buttonRef.current?.click();
    }
    return;
  };

  return (
    <StyledTextarea
      placeholder={placeholder}
      rows={1}
      ref={textareaRef}
      onChange={handleTextAreaChange}
      onKeyDown={handleTextAreaKeyDown}
    ></StyledTextarea>
  );
};

const StyledTextarea = tw.textarea`
  shrink grow px-4 py-2 w-full max-h-96 border resize-none rounded-bl
  focus:(outline-none placeholder-transparent)
`;
