import React from 'react'
import { graphql } from 'gatsby'
import { Content, ContentBlock } from '../blocks/Content'
import { PageLayout } from '../components/PageLayout'

import { usePlugin } from 'tinacms'
import { useJsonForm } from 'gatsby-tinacms-json'

import path from 'path'

interface PageProps {
    data: any
}

export const Page: React.FC<PageProps> = ({ data }) => {
    const [, form] = useJsonForm(data.page, PageForm)
    const page = data.page
    const blocks = page.blocks ? (page.blocks as any[]) : []

    if (!form) return <p>Empty Form</p>
    if (!page) return <p>Empty Page</p>
    usePlugin(form)

    return (
        <PageLayout page={page}>
            {blocks &&
                blocks.map(({ _template, ...data }, i) => {
                    switch (_template) {
                        case 'ContentBlock':
                            if (data.content && page.childrenPagesJsonBlockMarkdown[i])
                                return (
                                    <Content
                                        key={'block-' + i}
                                        data={data}
                                        html={page.childrenPagesJsonBlockMarkdown[i].childMarkdownRemark.html}
                                    />
                                )
                            break
                        default:
                            return true
                    }
                })}
        </PageLayout>
    )
}

const PageForm = {
    label: 'Page',
    fields: [
        {
            label: 'Title',
            name: 'rawJson.title',
            component: 'text',
        },
        {
            label: 'Hero',
            name: 'rawJson.hero',
            component: 'group',
            fields: [
                {
                    label: 'Headline',
                    name: 'headline',
                    component: 'text',
                },
                {
                    label: 'Textline',
                    name: 'textline',
                    component: 'text',
                },
                {
                    label: 'Image',
                    name: 'image',
                    component: 'image',
                    parse: (filename: string) => `../images/${filename}`,
                    uploadDir: (p: any) => `/content/images`,
                    previewSrc: (formValues: any, input: any) => {
                        console.log('previewSrc', formValues, input)
                        if (!formValues?.jsonNode?.hero?.image?.childImageSharp?.fluid?.src) return ''
                        return formValues.jsonNode.hero.image.childImageSharp.fluid.src
                    },
                },
            ],
        },
        {
            label: 'Page Sections',
            name: 'rawJson.blocks',
            component: 'blocks',
            templates: {
                ContentBlock,
            },
        },
    ],
}

export const pageQuery = graphql`
    query($path: String!) {
        page: pagesJson(path: { eq: $path }) {
            title
            hero {
                headline
                textline
                image {
                    childImageSharp {
                        fluid(quality: 70, maxWidth: 1920) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
            blocks {
                _template
                content
            }
            childrenPagesJsonBlockMarkdown {
                childMarkdownRemark {
                    html
                }
            }

            rawJson
            fileRelativePath
        }
    }
`

export default Page
