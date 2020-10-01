import { useStaticQuery, graphql } from 'gatsby'

// ****************************************************************************
// * Gatsby - GraphQL (Fragment / Static Query)
// ****************************************************************************

export const TranslationsFragment = graphql`
    fragment Translations on SettingsJson {
        translations {
            code
            language
            text
        }
    }
`

export const useTranslationsQuery = (): TranslationsQueryData => {
    return useStaticQuery(
        graphql`
            query translationsQuery {
                translations: settingsJson(fileRelativePath: { eq: "/content/settings/translations.json" }) {
                    ...Translations

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
    code: string
    language: string
    text: string
}

export type TranslationsSettings = {
    id: string
    rawJson: string
    fileRelativePath: string
    translations: Translation[]
}

export type TranslationsQueryData = {
    translations: TranslationsSettings
}

// ****************************************************************************
// * Tina CMS - Form Definition
// ****************************************************************************

export const TranslationsForm = {
    label: 'Translations',
    fields: [
        {
            label: 'Translations',
            name: 'rawJson.translations',
            component: 'group-list',
            itemProps: (item: { code: string; language: string }): { label: string } => ({
                label: (item.code || 'n/a') + ' (' + (item.language || 'n/a').toUpperCase() + ')',
            }),
            fields: [
                {
                    label: 'Code',
                    name: 'code',
                    component: 'text',
                    parse(value: string): string {
                        return value || ''
                    },
                },
                {
                    label: 'Text',
                    name: 'text',
                    component: 'text',
                    parse(value: string): string {
                        return value || ''
                    },
                },
                {
                    label: 'Language',
                    name: 'language',
                    component: 'text',
                    parse(value: string): string {
                        return value || ''
                    },
                },
            ],
        },
    ],
}
