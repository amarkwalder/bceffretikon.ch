import { useStaticQuery, graphql } from 'gatsby'

// ****************************************************************************
// * Gatsby - GraphQL (Fragment / Static Query)
// ****************************************************************************

export const FooterFragment = graphql`
    fragment Footer on SettingsJson {
        title
        links {
            title
            link
        }
    }
`

export const useFooterQuery = (): FooterQueryData => {
    return useStaticQuery(graphql`
        query footerQuery {
            footer: settingsJson(fileRelativePath: { eq: "/content/settings/footer.json" }) {
                ...Footer

                rawJson
                fileRelativePath
            }
        }
    `)
}

// ****************************************************************************
// * Types
// ****************************************************************************

export type FooterLink = {
    title: string
    link: string
}

export type FooterSettings = {
    id: string
    rawJson: string
    fileRelativePath: string
    title: string
    links: FooterLink[]
}

export type FooterQueryData = {
    footer: FooterSettings
}

// ****************************************************************************
// * Tina CMS - Form Definition
// ****************************************************************************

export const FooterForm = {
    label: 'Footer',
    fields: [
        {
            label: 'Title',
            name: 'rawJson.title',
            component: 'text',
            parse(value: string): string {
                return value || ''
            },
        },
        {
            label: 'Links',
            name: 'rawJson.links',
            component: 'group-list',
            itemProps: (item: { title: string }): { label: string } => ({
                label: item.title,
            }),
            defaultItem: {
                title: 'Title',
                link: '/path',
            },
            fields: [
                {
                    label: 'Title',
                    name: 'title',
                    component: 'text',
                    parse(value: string): string {
                        return value || ''
                    },
                },
                {
                    label: 'Link',
                    name: 'link',
                    component: 'text',
                    parse(value: string): string {
                        return value || ''
                    },
                },
            ],
        },
    ],
}
