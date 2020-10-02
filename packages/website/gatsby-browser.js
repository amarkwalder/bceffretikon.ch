import { AuthorsField } from './src/fields/Authors'

const translations = require('./content/settings/translations.json')

export const onClientEntry = () => {
    window.tinacms.fields.add({
        name: 'authors',
        Component: AuthorsField,
    })
    if (window.location.pathname === '/') {
        window.location.pathname = `/${translations.defaultLanguage}`
    }
}
