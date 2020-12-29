import { DefaultTheme } from "styled-components";

type Colors = {
  green: string;
  white: string;
  black: string;
  sand: string;
  eclipse: string;
  red: string;
  blue: string;
  lighterBlue: string;
  yellow: string;
  kaktus: string;
  ligthGrey: string;
  secondaryGreen: string;
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
    red: "#DD4132",
    blue: "#034F84",
    lighterBlue: "#216ba5",
    yellow: "#FAE03C",
    kaktus: "#79C753",
    ligthGrey: "#a9b7b9",
    secondaryGreen: "#28e08d",
  },
};
