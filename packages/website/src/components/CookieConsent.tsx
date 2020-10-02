import React, { useContext } from 'react'

import { ThemeContext } from './Theme'

import ReactCookieConsent from 'react-cookie-consent'
import { ButtonDiv } from './Style'
import { TranslationContext } from './Translation'

export const CookieConsent: React.FC = () => {
    const { theme } = useContext(ThemeContext)
    const { tr } = useContext(TranslationContext)

    const acceptButtonText = tr('COOKIECONSENT.AcceptButton') || '!!Accept'
    const declineButtonText = tr('COOKIECONSENT.DeclineButton') || '!!Decline'
    const consentText = tr('COOKIECONSENT.Text') || '!!This site uses cookies ...'

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
            overlay={false}
            acceptOnScroll={true}
        >
            {consentText}
        </ReactCookieConsent>
    )
}

export default CookieConsent
