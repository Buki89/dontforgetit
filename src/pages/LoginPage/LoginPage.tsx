import React, { FC, useCallback } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import Button from "../../primitives/components/Button";

const LoginPage: FC = () => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(() => {
        history.push("/dashboard");
      });
  }, [history]);

  return (
    <Button onClick={handleClick} type="button">
      Sign with Google
    </Button>
  );
};

export default LoginPage;
