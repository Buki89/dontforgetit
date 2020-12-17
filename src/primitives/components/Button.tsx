import React, { FC } from "react";
import styled from "styled-components";

const ButtonBase = styled.button`
  cursor: pointer;
  padding: 5px 15px;
  border: 0;
  border-radius: 4px;
  background-color: #d69c2f;
  font: inherit;
  color: #fff;
  outline: none;
`;
type ButtonProps = {
  type: "submit" | "reset" | "button";
  onClick?: () => void;
};

const Button: FC<ButtonProps> = ({ children, type, onClick }) => {
  return (
    <ButtonBase type={type} onClick={onClick}>
      {children}
    </ButtonBase>
  );
};

export default Button;
