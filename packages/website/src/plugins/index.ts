import { useFormScreenPlugin, withPlugins } from 'tinacms'
import { useJsonForm } from 'gatsby-tinacms-json'

import { useSiteQuery, SiteForm, CreatePostButton, CreatePageButton } from './Site'
import { useMenuQuery, MenuForm } from './Menu'
import { useFooterQuery, FooterForm } from './Footer'
import { useThemeQuery, ThemeForm } from './Theme'
import { useCookieConsentQuery, CookieConsentForm } from './CookieConsent'

export const registerFormPlugins = () => {
    const useGlobalForm = (data: any, formDef: any) => {
        const [, form] = useJsonForm(data, formDef)
        if (form) useFormScreenPlugin(form)
    }

    const siteData = useSiteQuery()
    useGlobalForm(siteData.site, SiteForm)

    const menuData = useMenuQuery()
    useGlobalForm(menuData.menu, MenuForm)

    const footerData = useFooterQuery()
    useGlobalForm(footerData.footer, FooterForm)

    const themeData = useThemeQuery()
    useGlobalForm(themeData.theme, ThemeForm)

    const cookieConsentData = useCookieConsentQuery()
    useGlobalForm(cookieConsentData.cookieconsent, CookieConsentForm)

    return { siteData, menuData, footerData, themeData, cookieConsentData }
}

export const withPlugin = (component: any) => {
    return withPlugins(component, [CreatePostButton, CreatePageButton])
}
