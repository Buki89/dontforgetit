import React, { FC } from "react";
import styled from "styled-components";
import * as CSS from "csstype";

type BoxProps = {
  direction?: "row" | "column";
  justifyContent?: CSS.Property.JustifyContent;
  alignItems?: CSS.Property.AlignItems;
  margin?: CSS.Property.Margin;
  padding?: CSS.Property.Padding;
};

const Container = styled.div<BoxProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};

  width: 100%;
`;

const Box: FC<BoxProps> = ({
  direction = "row",
  alignItems = "flex-start",
  justifyContent = "flex-start",
  margin,
  padding,
  children,
}) => {
  return (
    <Container
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      margin={margin}
      padding={padding}
    >
      {children}
    </Container>
  );
};

export default Box;
