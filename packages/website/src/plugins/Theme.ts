import { useStaticQuery, graphql } from 'gatsby'

// ****************************************************************************
// * Gatsby - GraphQL (Fragment / Static Query)
// ****************************************************************************

export const ThemeFragment = graphql`
    fragment Theme on SettingsJson {
        color {
            black
            white
            primary
            secondary
        }
        easing
        breakpoints {
            small
            medium
            large
            huge
        }
        radius {
            small
        }
        header {
            overline
            underline
            transparent
            height
        }
        menu {
            style
        }
        hero {
            image {
                childImageSharp {
                    fluid(quality: 70, maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            large
            overlay
            overlap
            parallax
        }
        typography {
            uppercaseH2
        }
    }
`

export const useThemeQuery = (): ThemeQueryData => {
    return useStaticQuery(graphql`
        query ThemeQuery {
            theme: settingsJson(fileRelativePath: { eq: "/content/settings/theme.json" }) {
                ...Theme

                rawJson
                fileRelativePath
            }
        }
    `)
}

// ****************************************************************************
// * Types
// ****************************************************************************

export type ThemeSettings = {
    isDarkMode: boolean
    color: {
        black: string
        white: string
        primary: string
        primaryContrast: string
        secondary: string
        secondaryContrast: string
        foreground: string
        background: string
        link: string
    }
    easing: string
    breakpoints: {
        small: string
        medium: string
        large: string
        huge: string
    }
    radius: {
        small: string
    }
    header: {
        overline: boolean
        transparent: boolean
        height: string
        underline: boolean
    }
    menu: {
        style: string
    }
    hero: {
        image: string
        large: boolean
        overlay: boolean
        overlap: string
        parallax: boolean
    }
    typography: {
        uppercaseH2: boolean
    }
}

export type ThemeQueryData = {
    theme: ThemeSettings
}

// ****************************************************************************
// * Tina CMS - Form Definition
// ****************************************************************************

export const ThemeForm = {
    label: 'Theme',
    fields: [
        {
            label: 'Color',
            name: 'rawJson.color',
            component: 'group',
            fields: [
                {
                    label: 'Black',
                    name: 'black',
                    component: 'color',
                    colorFormat: 'hex',
                },
                {
                    label: 'White',
                    name: 'white',
                    component: 'color',
                    colorFormat: 'hex',
                },
                {
                    label: 'Primary',
                    name: 'primary',
                    component: 'color',
                    colorFormat: 'hex',
                },
                {
                    label: 'Secondary',
                    name: 'secondary',
                    component: 'color',
                    colorFormat: 'hex',
                },
            ],
        },
        {
            label: 'Header',
            name: 'rawJson.header',
            component: 'group',
            fields: [
                {
                    label: 'Overline',
                    name: 'overline',
                    component: 'toggle',
                    parse(value: boolean): boolean {
                        return value || false
                    },
                },
                {
                    label: 'Underline',
                    name: 'underline',
                    component: 'toggle',
                    parse(value: boolean): boolean {
                        return value || false
                    },
                },
                {
                    label: 'Transparent',
                    name: 'transparent',
                    component: 'toggle',
                    parse(value: boolean): boolean {
                        return value || false
                    },
                },
                {
                    label: 'Height',
                    name: 'height',
                    component: 'text',
                    parse(value: string): string {
                        return value || ''
                    },
                },
            ],
        },
        {
            label: 'Menu',
            name: 'rawJson.menu',
            component: 'group',
            fields: [
                {
                    label: 'Style',
                    description: "Options are 'pill' and 'glow'",
                    name: 'style',
                    component: 'text',
                    parse(value: string): string {
                        return value || ''
                    },
                },
            ],
        },
        {
            label: 'Hero',
            name: 'rawJson.hero',
            component: 'group',
            fields: [
                {
                    label: 'Default Image',
                    name: 'image',
                    component: 'text',
                    parse(value: string): string {
                        return value || ''
                    },
                },
                {
                    label: 'Overlay',
                    name: 'overlay',
                    component: 'toggle',
                    parse(value: boolean): boolean {
                        return value || false
                    },
                },
                {
                    label: 'Large',
                    name: 'large',
                    component: 'toggle',
                    parse(value: boolean): boolean {
                        return value || false
                    },
                },
                {
                    label: 'Overlap',
                    name: 'overlap',
                    component: 'text',
                    parse(value: string): string {
                        return value || ''
                    },
                },
                {
                    label: 'Parallax',
                    name: 'parallax',
                    component: 'toggle',
                    parse(value: boolean): boolean {
                        return value || false
                    },
                },
            ],
        },
        {
            label: 'Typography',
            name: 'rawJson.typography',
            component: 'group',
            fields: [
                {
                    label: 'Uppercase H2',
                    name: 'uppercaseH2',
                    component: 'toggle',
                    parse(value: boolean): boolean {
                        return value || false
                    },
                },
            ],
        },
    ],
}
