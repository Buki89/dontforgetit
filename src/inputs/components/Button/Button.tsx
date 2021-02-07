import React, { FC } from "react";
import styled from "styled-components";
import * as CSS from "csstype";
import { Theme } from "../../../theme/theme";

type Colors =
  | "red"
  | "blue"
  | "yellow"
  | "lighterBlue"
  | "sand"
  | "green"
  | undefined;

const getThemeColor = (color: Colors): string => {
  switch (color) {
    case "red":
      return Theme.colors.red;
    case "blue":
      return Theme.colors.blue;
    case "yellow":
      return Theme.colors.yellow;
    case "lighterBlue":
      return Theme.colors.lighterBlue;
    case "sand":
      return Theme.colors.sand;
    case "green":
      return Theme.colors.green;
    default:
      return "#000";
  }
};

const ButtonBase = styled.button<
  Pick<ButtonProps, "alignSelf" | "color" | "margin">
>`
  cursor: pointer;
  padding: 5px 15px;
  border: 0;
  border-radius: 4px;
  background-color: ${({ color }) => getThemeColor(color)};
  color: ${({ theme }) => theme.colors.white};
  outline: none;
  align-self: ${({ alignSelf }) => alignSelf};
  font-size: 1rem;
  font-weight: 700;
  font-family: system-ui;
  min-width: 5rem;
  margin: ${({ margin }) => margin};
`;
type ButtonProps = {
  type: "submit" | "reset" | "button";
  onClick?: () => void;
  alignSelf?: CSS.Property.AlignSelf;
  className?: string;
  color?: Colors;
  margin?: CSS.Property.Margin;
};

const Button: FC<ButtonProps> = ({
  children,
  type,
  onClick,
  alignSelf,
  className,
  color,
  margin,
}) => {
  return (
    <ButtonBase
      alignSelf={alignSelf}
      type={type}
      onClick={onClick}
      className={className}
      color={color}
      margin={margin}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;
