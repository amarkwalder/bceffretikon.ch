import React, { useContext } from "react";
import { Link } from "./Router";

import styled, { css } from "styled-components";
import { transparentize } from "polished";

import { Wrapper, Image } from "./Style";
import { Navbar } from "./Navbar";
import { ThemeContext } from "./Theme";

//import { EditToggle } from "./EditToggle";

export const Header = styled(
  ({
    availableLanguages,
    currentLanguage,
    defaultLanguage,
    location,
    menuItems,
    logo,
    ...styleProps
  }) => {
    const { toggleDarkMode, isDarkMode } = useContext(ThemeContext);

    return (
      <header {...styleProps}>
        <HeaderWrapper>
          <SiteTitle>
            <SiteLink to={"/" + currentLanguage}>
              {/* <Image src={logo} /> */}
              Logo
            </SiteLink>
          </SiteTitle>
          <Navbar
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
            availableLanguages={availableLanguages}
            currentLanguage={currentLanguage}
            location={location}
            menuItems={menuItems}
          />
        </HeaderWrapper>
        {/* {process.env.NODE_ENV !== "production" && <EditToggle />} */}
      </header>
    );
  }
)`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: ${(props) => props.theme.header.height};
  top: 0;
  background-color: ${(props) => props.theme.color.background};
  color: ${(props) => props.theme.color.foreground};

  ${(props) =>
    props.theme.header.overline &&
    css`
      border-top: 6px solid ${(props) => props.theme.color.primary};
    `};

  ${(props) =>
    props.theme.header.underline &&
    css`
      box-shadow: inset 0 -1px 0 ${(props) => transparentize(0.9, props.theme.color.white)},
        0 1px 0 ${(props) => transparentize(0.9, props.theme.color.black)};
    `};

  ${(props) =>
    props.theme.header.transparent &&
    css`
      background-color: ${(props) =>
        transparentize(0.9, props.theme.color.black)};
      color: ${(props) => props.theme.color.white};
    `};
`;

const SiteLink = styled(Link)`
  position: relative;
  line-height: 3rem;
  display: flex;
  align-items: center;
  align-self: stretch;
  color: inherit !important;
  text-decoration: none;
  margin: 0;
  transition: all 150ms ${(p) => p.theme.easing};
  z-index: 1;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
    fill: currentColor;
  }
  &:after {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    left: -1rem;
    width: calc(100% + 2rem);
    height: 100%;
    background-color: ${(props) => props.theme.color.primary};
    opacity: 0;
    transition: all 150ms ${(p) => p.theme.easing};
    z-index: -1;
  }

  &:focus-visible {
    &:after {
      opacity: 0.5;
    }
  }
`;

const SiteTitle = styled.h1`
  margin: 0;
  flex: 0 0 auto;
  font-size: 1rem;
  align-self: stretch;
  display: flex;
`;

const HeaderWrapper = styled(Wrapper)`
  display: flex;
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;
