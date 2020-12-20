type Colors = {
  green: string;
  white: string;
  black: string;
  sand: string;
  eclipse: string;
};

const colors = {
  green: "#028d09",
  white: "#fff",
  black: "#000",
  sand: "#d69c2f",
  eclipse: "#343148",
};

export type Theme = {
  colors: Colors;
};

export const theme: Theme = {
  colors,
};
