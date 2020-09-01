import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import { DeleteAction, useLocalRemarkForm } from 'gatsby-tinacms-remark'
import { InlineForm, InlineTextField } from 'react-tinacms-inline'
import { InlineWysiwyg } from 'react-tinacms-editor'
import ReactMarkdown from 'react-markdown'

import { PageLayout } from '../components/PageLayout'
import { Paper, Meta, MetaSpan, MetaActions, DraftBadge } from '../components/Style'
import { EditToggle } from '../components/EditToggle'
import { ListAuthors } from '../components/Authors'
import { useAuthors } from '../utils/useAuthors'
import { Form, useCMS } from 'tinacms'
import { RemarkNode } from 'gatsby-tinacms-remark/src/remark-node'
import { DateFieldPlugin } from 'react-tinacms-date'

interface PostProps {
    data: any
}

const Post: React.FC<PostProps> = props => {
    const authors = useAuthors()
    const page = props.data.markdownRemark

    const cms = useCMS()
    cms.plugins.add(DateFieldPlugin)

    const formOptions = {
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
                authors: authors,
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
                previewSrc: (formValues: any) => {
                    if (!formValues.frontmatter.hero || !formValues.frontmatter.hero.image) return ''
                    return formValues.frontmatter.hero.image.childImageSharp.fluid.src
                },
            },
        ],
    }

    const [data, form] = useLocalRemarkForm(page, formOptions) as [RemarkNode, Form]

    return (
        <InlineForm form={form}>
            <PageLayout page={data}>
                <Paper>
                    <Meta>
                        <MetaSpan>{data.frontmatter.date}</MetaSpan>
                        {data.frontmatter.authors && data.frontmatter.authors.length > 0 && (
                            <MetaSpan>
                                <em>By</em>&nbsp;
                                <ListAuthors authorIDs={data.frontmatter.authors} />
                            </MetaSpan>
                        )}
                        <MetaActions>
                            <Link to="/blog">← Back to Blog</Link>
                        </MetaActions>
                    </Meta>
                    <h1>
                        <InlineTextField name="rawFrontmatter.title" />
                    </h1>
                    <hr />
                    <InlineWysiwyg name="rawMarkdownBody" format="markdown">
                        <ReactMarkdown source={data.rawMarkdownBody} />
                    </InlineWysiwyg>
                    {data.frontmatter.draft && <DraftBadge>Draft</DraftBadge>}
                    {process.env.NODE_ENV !== 'production' && <EditToggle />}
                </Paper>
            </PageLayout>
        </InlineForm>
    )
}

export default Post

export const postQuery = graphql`
    query($path: String!) {
        markdownRemark(published: { eq: true }, frontmatter: { path: { eq: $path } }) {
            id
            excerpt(pruneLength: 160)
            html

            frontmatter {
                path
                date(formatString: "MMMM DD, YYYY")
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

            fileRelativePath
            rawFrontmatter
            rawMarkdownBody
        }
        settingsJson(fileRelativePath: { eq: "/content/settings/authors.json" }) {
            ...authors
        }
    }
`
