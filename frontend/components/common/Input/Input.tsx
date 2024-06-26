import { ChangeEventHandler } from "react";
import tw, { styled, css } from "twin.macro";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  register?: UseFormRegisterReturn<
    | "email"
    | "password"
    | "confirmPassword"
    | "nickname"
    | "gender"
    | "currentPassword"
    | "title"
    | "maximumMember"
    | "description"
  >;
  placeholder?: string;
  value?: string;
  width?: number;
  height?: number;
  bgColor?: "gray";
  type?: "default" | "password" | "radio" | "number";
  min?: number;
  max?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Input = ({
  register,
  placeholder,
  value,
  width,
  height,
  bgColor,
  min,
  max,
  type = "default",
  onChange,
}: InputProps) => {
  return (
    <>
      {onChange ? (
        <StyledInput
          placeholder={placeholder}
          value={value}
          width={width}
          height={height}
          bgColor={bgColor}
          type={type}
          min={min}
          max={max}
          onChange={onChange}
        />
      ) : (
        <StyledInput
          {...register}
          placeholder={placeholder}
          value={value}
          width={width}
          height={height}
          bgColor={bgColor}
          type={type}
          min={min}
          max={max}
        />
      )}
    </>
  );
};

const StyledInput = styled.input<{
  width?: number;
  height?: number;
  bgColor?: string;
}>(({ width, height, bgColor }) => [
  tw`px-2 w-full h-10 bg-white outline-0 border rounded
  placeholder:(text-stone-600)`,
  width &&
    css`
      width: ${width}rem;
    `,
  height &&
    css`
      height: ${height}rem;
    `,
  bgColor &&
    bgColor === "gray" &&
    tw`bg-stone-700 rounded hover:bg-stone-600 placeholder:text-stone-300`,
]);
