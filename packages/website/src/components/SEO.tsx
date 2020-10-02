import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { TranslationContext } from './Translation'

type MetaItemWithName = {
    name: string
    content: string
}

type MetaItemWithProperty = {
    property: string
    content: string
}

type SEOProps = {
    description?: string
    lang?: string
    meta?: (MetaItemWithName | MetaItemWithProperty)[]
    title: string
}

export const SEO: React.FC<SEOProps> = ({ description, lang, meta, title }) => {
    const data = useStaticQuery(graphql`
        query SeoQuery {
            site: settingsJson(fileRelativePath: { eq: "/content/settings/site.json" }) {
                title
                description
            }
        }
    `)

    const { tr } = useContext(TranslationContext)

    const site = data.site
    const metaDescription = description || tr('SITE.Description') || site.description

    if (!meta) meta = []

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
    )
}
