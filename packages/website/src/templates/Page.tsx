import React from 'react'
import { graphql } from 'gatsby'
import { Paper } from '../components/Style'
import { PageLayout } from '../components/PageLayout'

//import { Form, FormBlock } from '../blocks/form'
import { Title, TitleBlock } from '../blocks/Title'
import { Image, ImageBlock } from '../blocks/Image'
import { Content, ContentBlock } from '../blocks/Content'

import { useLocalJsonForm } from 'gatsby-tinacms-json'
import { InlineForm } from 'react-tinacms-inline'
import { Form } from 'tinacms'

interface PageProps {
    data: any
}

interface Block {
    _template: string
    content: string
}

export const Page: React.FC<PageProps> = ({ data }) => {
    const [page, form] = useLocalJsonForm(data.page, PageForm) as [any, Form]
    const blocks: Block[] = page?.blocks ? page.blocks : []

    return (
        // <InlineForm form={form}>
        <PageLayout page={page}>
            <Paper>
                {blocks.map(({ _template, ...data }, i: number) => {
                    switch (_template) {
                        case 'TitleBlock':
                            return <Title key={'block-' + i} page={page} data={data} />
                        case 'ImageBlock':
                            return <Image key={'block-' + i} data={data} />
                        // case 'FormBlock':
                        //     return <Form form={data} />
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
            </Paper>
        </PageLayout>
        // </InlineForm>
    )
}

export default Page

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
                    uploadDir: () => `/content/images/`,
                    previewSrc: (formValues: any, input: any) => {
                        if (!formValues.jsonNode.hero || !formValues.jsonNode.hero.image) return ''
                        return formValues.jsonNode.hero.image.childImageSharp.fluid.src
                    },
                },
                {
                    label: 'Actions',
                    name: 'ctas',
                    component: 'group-list',
                    itemProps: (item: any) => ({
                        key: item.link,
                        label: item.label,
                    }),
                    fields: [
                        {
                            label: 'Label',
                            name: 'label',
                            component: 'text',
                        },
                        {
                            label: 'Link',
                            name: 'link',
                            component: 'text',
                        },
                        {
                            label: 'Primary',
                            name: 'primary',
                            component: 'toggle',
                        },
                        {
                            label: 'Arrow',
                            name: 'arrow',
                            component: 'toggle',
                        },
                    ],
                },
                {
                    label: 'Large',
                    name: 'large',
                    component: 'toggle',
                },
            ],
        },
        {
            label: 'Page Sections',
            name: 'rawJson.blocks',
            component: 'blocks',
            templates: {
                TitleBlock,
                ImageBlock,
                // FormBlock,
                ContentBlock,
            },
        },
    ],
}

export const pageQuery = graphql`
    query($path: String!) {
        page: pagesJson(path: { eq: $path }) {
            title
            displayTitle
            hero {
                headline
                textline
                large
                overlay
                image {
                    childImageSharp {
                        fluid(quality: 70, maxWidth: 1920) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
                ctas {
                    label
                    link
                    primary
                    arrow
                }
            }
            blocks {
                _template
                content
                name
                title
                underline
                center
                recipient
                fields {
                    label
                    inputType
                    autocomplete
                }
                image {
                    childImageSharp {
                        fluid(quality: 70, maxWidth: 1920) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
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
