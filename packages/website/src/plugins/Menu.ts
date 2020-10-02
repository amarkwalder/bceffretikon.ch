import { useStaticQuery, graphql } from 'gatsby'

// ****************************************************************************
// * Gatsby - GraphQL (Fragment / Static Query)
// ****************************************************************************

export const MenuFragment = graphql`
    fragment Menu on SettingsJson {
        menuItems {
            title
            link
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
    title: string
    link: string
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
            itemProps: (item: { title: string }): { label: string } => ({
                label: item.title,
            }),
            defaultItem: {
                title: 'Menu Item',
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
