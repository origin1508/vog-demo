import tw, { styled, css } from "twin.macro";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number;
  height?: number;
  margin?: number;
  bgColor: "primary" | "secondary" | "transparent" | "warning" | "caution";
  position?: {
    type: "relative" | "absolute";
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

export const Button = ({
  type = "button",
  width,
  height,
  margin,
  bgColor = "primary",
  position,
  disabled,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <>
      <StyledButton
        type={type}
        width={width}
        height={height}
        margin={margin}
        bgColor={bgColor}
        position={position}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </StyledButton>
    </>
  );
};

const StyledButton = styled.button<{
  width?: number;
  height?: number;
  margin?: number;
  bgColor: "primary" | "secondary" | "transparent" | "warning" | "caution";
  position?: {
    type: "relative" | "absolute";
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}>(({ width, height, margin, bgColor, position }) => [
  tw`h-10 w-full rounded text-white
    enabled:hover:brightness-110
    disabled:(bg-stone-500 text-stone-400)
  `,
  width &&
    css`
      width: ${width}rem;
    `,
  height &&
    css`
      height: ${height}rem;
    `,
  margin &&
    typeof margin === "number" &&
    css`
      margin-top: ${margin}rem;
      margin-bottom: ${margin}rem;
    `,
  bgColor &&
    (bgColor === "primary"
      ? tw`bg-primary `
      : bgColor === "secondary"
      ? tw`bg-secondary`
      : bgColor === "warning"
      ? tw`bg-warning`
      : bgColor === "caution"
      ? tw`bg-caution`
      : tw`bg-transparent text-black border enabled:hover:bg-primary/10`),
  position &&
    css`
      position: ${position.type};
      top: ${position.top};
      bottom: ${position.bottom};
      left: ${position.left};
      right: ${position.right};
    `,
]);
