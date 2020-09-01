import React from 'react'

import { useStaticQuery, graphql } from 'gatsby'
import { removeNull } from '../utils/helpers'

import { useGlobalJsonForm } from 'gatsby-tinacms-json'

import { SEO } from './SEO'
import { Hero } from './Hero'
import { Wrapper, Main } from './Style'
import { ThemeContext } from './Theme'
import { NavForm } from './Nav'
import { ThemeForm } from './Theme'

const merge = require('lodash.merge')

interface PageLayoutProps {
    page: any
}

export const PageLayout: React.FC<PageLayoutProps> = ({ page, children }) => {
    const data = useStaticQuery(graphql`
        query PageLayoutQuery {
            nav: settingsJson(fileRelativePath: { eq: "/content/settings/menu.json" }) {
                ...nav

                rawJson
                fileRelativePath
            }
            theme: settingsJson(fileRelativePath: { eq: "/content/settings/theme.json" }) {
                ...globalTheme

                rawJson
                fileRelativePath
            }
            site: settingsJson(fileRelativePath: { eq: "/content/settings/site.json" }) {
                logo
                title
                description
                author

                rawJson
                fileRelativePath
            }
        }
    `)

    useGlobalJsonForm(data.nav, NavForm)
    useGlobalJsonForm(data.theme, ThemeForm)
    useGlobalJsonForm(data.site, SiteForm)

    const themeContext = React.useContext(ThemeContext)
    const theme = themeContext.theme
    const pageTitle =
        page && page.title
            ? page.title
            : page && page.frontmatter && page.frontmatter.title
            ? page.frontmatter.title
            : ''
    const pageHero = page.frontmatter ? page.frontmatter.hero : page.hero
    const hero = pageHero && theme ? merge({}, theme.hero, removeNull(pageHero)) : theme?.hero

    return (
        <>
            {pageTitle && <SEO title={pageTitle} />}
            <Hero hero={hero} />
            <Main>
                <Wrapper>{children}</Wrapper>
            </Main>
        </>
    )
}

const SiteForm = {
    label: 'Site',
    fields: [
        {
            label: 'Logo',
            name: 'rawJson.logo',
            component: 'text',
            parse(value: string): string {
                return value || ''
            },
        },
        {
            label: 'Title',
            name: 'rawJson.title',
            component: 'text',
            parse(value: string): string {
                return value || ''
            },
        },
        {
            label: 'Description',
            name: 'rawJson.description',
            component: 'text',
            parse(value: string): string {
                return value || ''
            },
        },
        {
            label: 'Author',
            name: 'rawJson.author',
            component: 'text',
            parse(value: string): string {
                return value || ''
            },
        },
    ],
}
