import React, { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 4rem;
  min-width: 35vw;
  min-height: 90vh;
  position: relative;
  box-shadow: 3px 5px 5px darkslategrey;
`;

const Content: FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Content;
