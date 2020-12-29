import React, { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 2rem;
`;

const Content: FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Content;
