import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#0d253f",
    secondary: '#01b4e4',
    tertiary: '#90cea1',
    white: '#fff',
    black: '#000',
    red: '#FF0000',
    pink: '#FF30A5',
    grey: "#345358"
  },
  fontSizes: {
    small: "1rem",
    medium: "1.5rem",
    large: "2rem",
    superLarge: "4rem"
  }
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;