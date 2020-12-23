import React, { FC, useContext } from "react";
import styled from "styled-components";
import { AppStore } from "../../../store/store";

const Wrapper = styled.div`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.sand};
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 0.125rem 0;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
`;
const Text = styled.p`
  font-size: 1rem;
  line-height: 1.2;
  margin: 0;
  padding: 0;
  font-weight: bold;
`;

type OverViewProps = {
  completed: number;
  incompleted: number;
  overall: number;
};

const Overview: FC<OverViewProps> = ({ completed, overall, incompleted }) => {
  const { state } = useContext(AppStore);

  console.log(state);
  return (
    <Wrapper>
      <Container>
        <Text>Overall: </Text>
        <Text>Completed: </Text>
        <Text>Incompleted: </Text>
      </Container>
      <Container>
        <Text>{overall}</Text>
        <Text>{completed}</Text>
        <Text>{incompleted}</Text>
      </Container>
    </Wrapper>
  );
};

export default Overview;
