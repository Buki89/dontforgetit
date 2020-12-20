import React, { FC } from "react";
import styled from "styled-components";
import * as CSS from "csstype";

const ButtonBase = styled.button<Pick<ButtonProps, "alignSelf">>`
  cursor: pointer;
  padding: 5px 15px;
  border: 0;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.sand};
  font: inherit;
  color: ${({ theme }) => theme.colors.white};
  outline: none;
  align-items: ${({ alignSelf }) => alignSelf};
`;
type ButtonProps = {
  type: "submit" | "reset" | "button";
  onClick?: () => void;
  alignSelf?: CSS.Property.AlignSelf;
};

const Button: FC<ButtonProps> = ({ children, type, onClick, alignSelf }) => {
  return (
    <ButtonBase alignSelf={alignSelf} type={type} onClick={onClick}>
      {children}
    </ButtonBase>
  );
};

export default Button;
