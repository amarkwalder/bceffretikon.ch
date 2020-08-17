import React, { useEffect } from 'react'

import 'cookieconsent/build/cookieconsent.min.css'

declare global {
    interface Window {
        cookieconsent: any
    }
}

export const CookieConsent: React.FC = () => {
    if (typeof window !== 'undefined') {
        require('cookieconsent/build/cookieconsent.min.js')
    }
    useEffect(() => {
        window.cookieconsent.initialise({
            palette: {
                popup: {
                    background: '#383b75',
                },
                button: {
                    background: '#f1d600',
                },
            },
            position: 'bottom-right',
            content: {
                message: 'Diese Webseite nutzt Cookies, um bestmögliche Funktionalität bieten zu können.',
                dismiss: 'Akzeptieren',
                link: 'Mehr Infos',
                href: '/dataprotection/',
            },
        })
    }, [])
    return <></>
}

export default CookieConsent
