import firebase from "firebase";
import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";

type PrivateRouteProps = {
  component: React.ElementType;
  path: string;
};

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const authed = firebase.auth().currentUser?.uid ? true : false;
  return (
    <Route
      {...rest}
      render={(props) =>
        authed ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
