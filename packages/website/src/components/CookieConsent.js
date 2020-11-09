import React, { useContext } from "react";

import ReactCookieConsent from "react-cookie-consent";

import { ThemeContext } from "./Theme";
import { TranslationContext } from "./Translation";

import { ButtonDiv } from "./Style";

export const CookieConsent = () => {
  const { theme } = useContext(ThemeContext);
  const { tr } = useContext(TranslationContext);

  const acceptButtonText = tr("COOKIECONSENT.AcceptButton");
  const declineButtonText = tr("COOKIECONSENT.DeclineButton");
  const consentText = tr("COOKIECONSENT.Text");

  return (
    <ReactCookieConsent
      location="bottom"
      cookieName="gdpr-google-analytics"
      sameSite="strict"
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
  );
};

export default CookieConsent;
