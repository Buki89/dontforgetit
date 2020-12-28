import firebase from "firebase";
import React, { FC, useCallback } from "react";
import { Button as ButtonBase } from "../../primitives";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { FaTasks } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";

const Wrapper = styled.div`
  border-radius: 0.5rem 0.5rem 0 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.eclipse};
  display: flex;
  color: ${({ theme }) => theme.colors.white};
  flex-direction: column;
  position: relative;
`;
const Button = styled(ButtonBase)`
  border-radius: 0.25rem 0 0 0;
`;

const Title = styled.p`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin: 1.875rem 0 0 0;
  user-select: none;
`;

const Menu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  margin: 0.5rem;
  min-width: 2.5rem;
`;

const Header: FC = () => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    firebase.app().auth().signOut();
    history.push("/");
  }, [history]);

  return (
    <Wrapper>
      <Menu>
        <Link to="/dashboard">
          <FaTasks height="20px" color="#fff" />
        </Link>
        <Link to="/shopping-list-dashboard">
          <TiShoppingCart height="20px" color="fff" />
        </Link>
      </Menu>
      <Title>Don't forget IT!</Title>
      <Button
        alignSelf="flex-end"
        color="sand"
        onClick={handleClick}
        type="button"
      >
        Logout
      </Button>
    </Wrapper>
  );
};

export default Header;
