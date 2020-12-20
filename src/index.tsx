import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase";
import { config } from "./firebase/config";
import AppRouter from "./Router/AppRouter";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";

firebase.initializeApp(config);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AppRouter />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
