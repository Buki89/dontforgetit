import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import AppRouter from "./router/AppRouter";
import { ThemeProvider } from "styled-components";
import { Theme } from "./theme/theme";
import GlobalStyle from "./theme/globalStyles";
import Store from "./store/store";

ReactDOM.render(
  <Store>
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <AppRouter />
    </ThemeProvider>
  </Store>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
