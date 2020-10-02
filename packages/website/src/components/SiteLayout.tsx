import React from 'react'

import styled, { css } from 'styled-components'

import { Helmet } from 'react-helmet'

import { CookieConsent } from './CookieConsent'

import { Header } from './Header'
import { Footer } from './Footer'
import { Theme } from './Theme'

import { registerFormPlugins, withPlugin } from '../plugins'
import { Translation } from './Translation'

type SiteLayoutProps = {
    children: React.ReactNode
    location: Location
    pageContext: {
        lang: string
    }
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children, location, pageContext }) => {
    const { siteData, menuData, footerData, themeData, translationData: translationsData } = registerFormPlugins()

    const site = siteData.site
    const menu = menuData.menu
    const footer = footerData.footer
    const theme = themeData.theme
    const { defaultLanguage, availableLanguages, translations } = translationsData.translations

    const currentLanguage = pageContext.lang || defaultLanguage

    return (
        <Translation
            translations={translations}
            currentLanguage={currentLanguage}
            defaultLanguage={defaultLanguage}
            availableLanguages={availableLanguages}
        >
            <Helmet>
                <script src="https://cdn.jsdelivr.net/npm/focus-visible@5.1.0/dist/focus-visible.min.js"></script>
            </Helmet>

            <Theme theme={theme}>
                <CookieConsent />
                <Site>
                    <Header
                        currentLanguage={currentLanguage}
                        location={location}
                        menuItems={menu.menuItems}
                        logo={site.logo}
                    />
                    {children}
                    <Footer title={footer.title} links={footer.links} currentLanguage={currentLanguage} />
                </Site>
            </Theme>
        </Translation>
    )
}

export default withPlugin(SiteLayout)

const Site = styled.div`
    position: relative;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: space-between;

    > ${Header} {
        flex: 0 0 auto;
    }

    > ${Footer} {
        flex: 0 0 auto;
    }

    > * {
        flex: 1 0 auto;
    }

    ${props =>
        props.theme.hero.parallax &&
        css`
            height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
            perspective: 1px;
            perspective-origin: top;
            scrollbar-width: none;
            -ms-overflow-style: none;

            ::-webkit-scrollbar {
                display: none;
            }
        `}
`
