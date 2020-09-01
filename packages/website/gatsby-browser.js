import { AuthorsField } from './src/fields/Authors'

export const onClientEntry = () => {
    window.tinacms.fields.add({
        name: 'authors',
        Component: AuthorsField,
    })
}
