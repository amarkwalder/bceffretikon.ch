const path = require('path')
const REPO_ABSOLUTE_PATH = path.join(process.cwd(), '../../')

const theme = require('./content/settings/theme.json')
const site = require('./content/settings/site.json')

module.exports = {
    plugins: [
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-tinacms-json`,
        `gatsby-transformer-json`,
        {
            resolve: 'gatsby-plugin-tinacms',
            options: {
                enabled: process.env.NODE_ENV !== 'production',
                toolbar: true,
                sidebar: {
                    hidden: false,
                    position: 'displace',
                    theme: {
                        color: {
                            primary: {
                                light: theme.color.primary,
                                medium: theme.color.primary,
                                dark: theme.color.primary,
                            },
                        },
                    },
                },
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
                    'gatsby-tinacms-remark',
                ],
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/static/images`,
                name: `uploads`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `content`,
                path: `${__dirname}/content`,
            },
        },
        {
            resolve: `gatsby-plugin-layout`,
            options: {
                component: require.resolve(`./src/components/SiteLayout.tsx`),
            },
        },
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: site.title,
                short_name: site.title,
                start_url: `/`,
                background_color: theme.color.primary,
                theme_color: theme.color.primary,
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
                    families: ['Lato:400,700'],
                },
            },
        },
    ],
}
