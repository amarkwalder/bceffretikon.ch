import React, { useContext } from 'react'

import { CookieConsentSettings } from '../plugins/CookieConsent'
import { ThemeContext } from './Theme'

import ReactCookieConsent from 'react-cookie-consent'
import { ButtonDiv } from './Style'

type CookieConsentProps = {
    currentLanguage: string
    settings: CookieConsentSettings
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ currentLanguage, settings }) => {
    const { theme } = useContext(ThemeContext)

    const acceptButtonText =
        settings.acceptButton.filter(item => item.language === currentLanguage)[0]?.title || 'Accept'
    const declineButtonText =
        settings.declineButton.filter(item => item.language === currentLanguage)[0]?.title || 'Decline'
    const consentText =
        settings.consentText.filter(item => item.language === currentLanguage)[0]?.title || 'This site uses cookies...'

    return (
        <ReactCookieConsent
            location="bottom"
            cookieName="gatsby-gdpr-google-analytics"
            style={{ backgroundColor: theme?.color.background }}
            enableDeclineButton={true}
            buttonText={<ButtonDiv primary="true">{acceptButtonText}</ButtonDiv>}
            buttonStyle={{ backgroundColor: theme?.color.background }}
            declineButtonText={<ButtonDiv>{declineButtonText}</ButtonDiv>}
            declineButtonStyle={{ backgroundColor: theme?.color.background }}
            contentStyle={{ color: theme?.color.foreground }}
            overlay={true}
        >
            {consentText}
        </ReactCookieConsent>
    )
}

export default CookieConsent
