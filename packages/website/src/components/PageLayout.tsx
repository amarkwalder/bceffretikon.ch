import React, { useContext } from 'react'

import { removeNull } from '../utils/helpers'

import { SEO } from './SEO'
import { Hero } from './Hero'
import { Wrapper, Main } from './Style'
import { ThemeContext } from './Theme'

import merge from 'lodash.merge'

type PageLayoutProps = {
    page: {
        title?: string
        hero?: unknown
        frontmatter?: {
            title?: string
            hero?: unknown
        }
    }
}

export const PageLayout: React.FC<PageLayoutProps> = ({ page, children }) => {
    const { theme } = useContext(ThemeContext)

    const pageTitle = page?.title || page?.frontmatter?.title

    const pageHero = page?.frontmatter?.hero || page?.hero
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
