import React, { FC, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppStore } from "../store/store";

type PrivateRouteProps = {
  component: React.ElementType;
  path: string;
};

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { state } = useContext(AppStore);
  const authed = state.uid.length > 0;
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
