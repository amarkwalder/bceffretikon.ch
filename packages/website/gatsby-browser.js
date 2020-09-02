import { AuthorsField } from './src/fields/Authors'

export const onClientEntry = () => {
    window.tinacms.fields.add({
        name: 'authors',
        Component: AuthorsField,
    })
    // if (window.location.pathname === '/') {
    //     window.location.pathname = `/de`
    // }
}
