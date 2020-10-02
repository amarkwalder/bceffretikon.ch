import { useStaticQuery, graphql } from 'gatsby'

// ****************************************************************************
// * Gatsby - GraphQL (Fragment / Static Query)
// ****************************************************************************

export const TranslationFragment = graphql`
    fragment Translation on SettingsJson {
        defaultLanguage
        availableLanguages
        translations {
            code
            translation {
                text
                language
            }
        }
    }
`

export const useTranslationQuery = (): TranslationQueryData => {
    return useStaticQuery(
        graphql`
            query translationQuery {
                translations: settingsJson(fileRelativePath: { eq: "/content/settings/translations.json" }) {
                    ...Translation

                    rawJson
                    fileRelativePath
                }
            }
        `,
    )
}

// ****************************************************************************
// * Types
// ****************************************************************************

export type Translation = {
    text: string
    language: string
}

export type TranslationCode = {
    code: string
    translation: Translation[]
}

export type TranslationSettings = {
    id: string
    rawJson: string
    fileRelativePath: string

    defaultLanguage: string
    availableLanguages: string[]
    translations: TranslationCode[]
}

export type TranslationQueryData = {
    translations: TranslationSettings
}

// ****************************************************************************
// * Tina CMS - Form Definition
// ****************************************************************************

export const TranslationForm = {
    label: 'Translations',
    fields: [
        {
            label: 'Default Language',
            name: 'rawJson.defaultLanguage',
            component: 'text',
        },
        {
            label: 'Available Languages',
            name: 'rawJson.availableLanguages',
            component: 'list',
            defaultItem: '',
            field: {
                component: 'text',
            },
        },
        {
            label: 'Translations',
            name: 'rawJson.translations',
            component: 'group-list',
            itemProps: (item: { code: string }): { label: string } => ({
                label: item.code,
            }),
            defaultItem: {
                code: 'CODE',
            },
            fields: [
                {
                    label: 'Code',
                    name: 'code',
                    component: 'text',
                },
                {
                    label: 'Translation',
                    name: 'translation',
                    component: 'group-list',
                    itemProps: (item: { text: string; language: string }): { label: string } => ({
                        label: item.text + ' (' + item.language + ')',
                    }),
                    defaultItem: {
                        text: 'Text to translate',
                        language: 'de',
                    },
                    fields: [
                        {
                            label: 'Text',
                            name: 'text',
                            component: 'text',
                        },
                        {
                            label: 'Language',
                            name: 'language',
                            component: 'select',
                            options: ['de', 'en', 'fr', 'it'],
                        },
                    ],
                },
            ],
        },
    ],
}

export const useTranslation = (): TranslationSettings => {
    return useTranslationQuery().translations
}

export const tr = (code: string, language: string, translations: TranslationCode[]): string | undefined => {
    const result = translations.find(value => value.code === code)
    if (!result || !result.translation) return undefined
    return result.translation.find(value => value.language === language)?.text
}
