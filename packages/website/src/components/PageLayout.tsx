import React, { useContext } from 'react'

import { removeNull } from '../utils/helpers'

import { SEO } from './SEO'
import { Hero } from './Hero'
import { Wrapper, Main } from './Style'
import { ThemeContext } from './Theme'

import merge from 'lodash.merge'
import { PageSettings } from '../templates/Page'
import { PostSettings } from '../templates/Post'

type PageLayoutProps = {
    page?: PageSettings
    post?: PostSettings
}

export const PageLayout: React.FC<PageLayoutProps> = ({ page, post, children }) => {
    const { theme } = useContext(ThemeContext)

    const pageTitle = page?.title || post?.frontmatter?.title

    const pageHero = page?.hero || post?.frontmatter?.hero
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
