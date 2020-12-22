import { DefaultTheme } from "styled-components";

type Colors = {
  green: string;
  white: string;
  black: string;
  sand: string;
  eclipse: string;
};

declare module "styled-components" {
  export interface DefaultTheme {
    colors: Colors;
  }
}

export const Theme: DefaultTheme = {
  colors: {
    green: "#028d09",
    white: "#fff",
    black: "#000",
    sand: "#d69c2f",
    eclipse: "#343148",
  },
};
