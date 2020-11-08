import React, { useContext, useState } from "react";

import { Moon, Sun } from "styled-icons/boxicons-regular";
import { Menu, MenuOpen } from "styled-icons/material-outlined";

import styled, { css } from "styled-components";
import { mix, transparentize } from "polished";

import { navigate } from "./Router";
import { Link } from "@reach/router";

import { TranslationContext } from "./Translation";
import { ThemeContext } from "./Theme";

import { removeTrailingSlash, removeSuffixSlash } from "../utils/helpers";
import { NavSelect } from "./NavSelect";

export const Navbar = ({ menuItems }) => {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNavOpen = () => {
    setNavOpen(!navOpen);
  };

  const onLanguageChange = (language) => {
    setNavOpen(false);
    navigate("/" + language.toLowerCase());
  };

  const { toggleDarkMode, isDarkMode } = useContext(ThemeContext);
  const { currentLanguage, tr, availableLanguages } = useContext(
    TranslationContext
  );

  return (
    <>
      <StyledNavbar navOpen={navOpen} isDarkMode={isDarkMode}>
        {menuItems.map((menuItem) => (
          <NavItem key={menuItem.title}>
            <StyledNavLink
              onClick={toggleNavOpen}
              to={removeTrailingSlash(
                "/" + currentLanguage + "/" + removeSuffixSlash(menuItem.link)
              )}
            >
              {tr("MENU." + menuItem.title) || "!!" + menuItem.title}
            </StyledNavLink>
          </NavItem>
        ))}
        <NavItem>
          <DarkModeToggle
            aria-label="Toggle Dark Theme"
            onClick={toggleDarkMode}
            isDarkMode={isDarkMode}
          />
        </NavItem>
        <NavItem>
          <StyledNavSelect
            items={availableLanguages.map((item) => item.toUpperCase())}
            selected={currentLanguage.toUpperCase()}
            isDarkMode={isDarkMode}
            onClick={onLanguageChange}
          />
        </NavItem>
      </StyledNavbar>
      <NavToggle
        aria-label="Toggle Nav"
        onClick={toggleNavOpen}
        navOpen={navOpen}
      ></NavToggle>
    </>
  );
};

export const StyledNavbar = styled.ul`
  color: inherit;
  @media (max-width: ${(props) => props.theme.breakpoints.small}) {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate3d(0, 100%, 0);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    opacity: 0;
    z-index: 1000;
    background-color: ${(props) =>
      props.isDarkMode || props.theme.header.transparent
        ? mix(0.95, props.theme.color.black, props.theme.color.white)
        : mix(0.95, props.theme.color.white, props.theme.color.black)};
    box-shadow: 0 1rem 2rem -0.5rem ${(props) => transparentize(0.5, props.theme.color.black)};
    transition: all 150ms ${(p) => p.theme.easing};
    pointer-events: none;
    ${(props) =>
      props.navOpen &&
      css`
        opacity: 1;
        pointer-events: all;
      `};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.small}) {
    display: flex;
    flex-direction: row;
    align-self: stretch;
    align-items: stretch;
    justify-content: flex-end;
    flex: 1 0 auto;
    margin: 0;
    opacity: 1;
    pointer-events: all;
  }
`;

export const NavItem = styled.li`
  flex: 0 0 auto;
  display: flex;
  align-items: stretch;
  color: inherit;
  @media (max-width: ${(props) => props.theme.breakpoints.small}) {
    &:not(:last-child) {
      border-bottom: 1px solid
        ${(props) => transparentize(0.85, props.theme.color.white)};
    }
  }
`;

