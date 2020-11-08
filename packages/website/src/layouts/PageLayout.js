import React, { useContext } from "react";

import { Wrapper, Main } from "../components/Style";

import { SEO } from "../components/SEO";
import { Hero } from "../components/Hero";
import { ThemeContext } from "../components/Theme";

import merge from "lodash.merge";

const removeNull = (obj) =>
  Object.keys(obj)
    .filter((k) => obj[k] != null) // Remove undef. and null.
    .reduce(
      (newObj, k) =>
        typeof obj[k] === "object"
          ? { ...newObj, [k]: removeNull(obj[k]) } // Recurse.
          : { ...newObj, [k]: obj[k] }, // Copy value.
      {}
    );

export const PageLayout = ({ site, page, post, children }) => {
  // TODO get default language from translation context
  const language = page?.language || "de";

  const { theme } = useContext(ThemeContext);

  const pageTitle = page?.title || post?.frontmatter?.title;

  const pageHero = page?.hero || post?.frontmatter?.hero;
  const hero =
    pageHero && theme
      ? merge({}, theme.hero, removeNull(pageHero))
      : theme?.hero;

  return (
    <>
      {pageTitle && <SEO site={site} language={language} title={pageTitle} />}
      <Main>
        <Hero data={hero} />
        <Wrapper>{children}</Wrapper>
      </Main>
    </>
  );
};

export default PageLayout;
