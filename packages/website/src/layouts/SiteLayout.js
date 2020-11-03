import React from "react";
import { useSiteData } from "react-static";
import styled, { css } from "styled-components";

import { Helmet } from "react-helmet-async";

import { Translation } from "../components/Translation";
import { Theme } from "../components/Theme";
import { Header } from "../components/Header";

import { useSiteFormScreenPlugin } from "../plugins/SiteFormScreenPlugin";
import { useFooterFormScreenPlugin } from "../plugins/FooterFormScreenPlugin";
import { useMenuFormScreenPlugin } from "../plugins/MenuFormScreenPlugin";
import { useThemeFormScreenPlugin } from "../plugins/ThemeFormScreenPlugin";
import { useTranslationsFormScreenPlugin } from "../plugins/TranslationsFormScreenPlugin";
import Loading from "../components/Loading";

const preview = process.env.RUNTIME_ENV === "preview";

export const SiteLayout = (props) => {
  return preview ? (
    <PreviewSiteLayout {...props} />
  ) : (
    <StaticSiteLayout {...props} />
  );
};

export default SiteLayout;

const StaticSiteLayout = ({ currentLanguage, children }) => {
  const siteData = useSiteData();

  const site = siteData.site.data;
  const footer = siteData.footer.data;
  const menu = siteData.menu.data;
  const theme = siteData.theme.data;
  const translations = siteData.translations.data;

  if (!site) {
    return <Loading />;
  }

  return (
    <Translation currentLanguage={currentLanguage}>
      <Helmet>
        <script src="https://cdn.jsdelivr.net/npm/focus-visible@5.1.0/dist/focus-visible.min.js"></script>
      </Helmet>
      <Theme theme={theme}>
        <CookieConsent />
        <SiteWrapper>
          <Header
            currentLanguage={currentLanguage}
            menuItems={menu.menuItems}
            logo={site.logo}
          />
          {children}
          <Footer title={footer.title} links={footer.links} />
        </SiteWrapper>
      </Theme>
    </Translation>
  );
};

const PreviewSiteLayout = ({ currentLanguage, children }) => {
  const siteData = useSiteData();

  const { site } = useSiteFormScreenPlugin(siteData.site);
  const { footer } = useFooterFormScreenPlugin(siteData.footer);
  const { menu } = useMenuFormScreenPlugin(siteData.menu);
  const { theme } = useThemeFormScreenPlugin(siteData.theme);
  const { translations } = useTranslationsFormScreenPlugin(
    siteData.translations
  );

  if (!site || !footer || !menu || !theme || !translations) {
    return <Loading />;
  }

  return (
    <Translation
      translations={translations}
      defaultLanguage={translations.defaultLanguage}
      availableLanguages={translations.availableLanguages}
      currentLanguage={currentLanguage}
    >
      <Helmet>
        <script src="https://cdn.jsdelivr.net/npm/focus-visible@5.1.0/dist/focus-visible.min.js"></script>
      </Helmet>
      <Theme theme={theme}>
        <CookieConsent />
        <SiteWrapper>
          <Header
            currentLanguage={currentLanguage}
            defaultLanguage={translations.defaultLanguage}
            availableLanguages={translations.availableLanguages}
            menuItems={menu.menuItems}
            logo={site.logo}
          />
          {children}
          <Footer title={footer.title} links={footer.links}>
            FOOTER
          </Footer>
        </SiteWrapper>
      </Theme>
    </Translation>
  );
};

const CookieConsent = () => {
  // TODO -> react component
  return <></>;
};

const Footer = styled.h2``;

const SiteWrapper = styled.div`
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

  ${(props) =>
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
`;
