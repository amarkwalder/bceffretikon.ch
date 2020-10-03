import { AuthorsField } from './src/fields/Authors'

const translations = require('./content/settings/translations.json')

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const onClientEntry = () => {
    console.log('tinacms.enabled', window.tinacms.enabled)
    console.log('tinacms.disabled', window.tinacms.disabled)
    window.tinacms.fields.add({
        name: 'authors',
        Component: AuthorsField,
    })
    if (window.location.pathname === '/') {
        window.location.pathname = `/${translations.defaultLanguage}`
    }
}
