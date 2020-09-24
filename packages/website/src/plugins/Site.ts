import { useStaticQuery, graphql } from 'gatsby'
import { createRemarkButton } from 'gatsby-tinacms-remark'
import { JsonCreatorPlugin } from 'gatsby-tinacms-json'
import slugify from 'react-slugify'

// ****************************************************************************
// * Gatsby - GraphQL (Fragment / Static Query)
// ****************************************************************************

export const SiteFragment = graphql`
    fragment Site on SettingsJson {
        title
        logo {
            childImageSharp {
                fixed(height: 30) {
                    ...GatsbyImageSharpFixed_withWebp_noBase64
                }
            }
        }
        languages {
            defaultLanguage
            availableLanguages
        }
        description
        author
    }
`

export const useSiteQuery = (): SiteQueryData => {
    return useStaticQuery(graphql`
        query SiteLayoutQuery {
            site: settingsJson(fileRelativePath: { eq: "/content/settings/site.json" }) {
                ...Site

                rawJson
                fileRelativePath
            }
        }
    `)
}

// ****************************************************************************
// * Types
// ****************************************************************************

export type SiteSettings = {
    title: string
    logo: any
    languages: {
        defaultLanguage: string
        availableLanguages: string[]
    }
    description: string
    author: string

    rawJson: string
    fileRelativePath: string
}

export type SiteQueryData = {
    site: SiteSettings
}

// ****************************************************************************
// * Tina CMS - Form / Button Definition
// ****************************************************************************

export const CreatePostButton = createRemarkButton({
    label: 'New Post',
    filename(form) {
        const slug = slugify(form.title.toLowerCase())
        return `content/posts/${slug}.md`
    },
    frontmatter(form) {
        const slug = slugify(form.title.toLowerCase())
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    title: form.title,
                    date: new Date(),
                    type: 'post',
                    path: `/blog/${slug}`,
                    draft: true,
                })
            }, 1000)
        })
    },
    body({ title }) {
        return `## ${title}`
    },
    fields: [{ name: 'title', label: 'Title', component: 'text', required: true }],
})

export const CreatePageButton = new JsonCreatorPlugin({
    label: 'New Page',
    filename(form) {
        const slug = slugify(form.title.toLowerCase())
        return `content/pages/${slug}.json`
    },
    fields: [
        { name: 'title', label: 'Title', component: 'text' },
        { name: 'path', label: 'Path', component: 'text' },
    ],
    data(form) {
        return {
            title: form.title,
            path: form.path,
        }
    },
})

export const SiteForm = {
    label: 'Site',
    fields: [
        {
            label: 'Image',
            name: 'rawJson.logo',
            component: 'image',
            parse: (filename: string) => `../images/${filename}`,
            uploadDir: () => `/content/images/`,
            previewSrc: (formValues: any, input: any) => {
                if (!formValues.jsonNode.logo) return ''
                return formValues.jsonNode.logo.childImageSharp.fixed.src
            },
        },
        {
            label: 'Title',
            name: 'rawJson.title',
            component: 'text',
            parse(value: string): string {
                return value || ''
            },
        },
        {
            label: 'Description',
            name: 'rawJson.description',
            component: 'text',
            parse(value: string): string {
                return value || ''
            },
        },
        {
            label: 'Author',
            name: 'rawJson.author',
            component: 'text',
            parse(value: string): string {
                return value || ''
            },
        },
        {
            label: 'Default Language',
            name: 'rawJson.languages.defaultLanguage',
            component: 'text',
            parse(value: string): string {
                return value || ''
            },
        },
        {
            label: 'Available Languages',
            name: 'rawJson.languages.availableLanguages',
            component: 'list',
            field: {
                component: 'text',
            },
            itemProps: (item: string) => ({
                key: item,
            }),
        },
    ],
}
