import firebase from "firebase";
import React, { FC, useCallback } from "react";
import Box from "../../primitives/components/Box";
import Button from "../../primitives/components/Button";
import { useHistory } from "react-router-dom";

//import styled from 'styled-components'

const Header: FC = () => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    firebase.app().auth().signOut();
    history.push("/");
  }, [history]);

  return (
    <Box>
      <div>Header</div>
      <Button onClick={handleClick} type="button">
        Logout
      </Button>
    </Box>
  );
};

export default Header;
