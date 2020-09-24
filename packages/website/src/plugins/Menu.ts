import { useStaticQuery, graphql } from 'gatsby'

// ****************************************************************************
// * Gatsby - GraphQL (Fragment / Static Query)
// ****************************************************************************

export const MenuFragment = graphql`
    fragment Menu on SettingsJson {
        menuItems {
            label
            title
            link
            language
        }
    }
`

export const useMenuQuery = (): MenuQueryData => {
    return useStaticQuery(graphql`
        query menuQuery {
            menu: settingsJson(fileRelativePath: { eq: "/content/settings/menu.json" }) {
                ...Menu

                rawJson
                fileRelativePath
            }
        }
    `)
}

// ****************************************************************************
// * Types
// ****************************************************************************

export type MenuItem = {
    label: string
    title: string
    link: string
    language: string
}

export type MenuSettings = {
    id: string
    rawJson: string
    fileRelativePath: string
    menuItems: MenuItem[]
}

export type MenuQueryData = {
    menu: MenuSettings
}

// ****************************************************************************
// * Tina CMS - Form Definition
// ****************************************************************************

export const MenuForm = {
    label: 'Menu',
    fields: [
        {
            label: 'Main Menu',
            name: 'rawJson.menuItems',
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
