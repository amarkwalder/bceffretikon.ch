import React, { useState } from "react";
import { mix } from "polished";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { GlobalStyles, bestContrast } from "./Style";
import { createGlobalStyle } from "styled-components";

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children, theme }) => {
  const isBrowser = typeof window !== "undefined";
  const userPrefDark = isBrowser ? localStorage.getItem("isDarkMode") : false;
  const initialDarkMode = userPrefDark === "true" ? true : false;

  const [darkMode, setDarkMode] = useState(initialDarkMode);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("isDarkMode", "" + newMode);
    }
  };

  const adaptedTheme = {
    isDarkMode: darkMode,
    color: {
      black: darkMode ? theme.color.black : theme.color.black,
      white: darkMode ? theme.color.white : theme.color.white,
      primary: theme.color.primary || "#007043",
      primaryContrast: bestContrast(
        theme.color.primary,
        theme.color.white,
        theme.color.black
      ),
      secondary: theme.color.secondary,
      secondaryContrast: bestContrast(
        theme.color.secondary,
        theme.color.white,
        theme.color.black
      ),
      foreground: darkMode
        ? mix(0.8, theme.color.white, theme.color.black)
        : theme.color.black,
      background: darkMode ? theme.color.black : theme.color.white,
      link: bestContrast(
        darkMode ? theme.color.black : theme.color.white,
        theme.color.primary,
        theme.color.secondary
      ),
    },
    easing: theme.easing,
    breakpoints: theme.breakpoints,
    radius: theme.radius,
    header: theme.header,
    menu: theme.menu,
    hero: theme.hero,
    typography: theme.typography,
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: adaptedTheme,
        toggleDarkMode: toggleDarkMode,
        isDarkMode: darkMode,
      }}
    >
      <ThemeContext.Consumer>
        {({ theme }) => (
          <StyledThemeProvider theme={theme}>
            <TinaOverrideGlobalStyle primary={theme.color.primary} />
            <GlobalStyles />
            {children}
          </StyledThemeProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

const TinaOverrideGlobalStyle = createGlobalStyle`
    :root {
        --tina-color-primary-light: ${(props) => props.primary};
        --tina-color-primary: ${(props) => props.primary};
        --tina-color-primary-dark: ${(props) => props.primary};
    }
`;
