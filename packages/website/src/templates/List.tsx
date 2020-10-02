import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { useJsonForm } from 'gatsby-tinacms-json'
import { Link } from 'gatsby'

import { PageLayout } from '../components/PageLayout'
import { Paper, Meta, MetaSpan, MetaActions, DraftBadge } from '../components/Style'
import { Authors } from '../components/Authors'
import { PageSettings, PageFormWithoutSections } from './Page'
import { AuthorSettings } from '../plugins/Authors'
import { PostSettings } from './Post'
import { usePlugin } from 'tinacms'
import { TranslationContext } from '../components/Translation'

// ****************************************************************************
// * Gatsby - GraphQL (Fragment / Page Query)
// ****************************************************************************

export const PageQuery = graphql`
    query($listType: String!, $slug: String!, $skip: Int!, $limit: Int!) {
        page: pagesJson(path: { eq: $slug }) {
            ...Page

            rawJson
            fileRelativePath
        }
        posts: allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { type: { eq: $listType } }, published: { eq: true } }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    ...Post
                }
            }
        }
        authors: settingsJson(fileRelativePath: { eq: "/content/settings/authors.json" }) {
            ...Authors

            rawJson
            fileRelativePath
        }
    }
`

// ****************************************************************************
// * Types
// ****************************************************************************

export type ListSettings = {
    page: PageSettings
    posts: {
        edges: {
            node: PostSettings
        }[]
    }
    authors: AuthorSettings
}

export type ListProps = {
    data: ListSettings
    pageContext: any
}

// ****************************************************************************
// * React Component
// ****************************************************************************

export const List: React.FC<ListProps> = ({ data, pageContext }) => {
    const { page, posts, authors } = data

    const [, pageForm] = useJsonForm(page as any, PageFormWithoutSections)
    if (pageForm) usePlugin(pageForm)

    const { slug, numPages, currentPage } = pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? slug : slug + '/' + (currentPage - 1).toString()
    const nextPage = slug + '/' + (currentPage + 1).toString()

    page.title = isFirst ? page.title : page.title + ' - ' + currentPage

    const { tr } = useContext(TranslationContext)

    const Post: React.FC<{ post: PostSettings; authors: AuthorSettings }> = ({ post }) => {
        return (
            <Paper article key={post.id}>
                {post.frontmatter.draft && <DraftBadge>{tr('POST.Draft') || '!!Draft'}</DraftBadge>}
                <h2>
                    <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                </h2>
                <p>{post.excerpt}</p>
                <Meta>
                    <MetaSpan>{post.frontmatter.date}</MetaSpan>
                    {post.frontmatter.authors && (
                        <MetaSpan>
                            <em>{tr('POST.By') || '!!By'}</em>&nbsp;
                            <Authors authorIDs={post.frontmatter.authors} settings={authors} />
                        </MetaSpan>
                    )}
                    <MetaActions>
                        <Link to={post.frontmatter.path}>{tr('POST.ReadArticle') || '!!Read Article →'}</Link>
                    </MetaActions>
                </Meta>
            </Paper>
        )
    }

    const PrevPage = () => {
        if (isFirst) return <></>
        return (
            <Link to={prevPage} rel="prev">
                {tr('POST.Newer') || '!!← Newer'}
            </Link>
        )
    }

    const NextPage = () => {
        if (isLast) return <></>
        return (
            <Link to={nextPage} rel="next">
                {tr('POST.Older') || '!!Older →'}
            </Link>
        )
    }

    return (
        <PageLayout page={page}>
            <>
                {posts &&
                    posts.edges
                        .filter(item => item.node.frontmatter.lang === page.lang)
                        .map((item, index) => <Post key={'post-' + index} post={item.node} authors={authors} />)}
                <ListNav>
                    <PrevPage />
                    <NextPage />
                </ListNav>
            </>
        </PageLayout>
    )
}

export const ListNav = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;

    a {
        display: inline-block;
        padding: 0.5rem 1rem;
    }
`

export default List
