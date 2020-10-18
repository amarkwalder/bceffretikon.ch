import React from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useSiteFormScreenPlugin } from "../plugins/SiteFormScreenPlugin";
import { useFooterFormScreenPlugin } from "../plugins/FooterFormScreenPlugin";
import { useMenuFormScreenPlugin } from "../plugins/MenuFormScreenPlugin";
import { useThemeFormScreenPlugin } from "../plugins/ThemeFormScreenPlugin";
import { useTranslationsFormScreenPlugin } from "../plugins/TranslationsFormScreenPlugin";

export const SiteLayout = ({ children }) => {
  const { site } = useSiteFormScreenPlugin();
  const { footer } = useFooterFormScreenPlugin();
  const { menu } = useMenuFormScreenPlugin();
  const { theme } = useThemeFormScreenPlugin();
  const { translations } = useTranslationsFormScreenPlugin();

  return (
    <>
      {site && (
        <Layout
          site={site}
          menu={menu}
          footer={footer}
          theme={theme}
          translations={translations}
        >
          {children}
        </Layout>
      )}
    </>
  );
};

const getCurrentLanguage = (pathname) => {
  pathname = pathname.endsWith("/") ? pathname : pathname + "/";
  if (pathname.startsWith("/de/")) {
    return "de";
  } else if (pathname.startsWith("/en/")) {
    return "en";
  } else {
    return "de";
  }
};

const Layout = ({ site, menu, footer, theme, translations, children }) => {
  const { pathname } = useLocation();
  const currentLanguage = getCurrentLanguage(pathname);
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
        <Site>
          <Header
            currentLanguage={currentLanguage}
            menuItems={menu.menuItems}
            logo={site.logo}
          />
          {children}
          <Footer title={footer.title} links={footer.links} />
        </Site>
      </Theme>
    </Translation>
  );
};

export default SiteLayout;

const Translation = ({ children }) => {
  // TODO -> react context
  return <>{children}</>;
};

const CookieConsent = () => {
  // TODO -> react component
  return <></>;
};

const Theme = ({ theme, children }) => {
  // TODO -> react component
  return <>{children}</>;
};

const Site = ({ theme, children }) => {
  // TODO -> styled component
  return <>{children}</>;
};

const Header = ({ currentLanguage, menuItems, logo }) => {
  // TODO -> react component
  return (
    <>
      <h2>Header - {currentLanguage.toUpperCase()}</h2>
      <LanguageSelector currentLanguage={currentLanguage} />
      {menuItems &&
        menuItems.map((menuItem, index) => {
          return (
            <p key={"nav-" + index}>
              <NavLink to={"/" + currentLanguage + menuItem.link}>
                {menuItem.title}
              </NavLink>
            </p>
          );
        })}
    </>
  );
};

const removeTrailingSlash = (path) =>
  path === `/` ? path : path.replace(/\/$/, ``);

const onLanguageChange = (language, location, history) => {
  const { pathname } = location;
  const pathSuffix = pathname.length > 3 ? pathname.substr(3) : "";
  history.push(removeTrailingSlash("/" + language.toLowerCase() + pathSuffix));
};

const LanguageSelector = ({ currentLanguage }) => {
  const location = useLocation();
  const history = useHistory();
  const onClickDE = () => onLanguageChange("de", location, history);
  const onClickEN = () => onLanguageChange("en", location, history);
  return (
    <>
      <button onClick={onClickDE}>DE</button>
      <button onClick={onClickEN}>EN</button>
    </>
  );
};

const Footer = () => {
  // TODO -> react component
  return <h2>Footer</h2>;
};
