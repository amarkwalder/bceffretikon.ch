import { AuthorsField } from './src/fields/Authors'

const site = require('./content/settings/site.json')

export const onClientEntry = () => {
    window.tinacms.fields.add({
        name: 'authors',
        Component: AuthorsField,
    })
    if (window.location.pathname === '/') {
        window.location.pathname = `/${site.languages.defaultLangKey}`
    }
}
