import React from 'react'

import { SEO } from './SEO'
import { Hero } from './Hero'

interface PageLayoutProps {
    page: any
}

export const PageLayout: React.FC<PageLayoutProps> = ({ page, children }) => {
    console.log('page', page)

    const pageTitle = page && page.title ? page.title : ''

    return (
        <>
            {pageTitle && <SEO title={pageTitle} />}
            <Hero hero={page.hero} />
            <main>{children}</main>
        </>
    )
}

export default PageLayout
