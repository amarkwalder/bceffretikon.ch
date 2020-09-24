import React from 'react'

import styled, { css } from 'styled-components'

import Helmet from 'react-helmet'

import { CookieConsent } from './CookieConsent'

import { Header } from './Header'
import { Footer } from './Footer'
import { Theme, ThemeContext } from './Theme'

import { registerFormPlugins, withPlugin } from '../plugins'

type SiteLayoutProps = {
    children: React.ReactNode
    location: Location
    pageContext: {
        lang: string
    }
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children, location, pageContext }) => {
    const { siteData, menuData, footerData, themeData, cookieConsentData } = registerFormPlugins()

    const site = siteData.site
    const menu = menuData.menu
    const footer = footerData.footer
    const theme = themeData.theme
    const cookieConsent = cookieConsentData.cookieconsent

    const currentLanguage = pageContext.lang || site.languages.defaultLanguage

    return (
        <>
            <Helmet>
                <script src="https://cdn.jsdelivr.net/npm/focus-visible@5.1.0/dist/focus-visible.min.js"></script>
            </Helmet>

            <Theme theme={theme}>
                <ThemeContext.Consumer>
                    {({ theme }) => (
                        <>
                            <CookieConsent currentLanguage={currentLanguage} settings={cookieConsent} />
                            <Site>
                                <Header
                                    currentLanguage={currentLanguage}
                                    availableLanguages={site.languages.availableLanguages}
                                    location={location}
                                    menuItems={menu.menuItems}
                                    logo={site.logo}
                                />
                                {children}
                                <Footer title={footer.title} links={footer.links} currentLanguage={currentLanguage} />
                            </Site>
                        </>
                    )}
                </ThemeContext.Consumer>
            </Theme>
        </>
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
