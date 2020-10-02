import { useFormScreenPlugin, withPlugins } from 'tinacms'
import { useJsonForm } from 'gatsby-tinacms-json'

import { useSiteQuery, SiteForm, CreatePostButton, CreatePageButton, SiteQueryData } from './Site'
import { useMenuQuery, MenuForm, MenuQueryData } from './Menu'
import { useFooterQuery, FooterForm, FooterQueryData } from './Footer'
import { useThemeQuery, ThemeForm, ThemeQueryData } from './Theme'
import { useAuthorsQuery, AuthorsForm, AuthorsQueryData } from './Authors'
import { useTranslationQuery, TranslationForm, TranslationQueryData } from './Translation'

type RegisterFormPluginsResponse = {
    siteData: SiteQueryData
    menuData: MenuQueryData
    footerData: FooterQueryData
    themeData: ThemeQueryData
    authorsData: AuthorsQueryData
    translationData: TranslationQueryData
}

export const registerFormPlugins = (): RegisterFormPluginsResponse => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    const authorsData = useAuthorsQuery()
    useGlobalForm(authorsData.authors, AuthorsForm)

    const translationData = useTranslationQuery()
    useGlobalForm(translationData.translations, TranslationForm)

    return { siteData, menuData, footerData, themeData, authorsData, translationData: translationData }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withPlugin = (component: unknown) => {
    return withPlugins(component, [CreatePostButton, CreatePageButton])
}
