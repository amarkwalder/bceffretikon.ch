import React from 'react'

import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

type MetaItem1 = {
    name: string
    content: any
    property?: undefined
}

type MetaItem2 = {
    property: string
    content: any
    name?: undefined
}

type MetaItem = MetaItem1 | MetaItem2

interface SEOProps {
    title: string
    description?: string
    lang?: string
    meta?: MetaItem[]
}

export const SEO: React.FC<SEOProps> = ({ description, lang, meta, title }) => {
    const { site } = useStaticQuery(graphql`
        query SEOQuery {
            site: settingsJson(fileRelativePath: { eq: "/content/settings/site.json" }) {
                title
                description
            }
        }
    `)

    const metaDescription = description || site.description

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s | ${site.title}`}
            meta={[
                {
                    name: 'description',
                    content: metaDescription,
                },
                {
                    property: 'og:title',
                    content: title,
                },
                {
                    property: 'og:description',
                    content: metaDescription,
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
            ].concat(meta || [])}
        />
    )
}

SEO.defaultProps = {
    description: '',
    lang: 'de',
    meta: [],
}

export default SEO
