import React, { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: fixed;
  left: 0;
  top: 174px;
  height: 67vh;
  overflow: auto;
`;

const Content: FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Content;
