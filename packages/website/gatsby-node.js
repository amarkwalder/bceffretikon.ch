const path = require(`path`)

exports.onCreateNode = ({ node, actions, createNodeId, createContentDigest }) => {
    const { createNode, createNodeField, createParentChildLink } = actions

    console.log('onCreateNode', node.internal)

    // Check for the correct type to only affect this
    if (node.internal.type === `PagesJson`) {
        // transform markdown in blocks[i].content
        if (node.blocks) {
            const markdownHost = {
                id: createNodeId(`${node.id} markdown host`),
                parent: node.id,
                internal: {
                    contentDigest: createContentDigest(JSON.stringify(node.blocks)),
                    type: `${node.internal.type}MarkdownData`,
                },
            }

            createNode(markdownHost)

            createNodeField({
                node,
                name: `markdownContent___NODE`, // Before the ___NODE: Name of the new fields
                value: markdownHost.id, // Connects both nodes
            })

            node.blocks.forEach((block, i) => {
                if (!block.content) {
                    block.content = ''
                }
                const blockNode = {
                    id: `${node.id} block ${i} markdown`,
                    parent: markdownHost.id,
                    internal: {
                        content: block.content,
                        contentDigest: createContentDigest(block.content),
                        type: `${node.internal.type}BlockMarkdown`,
                        mediaType: 'text/markdown',
                    },
                }

                createNode(blockNode)

                createParentChildLink({ parent: node, child: blockNode })
            })
        }

        // transform markdown in node.content
        if (node.content) {
            const textNode = {
                id: createNodeId(`${node.id} markdown field`),
                children: [],
                parent: node.id,
                internal: {
                    content: node.content,
                    mediaType: `text/markdown`, // Important!
                    contentDigest: createContentDigest(node.content),
                    type: `${node.internal.type}Markdown`,
                },
            }

            createNode(textNode)

            // Add link to the new node
            createNodeField({
                node,
                name: `markdownContent___NODE`, // Before the ___NODE: Name of the new fields
                value: textNode.id, // Connects both nodes
            })
        }
    }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
    const result = await graphql(`
        {
            pages: allPagesJson(filter: { path: { ne: null } }) {
                edges {
                    node {
                        path
                    }
                }
            }
        }
    `)
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }
    result.data.pages.edges.forEach(({ node }) => {
        console.log('createPage', node)
        createPage({
            path: node.path,
            component: path.resolve(`src/templates/Page.tsx`),
            context: {},
        })
    })
}
