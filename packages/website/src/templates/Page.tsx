import React from 'react'
import { graphql } from 'gatsby'
import { Paper } from '../components/Style'
import { PageLayout } from '../components/PageLayout'

//import { Form, FormBlock } from '../blocks/form'
import { Title, TitleBlock } from '../blocks/Title'
import { Image, ImageBlock } from '../blocks/Image'
import { Content, ContentBlock } from '../blocks/Content'

import { usePlugin } from 'tinacms'
import { useJsonForm } from 'gatsby-tinacms-json'
import { GatsbyImageFluidProps } from 'gatsby-image'

//import { InlineForm } from 'react-tinacms-inline'

// ****************************************************************************
// * Gatsby - GraphQL (Fragment / Page Query)
// ****************************************************************************

export const PageFragment = graphql`
    fragment Page on PagesJson {
        path
        lang
        title
        displayTitle
        listType
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
    }
`

export const PageQuery = graphql`
    query($path: String!) {
        page: pagesJson(resolvedPath: { eq: $path }) {
            ...Page

            rawJson
            fileRelativePath
        }
    }
`

// ****************************************************************************
// * Types
// ****************************************************************************

export type Ctas = {
    label?: string
    link?: string
    primary?: boolean
    arrow?: boolean
}

export type Hero = {
    headline?: string
    textline?: string
    large?: boolean
    overlay?: boolean
    image?: { childImageSharp: GatsbyImageFluidProps }
    ctas?: Ctas[]
}

export type Field = {
    label?: string
    inputType?: string
    autocomplete?: string
}

export type Block = {
    _template?: string
    content?: string
    name?: string
    title?: string
    underline?: boolean
    center?: boolean
    recipient?: string
    fields?: Field[]
    image?: { childImageSharp: GatsbyImageFluidProps }
}

export type ChildMarkdownRemark = {
    html: string
}

export type ChildrenPagesJsonBlockMarkdown = {
    childMarkdownRemark: ChildMarkdownRemark
}

export type PageSettings = {
    id: string
    rawJson: string
    fileRelativePath: string

    path: string
    lang: string
    title: string
    displayTitle: string
    hero: Hero
    blocks: Block[]
    childrenPagesJsonBlockMarkdown: ChildrenPagesJsonBlockMarkdown[]
}

export type PageProps = {
    data: {
        page: PageSettings
    }
}

// ****************************************************************************
// * Tina CMS - Form Definition
// ****************************************************************************

const PageFormGeneralFields = [
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
                parse: (filename: string): string => `../images/${filename}`,
                uploadDir: (): string => `/content/images/`,
                previewSrc: (formValues: {
                    jsonNode: { hero: { image: { childImageSharp: { fluid: { src: string } } } } }
                }): string => {
                    if (!formValues.jsonNode.hero || !formValues.jsonNode.hero.image) return ''
                    return formValues.jsonNode.hero.image.childImageSharp.fluid.src
                },
            },
            {
                label: 'Actions',
                name: 'ctas',
                component: 'group-list',
                itemProps: (item: { link: string; label: string }): { key: string; label: string } => ({
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
]

const PageFormSections = [
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
]

export const PageForm = {
    label: 'Page',
    fields: PageFormGeneralFields.concat(PageFormSections),
}

export const PageFormWithoutSections = {
    label: 'Page',
    fields: PageFormGeneralFields,
}

// ****************************************************************************
// * React Component
// ****************************************************************************
interface JsonNode {
    id: string
    rawJson: string
    fileRelativePath: string
    [key: string]: string
}
export const Page: React.FC<PageProps> = ({ data }) => {
    const { page } = data

    const [, form] = useJsonForm(page as never, PageForm)
    if (form) usePlugin(form)
    const blocks: Block[] = page?.blocks ? page.blocks : []

    return (
        // <InlineForm form={form}>
        <PageLayout page={page}>
            <Paper>
                {blocks.map((block, i) => {
                    switch (block._template) {
                        case 'TitleBlock':
                            return <Title key={'block-' + i} page={page} block={block} />
                        case 'ImageBlock':
                            return <Image key={'block-' + i} block={block} />
                        // case 'FormBlock':
                        //     return <Form form={data} />
                        case 'ContentBlock':
                            if (block.content && page.childrenPagesJsonBlockMarkdown[i])
                                return (
                                    <Content
                                        key={'block-' + i}
                                        block={block}
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
