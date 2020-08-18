const path = require('path')
const REPO_ABSOLUTE_PATH = path.join(process.cwd(), '../../')

const site = require('./content/settings/site.json')

console.log('REPO_ABSOLUTE_PATH', REPO_ABSOLUTE_PATH)

module.exports = {
    plugins: [
        `gatsby-plugin-typescript`,
        `gatsby-plugin-sass`,
        {
            resolve: 'gatsby-plugin-tinacms',
            options: {
                enabled: process.env.NODE_ENV !== 'production',
                sidebar: true,
                toolbar: false,
                plugins: [
                    {
                        resolve: 'gatsby-tinacms-git',
                        options: {
                            pathToRepo: REPO_ABSOLUTE_PATH,
                            pathToContent: 'packages/website/',
                            defaultCommitMessage: 'Edited with TinaCMS',
                            defaultCommitName: 'TinaCMS',
                            defaultCommitEmail: 'git@tinacms.org',
                            pushOnCommit: true,
                        },
                    },
                    `gatsby-tinacms-json`,
                    'gatsby-tinacms-remark',
                ],
            },
        },

        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: 'uploads',
                path: `${__dirname}/static/images`,
                plugins: [`gatsby-transformer-sharp`, `gatsby-plugin-sharp`],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: 'content',
                path: `${__dirname}/content`,
                plugins: [`gatsby-transformer-sharp`, `gatsby-plugin-sharp`, `gatsby-transformer-json`],
            },
        },

        {
            resolve: `gatsby-plugin-layout`,
            options: {
                component: require.resolve(`./src/components/SiteLayout.tsx`),
            },
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: site.title,
                short_name: site.title,
                start_url: `/`,
                display: `minimal-ui`,
                icon: `content/images/icon.png`,
            },
        },
        `gatsby-plugin-offline`,

        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-relative-images',
                        options: {
                            name: 'uploads',
                        },
                    },
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 880,
                            withWebp: true,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-copy-linked-files',
                        options: {
                            destinationDir: 'static',
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: 'language-',
                            inlineCodeMarker: null,
                            aliases: {},
                            showLineNumbers: true,
                            noInlineHighlight: false,
                            prompt: {
                                user: 'root',
                                host: 'localhost',
                                global: false,
                            },
                        },
                    },
                ],
            },
        },

        {
            resolve: 'gatsby-plugin-web-font-loader',
            options: {
                google: {
                    families: ['Material Icons'],
                },
            },
        },
    ],
}
