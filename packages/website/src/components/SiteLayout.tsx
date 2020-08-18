import React from 'react'

//import '../styles/global.scss'

import { CookieConsent } from './CookieConsent'
import { Materialize } from './Materialize'
import { Header } from './Header'
import { Footer } from './Footer'

import { withPlugin } from 'tinacms'

interface SiteLayoutProps {}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
    return (
        <>
            {/* <Materialize />
            <CookieConsent /> */}

            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
        </>
    )
}

export default withPlugin(SiteLayout, [])
