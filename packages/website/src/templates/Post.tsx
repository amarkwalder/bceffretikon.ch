import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import { DeleteAction, useRemarkForm } from 'gatsby-tinacms-remark'
import { InlineForm, InlineTextField } from 'react-tinacms-inline'
import { InlineWysiwyg } from 'react-tinacms-editor'
import ReactMarkdown from 'react-markdown'

import { PageLayout } from '../components/PageLayout'
import { Paper, Meta, MetaSpan, MetaActions, DraftBadge } from '../components/Style'
import { Authors } from '../components/Authors'
import { Form, useCMS, usePlugin } from 'tinacms'
import { RemarkNode } from 'gatsby-tinacms-remark/src/remark-node'
import { DateFieldPlugin } from 'react-tinacms-date'
import { Hero } from './Page'
import { AuthorSettings } from '../plugins/Authors'
import { TranslationContext } from '../components/Translation'

// ****************************************************************************
// * Gatsby - GraphQL (Fragment / Page Query)
// ****************************************************************************

export const PostFragment = graphql`
    fragment Post on MarkdownRemark {
        excerpt(pruneLength: 160)
        html

        frontmatter {
            path
            lang
            date(formatString: "DD.MM.YYYY")
            title
            draft
            authors
            hero {
                large
                overlay
                image {
                    childImageSharp {
                        fluid(quality: 70, maxWidth: 1920) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        }
    }
`

export const PostQuery = graphql`
    query($path: String!) {
        post: markdownRemark(published: { eq: true }, frontmatter: { path: { eq: $path } }) {
            ...Post

            id
            fileRelativePath
            rawFrontmatter
            rawMarkdownBody
        }
        authorsSettings: settingsJson(fileRelativePath: { eq: "/content/settings/authors.json" }) {
            ...Authors
        }
    }
`

// ****************************************************************************
// * Types
// ****************************************************************************

export type Frontmatter = {
    path: string
    lang: string
    date: string
    title: string
    draft: boolean
    authors: string[]
    hero: Hero
}

export type PostSettings = {
    id: string
    fileRelativePath: string
    rawFrontmatter: unknown
    rawMarkdownBody: string

    excerpt: string
    html: string

    frontmatter: Frontmatter
}

export type PostProps = {
    data: {
        post: PostSettings
        authorsSettings: AuthorSettings
    }
}

// ****************************************************************************
// * React Component incl. Tina CMS - Form Definition
// ****************************************************************************

const Post: React.FC<PostProps> = ({ data }) => {
    const { post, authorsSettings } = data

    const cms = useCMS()
    cms.plugins.add(DateFieldPlugin)

    const PostForm = {
        actions: [DeleteAction],
        fields: [
            {
                label: 'Title',
                name: 'rawFrontmatter.title',
                component: 'text',
            },
            {
                label: 'Authors',
                name: 'rawFrontmatter.authors',
                component: 'authors',
                authors: authorsSettings.authors,
            },
            {
                name: 'rawFrontmatter.draft',
                component: 'toggle',
                label: 'Draft',
            },
            {
                label: 'Date',
                name: 'rawFrontmatter.date',
                component: 'date',
                dateFormat: 'DD.MM.YYYY',
                timeFormat: false,
            },
            {
                label: 'Hero Image',
                name: 'rawFrontmatter.hero.image',
                component: 'image',
                parse: (filename: string) => `../images/${filename}`,
                uploadDir: () => `/content/images/`,
                previewSrc: (formValues: {
                    frontmatter: { hero: { image: { childImageSharp: { fluid: { src: string } } } } }
                }) => {
                    if (!formValues.frontmatter.hero || !formValues.frontmatter.hero.image) return ''
                    return formValues.frontmatter.hero.image.childImageSharp.fluid.src
                },
            },
        ],
    }

    const [, form] = useRemarkForm(post, PostForm) as [RemarkNode, Form]
    if (form) usePlugin(form)

    const { tr } = useContext(TranslationContext)

    return (
        <InlineForm form={form}>
            <PageLayout post={post}>
                <Paper>
                    <Meta>
                        <MetaSpan>{post?.frontmatter?.date || ''}</MetaSpan>
                        {post?.frontmatter?.authors &&
                            post?.frontmatter?.authors &&
                            post?.frontmatter?.authors.length > 0 && (
                                <MetaSpan>
                                    <em>{tr('POST.By') || '!!By'}</em>&nbsp;
                                    <Authors authorIDs={post.frontmatter.authors} settings={authorsSettings} />
                                </MetaSpan>
                            )}
                        <MetaActions>
                            <Link to={'/' + post.frontmatter.lang + '/blog'}>
                                {tr('POST.BackToBlog') || '!!← Back to Blog'}
                            </Link>
                        </MetaActions>
                    </Meta>
                    <h1>
                        <InlineTextField name="rawFrontmatter.title" />
                    </h1>
                    <hr />
                    <InlineWysiwyg name="rawMarkdownBody" format="markdown">
                        <ReactMarkdown source={post?.rawMarkdownBody || ''} />
                    </InlineWysiwyg>
                    {post?.frontmatter?.draft && <DraftBadge>{tr('POST.Draft') || '!!Draft'}</DraftBadge>}
                </Paper>
            </PageLayout>
        </InlineForm>
    )
}

export default Post
