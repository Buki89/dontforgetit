import firebase from "firebase";
import React, { FC, useCallback } from "react";
import Button from "../../primitives/components/Button";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  border-radius: 0.5rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.eclipse};
  display: flex;
  color: ${({ theme }) => theme.colors.white};
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin: 1.875rem 0 0 0;
`;

const Header: FC = () => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    firebase.app().auth().signOut();
    history.push("/");
  }, [history]);

  return (
    <Wrapper>
      <Title>Don't forget IT!</Title>
      <Button alignSelf="flex-end" onClick={handleClick} type="button">
        Logout
      </Button>
    </Wrapper>
  );
};

export default Header;
