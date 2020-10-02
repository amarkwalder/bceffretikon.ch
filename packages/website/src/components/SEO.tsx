import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { TranslationContext } from './Translation'

interface SEOProps {
    description?: string
    lang?: string
    meta?: any
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

SEO.defaultProps = {
    lang: `de`,
    meta: [],
    description: ``,
}

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
}
