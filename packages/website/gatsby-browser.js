import { AuthorsField } from './src/fields/Authors'

const translations = require('./content/settings/translations.json')

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const onClientEntry = () => {
    window.tinacms.fields.add({
        name: 'authors',
        Component: AuthorsField,
    })
    if (window.location.pathname === '/') {
        window.location.pathname = `/${translations.defaultLanguage}`
    }
}
