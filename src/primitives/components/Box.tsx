import React, { FC } from "react";
import styled from "styled-components";

type BoxProps = {
  direction?: "row" | "column";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "initial"
    | "inherit";
  alignItems?:
    | "center"
    | "start"
    | "end"
    | "self-start"
    | "self-end"
    | "flex-start"
    | "flex-end";
};

const Container = styled.div<BoxProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
`;

const Box: FC<BoxProps> = ({
  direction = "row",
  alignItems = "flex-start",
  justifyContent = "flex-start",
  children,
}) => {
  return (
    <Container
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      {children}
    </Container>
  );
};

export default Box;
