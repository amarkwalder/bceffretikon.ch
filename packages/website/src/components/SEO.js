import React from "react";
import { Helmet } from "react-helmet-async";

import { TranslationContext } from "./Translation";

// TODO Translate Title
const tr = (code) => code;

export const SEO = ({ site, description, lang, meta, title }) => {
  //  const { tr } = useContext(TranslationContext);

  const metaDescription =
    description || tr("SITE.Description") || site.description;

  if (!meta) meta = [];

  return (
    <Helmet
      htmlAttributes={{
        lang,
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
