import React from "react";
import { Helmet } from "react-helmet-async";

export const PageLayout = ({ data, children }) => {
  const pageTitle = data?.title;

  // TODO -> Load Site from JSON
  const site = { title: "Badminton Club Effretikon" };

  const { language } = data;

  return (
    <>
      {pageTitle && <SEO site={site} language={language} title={pageTitle} />}
      <Main>
        <Wrapper>{children}</Wrapper>
      </Main>
    </>
  );
};

export default PageLayout;

const SEO = ({ site, description, language, meta, title }) => {
  // TODO -> Translation Context
  //const { tr } = useContext(TranslationContext);
  const tr = (code) => code;

  const metaDescription =
    description || tr("SITE.Description") || site?.description;

  if (!meta) meta = [];

  return (
    <Helmet
      htmlAttributes={{
        lang: language,
      }}
      title={title}
      titleTemplate={`%s | ${site.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
};

const Main = ({ children }) => {
  // TODO -> styled component
  return <>{children}</>;
};

const Wrapper = ({ children }) => {
  // TODO -> styled component
  return <>{children}</>;
};
