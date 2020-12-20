import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import firebase from "firebase";
import { config } from "./firebase/config";
import PrivateRoute from "./Router/PrivateRoute";

firebase.initializeApp(config);

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact component={LoginPage} path="/" />
      <PrivateRoute component={DashboardPage} path="/dashboard" />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
