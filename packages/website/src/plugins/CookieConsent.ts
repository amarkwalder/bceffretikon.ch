import { useStaticQuery, graphql } from 'gatsby'

// ****************************************************************************
// * Gatsby - GraphQL (Fragment / Static Query)
// ****************************************************************************

export const CookieConsentFragment = graphql`
    fragment CookieConsent on SettingsJson {
        acceptButton {
            label
            title
            language
        }
        declineButton {
            label
            title
            language
        }
        consentText {
            label
            title
            language
        }
    }
`

export const useCookieConsentQuery = (): CookieConsentQueryData => {
    return useStaticQuery(graphql`
        query cookieConsentQuery {
            cookieconsent: settingsJson(fileRelativePath: { eq: "/content/settings/cookieconsent.json" }) {
                ...CookieConsent

                rawJson
                fileRelativePath
            }
        }
    `)
}

// ****************************************************************************
// * Types
// ****************************************************************************

export type TranslatedText = {
    label: string
    title: string
    language: string
}

export type CookieConsentSettings = {
    id: string
    rawJson: string
    fileRelativePath: string

    acceptButton: TranslatedText[]
    declineButton: TranslatedText[]
    consentText: TranslatedText[]
}

export type CookieConsentQueryData = {
    cookieconsent: CookieConsentSettings
}

// ****************************************************************************
// * Tina CMS - Form Definition
// ****************************************************************************

const TranslatedText = (label: string, name: string) => ({
    label: label,
    name: name,
    component: 'group-list',
    itemProps: (item: { label: string }): { label: string } => ({
        label: item.label,
    }),
    fields: [
        {
            label: 'Label',
            name: 'label',
            component: 'text',
            parse(value: string): string {
                return value || ''
            },
        },
        {
            label: 'Title',
            name: 'title',
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
})

export const CookieConsentForm = {
    label: 'Cookie Consent',
    fields: [
        TranslatedText('Accept Button', 'rawJson.acceptButton'),
        TranslatedText('Decline Button', 'rawJson.declineButton'),
        TranslatedText('Consent Text', 'rawJson.consentText'),
    ],
}
