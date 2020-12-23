import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";

const AppRouter: FC = () => (
  <Router>
    <Switch>
      <Route exact component={LoginPage} path="/" />
      <PrivateRoute component={DashboardPage} path="/dashboard" />
    </Switch>
  </Router>
);

export default AppRouter;