export const StyledNavItemMixin = css`
  flex: 1 0 auto;
  line-height: ${(props) => props.theme.header.height};
  padding: 0 0.75rem;
  display: flex;
  align-items: center;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  text-decoration: none;
  color: inherit !important;
  opacity: 0.5;
  overflow: visible;
  transition: all 150ms ${(p) => p.theme.easing};
  z-index: 1;

  &:focus-visible {
    opacity: 1;
  }

  &:hover:not(.active) {
  }

  &:hover,
  &:active,
  &.active {
    opacity: 1;
  }

  &.active {
  }

  span,
  div {
    display: block;
    width: 100%;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.small}) {
    line-height: 1;
  }

  ${(props) =>
    props.theme.menu.style === "pill" &&
    css`
      padding: 0 1rem;

      &:before {
        content: "";
        position: absolute;
        display: block;
        top: 0rem;
        left: 0rem;
        right: 0rem;
        bottom: 0rem;
        opacity: 0;
        z-index: -1;
        background-color: ${(props) =>
          props.theme.header.transparent
            ? props.theme.color.background
            : transparentize(0.95, props.theme.color.foreground)};
        border: 1px solid
          ${(props) => transparentize(0.95, props.theme.color.foreground)};
        transition: all 150ms ${(props) => props.theme.easing};
      }

      &:focus-visible {
        opacity: 1;
        &:before {
          opacity: 0.15;
        }
      }

      &:hover:not(.active) {
        &:before {
          opacity: 0.15;
        }
      }

      &:hover,
      &:active,
      &.active {
        opacity: 1;

        &:before {
          opacity: 1;
        }
      }

      &.active {
        color: ${(props) =>
          props.theme.isDarkMode
            ? props.theme.color.foreground
            : props.theme.color.primary} !important;
        &:before {
          opacity: 1;
        }
      }

      @media (min-width: ${(props) => props.theme.breakpoints.small}) {
        &:before {
          top: 0.625rem;
          left: 0.25rem;
          right: 0.25rem;
          bottom: 0.625rem;
          border-radius: 3rem;
        }
      }
    `}

  ${(props) =>
    props.theme.menu.style === "glow" &&
    css`
      &:after {
        content: "";
        display: none;
        position: absolute;
        top: -6px;
        left: 0;
        width: 100%;
        height: 6px;
        background-color: ${(props) =>
          transparentize(0.85, props.theme.color.white)};
        transform: translate3d(0, -100%, 0);
        transition: all 150ms ${(props) => props.theme.easing};
      }

      &:before {
        content: "";
        position: absolute;
        display: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          ${(props) =>
            transparentize(
              0.75,
              mix(0.25, props.theme.color.white, props.theme.color.black)
            )},
          transparent 1.5rem
        );
        opacity: 0;
        z-index: -1;
        transform: translate3d(0, -100%, 0);
        transition: all 150ms ${(props) => props.theme.easing};
      }

      &:focus-visible {
        opacity: 1;
        &:before {
          transform: translate3d(0, 0, 0);
          opacity: 0.5;
        }
      }

      &:hover:not(.active) {
        &:before {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
        &:after {
          background-color: ${(props) =>
            transparentize(0.8, props.theme.color.black)};
        }
      }

      &:hover,
      &:active,
      &.active {
        opacity: 1;

        &:before {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
        &:after {
          transform: translate3d(0, 0, 0);
        }
      }

      &.active {
        &:before {
          background: linear-gradient(
            to bottom,
            ${(props) =>
              transparentize(
                0.75,
                mix(0.5, props.theme.color.white, props.theme.color.black)
              )},
            transparent 1.5rem
          );
        }
      }

      @media (min-width: ${(props) => props.theme.breakpoints.small}) {
        &:after,
        &:before {
          display: block;
        }
      }
    `}
`;

const StyledNavLink = styled(({ children, ...styleProps }) => (
  <Link {...styleProps}>
    <span>{children}</span>
  </Link>
))`
  ${StyledNavItemMixin};
`;

const StyledNavSelect = styled(
  ({ items, selected, isDarkMode, ...styleProps }) => (
    <NavSelect
      items={items}
      selected={selected}
      isDarkMode={isDarkMode}
      {...styleProps}
    />
  )
)`
  ${StyledNavItemMixin};
`;

const NavToggle = styled(({ navOpen, ...styleProps }) => {
  return (
    <button {...styleProps}>
      {navOpen && <MenuOpen />}
      {!navOpen && <Menu />}
    </button>
  );
})`
  position: relative;
  padding: 0 10px;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  margin-left: 1rem;
  font-size: 0.8rem;
  line-height: 1;
  align-self: stretch;
  text-transform: uppercase;
  color: inherit;
  opacity: 0.5;
  overflow: visible;
  transition: all 150ms ${(props) => props.theme.easing};

  @media (min-width: ${(props) => props.theme.breakpoints.small}) {
    display: none;
  }

  svg {
    position: absolute;
    top: calc(50% - 0.75rem);
    left: calc(50% - 0.75rem);
    width: 1.5rem;
    height: auto;
    fill: currentColor;
    &:first-child {
      opacity: 0;
    }
    &:last-child {
      opacity: 1;
    }
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    opacity: 1;
  }

  &:hover {
    opacity: 1;
  }
`;

const DarkModeToggle = styled(({ isDarkMode, ...styleProps }) => {
  return (
    <button {...styleProps}>
      {isDarkMode && <Sun />}
      {!isDarkMode && <Moon />}
    </button>
  );
})`
  position: relative;
  flex: 0 0 auto;
  width: 100%;
  height: 2.75rem;
  align-self: stretch;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  opacity: 0.5;
  overflow: hidden;
  transition: all 300ms ${(props) => props.theme.easing};
  transform-origin: 50% 50%;

  @media (min-width: ${(props) => props.theme.breakpoints.small}) {
    width: 1.5rem;
    height: 100%;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  svg {
    position: absolute;
    top: calc(50% - 0.75rem);
    left: calc(50% - 0.75rem);
    width: 1.5rem;
    height: auto;
    fill: currentColor;
    transition: all 150ms ${(props) => props.theme.easing};
    transform-origin: 50% 50%;
    &:first-child {
      opacity: 0;
      transform: rotate(-90deg);
    }
    &:last-child {
      opacity: 1;
      transform: rotate(0deg);
    }
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    transform: rotate(360deg);
    opacity: 1;
  }

  &:hover {
    opacity: 1;
  }
`;
