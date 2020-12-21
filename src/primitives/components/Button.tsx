import React, { FC } from "react";
import styled from "styled-components";
import * as CSS from "csstype";

const ButtonBase = styled.button<Pick<ButtonProps, "alignSelf">>`
  cursor: pointer;
  padding: 5px 15px;
  border: 0;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.sand};
  color: ${({ theme }) => theme.colors.white};
  outline: none;
  align-self: ${({ alignSelf }) => alignSelf};
`;
type ButtonProps = {
  type: "submit" | "reset" | "button";
  onClick?: () => void;
  alignSelf?: CSS.Property.AlignSelf;
  className?: string;
};

const Button: FC<ButtonProps> = ({
  children,
  type,
  onClick,
  alignSelf,
  className,
}) => {
  return (
    <ButtonBase
      alignSelf={alignSelf}
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;
