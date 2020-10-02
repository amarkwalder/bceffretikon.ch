import { useStaticQuery, graphql } from 'gatsby'

// ****************************************************************************
// * Gatsby - GraphQL (Fragment / Static Query)
// ****************************************************************************

export const AuthorsFragment = graphql`
    fragment Authors on SettingsJson {
        authors {
            email
            name
            id
            link
        }
    }
`

export const useAuthorsQuery = (): AuthorsQueryData => {
    return useStaticQuery(
        graphql`
            query authorsQuery {
                authors: settingsJson(fileRelativePath: { eq: "/content/settings/authors.json" }) {
                    ...Authors

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

export type Author = {
    id: string
    name: string
    email: string
    link: string
}

export type AuthorSettings = {
    id: string
    rawJson: string
    fileRelativePath: string
    authors: Author[]
}

export type AuthorsQueryData = {
    authors: AuthorSettings
}

// ****************************************************************************
// * Tina CMS - Form Definition
// ****************************************************************************

export const AuthorsForm = {
    label: 'Authors',
    fields: [
        {
            label: 'Authors',
            name: 'rawJson.authors',
            component: 'group-list',
            itemProps: (item: { id: string; name: string }): { key: string; label: string } => ({
                key: item.id,
                label: item.name,
            }),
            defaultItem: (): { name: string; id: string; email: string; link: string } => ({
                name: 'New Author',
                id: Math.random().toString(36).substr(2, 9),
                email: '',
                link: '',
            }),
            fields: [
                {
                    label: 'Name',
                    name: 'name',
                    component: 'text',
                    parse(value: string): string {
                        return value || ''
                    },
                },
                {
                    label: 'Email',
                    name: 'email',
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
