import { useStaticQuery, graphql } from 'gatsby'

interface Author {
    id: string
    name: string
    email: string
    link: string
}

export const useAuthors = (): Author[] => {
    const { settingsJson } = useStaticQuery(
        graphql`
            query authorsQuery {
                settingsJson(fileRelativePath: { eq: "/content/settings/authors.json" }) {
                    ...authors
                }
            }
        `,
    )

    return settingsJson.authors
}

export const authorsFragment = graphql`
    fragment authors on SettingsJson {
        authors {
            email
            name
            id
            link
        }
    }
`
