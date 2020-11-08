import React from "react";
import { useSiteData } from "react-static";
import styled, { css } from "styled-components";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Loading } from "../components/Loading";

import { useSiteFormScreenPlugin } from "../plugins/SiteFormScreenPlugin";
import { useFooterFormScreenPlugin } from "../plugins/FooterFormScreenPlugin";
import { useMenuFormScreenPlugin } from "../plugins/MenuFormScreenPlugin";
import { useThemeFormScreenPlugin } from "../plugins/ThemeFormScreenPlugin";
import { useTranslationsFormScreenPlugin } from "../plugins/TranslationsFormScreenPlugin";

export const SiteLayout = ({ children }) => {
  const siteData = useSiteData();

  const [site] = useSiteFormScreenPlugin(siteData.site);
  const [footer] = useFooterFormScreenPlugin(siteData.footer);
  const [menu] = useMenuFormScreenPlugin(siteData.menu);
  const [theme] = useThemeFormScreenPlugin(siteData.theme);
  const [translations] = useTranslationsFormScreenPlugin(siteData.translations);

  if (!site || !footer || !menu || !theme || !translations) {
    return <Loading message="Form Screen Plugin Data" />;
  }

  return (
    <SiteWrapper>
      <Header menuItems={menu.menuItems} logo={site.logo} />
      {children}
      <Footer title={footer.title} links={footer.links} />
    </SiteWrapper>
  );
};

export default SiteLayout;

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
