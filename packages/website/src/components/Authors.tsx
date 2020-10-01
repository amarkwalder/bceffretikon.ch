import React from 'react'

import { Author, AuthorSettings } from '../plugins/Authors'

type AuthorsProps = {
    authorIDs: string[]
    settings: AuthorSettings
}

export const Authors: React.FC<AuthorsProps> = ({ authorIDs, settings }) => {
    const allAuthors = settings.authors
    const authors = authorIDs
        .map(id => allAuthors.find(author => id === author.id))
        .filter(author => author !== undefined) as Author[]

    const authorList = authors.map((author: Author, index: number) => {
        if (authors.length === index + 1) {
            return author.name
        } else {
            return author.name + ', '
        }
    })

    return <>{authorList.length > 0 && authorList}</>
}

export default Authors
