import React, { useContext } from "react";
import styled from "styled-components";
import { transparentize } from "polished";

import { Wrapper } from "./Style";
import { Link } from "./Router";

import { removeTrailingSlash, removeSuffixSlash } from "../utils/helpers";
import { TranslationContext } from "./Translation";

export const Footer = styled(({ title, links, ...styleProps }) => {
  const { tr } = useContext(TranslationContext);
  const { currentLanguage } = useContext(TranslationContext);

  return (
    <footer {...styleProps}>
      <Wrapper>
        {title}
        {links.map((footerLink, index) => (
          <span key={"footer-" + index}>
            {" - "}
            <Link
              to={removeTrailingSlash(
                "/" + currentLanguage + "/" + removeSuffixSlash(footerLink.link)
              )}
            >
              {tr("FOOTER." + footerLink.title) || "!!" + footerLink.title}
            </Link>
          </span>
        ))}
      </Wrapper>
    </footer>
  );
})`
  font-size: 0.8rem;
  line-height: 3rem;
  text-align: center;
  height: 3rem;
  background-color: ${(props) =>
    transparentize(0.97, props.theme.color.foreground)};
  box-shadow: inset 0 1px 0
    ${(props) => transparentize(0.95, props.theme.color.foreground)};
`;
