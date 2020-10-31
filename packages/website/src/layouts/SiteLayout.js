import React from "react";
import { useSiteData } from "react-static";
import styled, { css } from "styled-components";

import { Helmet } from "react-helmet-async";
import { Link, navigate, useLocation } from "../components/Router";

import { useCurrentLanguage } from "../utils/language";

import { Theme } from "../components/Theme";
import { Header } from "../components/Header";

import { useSiteFormScreenPlugin } from "../plugins/SiteFormScreenPlugin";
import { useFooterFormScreenPlugin } from "../plugins/FooterFormScreenPlugin";
import { useMenuFormScreenPlugin } from "../plugins/MenuFormScreenPlugin";
import { useThemeFormScreenPlugin } from "../plugins/ThemeFormScreenPlugin";
import { useTranslationsFormScreenPlugin } from "../plugins/TranslationsFormScreenPlugin";

const preview = process.env.RUNTIME_ENV === "preview";

export const SiteLayout = ({ children }) => {
  return preview ? (
    <PreviewSiteLayout>{children}</PreviewSiteLayout>
  ) : (
    <StaticSiteLayout>{children}</StaticSiteLayout>
  );
};

export default SiteLayout;

const StaticSiteLayout = ({ children }) => {
  const siteData = useSiteData();

  const site = siteData.site.data;
  const footer = siteData.footer.data;
  const menu = siteData.menu.data;
  const theme = siteData.theme.data;
  const translations = siteData.translations.data;

  const currentLanguage = useCurrentLanguage();

  return (
    <>
      {site && (
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
            <Site>
              <Header
                currentLanguage={currentLanguage}
                defaultLanguage={translations.defaultLanguage}
                availableLanguages={translations.availableLanguages}
                menuItems={menu.menuItems}
                logo={site.logo}
              />
              {children}
              <Footer title={footer.title} links={footer.links} />
            </Site>
          </Theme>
        </Translation>
      )}
    </>
  );
};

const PreviewSiteLayout = ({ children }) => {
  const siteData = useSiteData();

  const { site } = useSiteFormScreenPlugin(siteData.site);
  const { footer } = useFooterFormScreenPlugin(siteData.footer);
  const { menu } = useMenuFormScreenPlugin(siteData.menu);
  const { theme } = useThemeFormScreenPlugin(siteData.theme);
  const { translations } = useTranslationsFormScreenPlugin(
    siteData.translations
  );

  const currentLanguage = useCurrentLanguage();

  return (
    <>
      {site && footer && menu && theme && translations && (
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
            <Site>
              <Header
                currentLanguage={currentLanguage}
                defaultLanguage={translations.defaultLanguage}
                availableLanguages={translations.availableLanguages}
                menuItems={menu.menuItems}
                logo={site.logo}
              />
              {children}
              <Footer title={footer.title} links={footer.links} />
            </Site>
          </Theme>
        </Translation>
      )}
    </>
  );
};

const Translation = ({ children }) => {
  // TODO -> react context
  return <>{children}</>;
};

const CookieConsent = () => {
  // TODO -> react component
  return <></>;
};

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

const Header2 = ({
  currentLanguage,
  availableLanguages,
  defaultLanguage,
  menuItems,
  logo,
}) => {
  // TODO -> react component
  //  const match = useMatch("/en/:url");
  const location = useLocation();

  const switchLanguage = (event, language) => {
    var pathname = location.pathname;
    pathname = pathname.endsWith("/") ? pathname : pathname + "/";

    const result = availableLanguages.find((lang) =>
      pathname.startsWith("/" + lang + "/")
    );
    if (!result) {
      navigate("/" + defaultLanguage);
    }

    var suffix = pathname.substring(4, pathname.length - 1);
    suffix = suffix === "/" ? "" : suffix;

    var to = "/" + language + "/" + suffix;
    to = to.endsWith("/") ? to.substring(0, to.length - 1) : to;

    navigate(to);
  };
  return (
    <>
      <h2>Header</h2>
      <button onClick={(e) => switchLanguage(e, "de")}>DE</button>
      <button onClick={(e) => switchLanguage(e, "en")}>EN</button>
      <div>
        {menuItems &&
          menuItems.map((menuItem, index) => {
            return (
              <Link
                key={"link-" + currentLanguage + "-" + index}
                to={"/" + currentLanguage + menuItem.link}
              >
                {menuItem.title}
              </Link>
            );
          })}
      </div>
    </>
  );
};

const Footer = () => {
  // TODO -> react component
  return <h2>Footer</h2>;
};
