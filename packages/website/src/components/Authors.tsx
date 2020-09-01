import React from 'react'

import { useAuthors } from '../utils/useAuthors'

interface ListAuthorsProps {
    authorIDs: string[]
}

export const ListAuthors: React.FC<ListAuthorsProps> = ({ authorIDs }) => {
    const authors = useAuthors().filter(author => authorIDs.find(id => id === author.id))

    const authorList = authors.map((author, index) => {
        if (authors.length === index + 1) {
            return author.name
        } else {
            return author.name + ', '
        }
    })

    return <>{authorList.length > 0 && authorList[0]}</>
}

export const AuthorsForm = {
    label: 'Authors',
    fields: [
        {
            label: 'Authors',
            name: 'rawJson.authors',
            component: 'group-list',
            itemProps: (item: { id: string; name: string }): { key: string; label: string } => ({
                key: item.id,
                label: item.name,
            }),
            defaultItem: (): { name: string; id: string; email: string; link: string } => ({
                name: 'New Author',
                id: Math.random().toString(36).substr(2, 9),
                email: '',
                link: '',
            }),
            fields: [
                {
                    label: 'Name',
                    name: 'name',
                    component: 'text',
                    parse(value: string): string {
                        return value || ''
                    },
                },
                {
                    label: 'Email',
                    name: 'email',
                    component: 'text',
                    parse(value: string): string {
                        return value || ''
                    },
                },
                {
                    label: 'Link',
                    name: 'link',
                    component: 'text',
                    parse(value: string): string {
                        return value || ''
                    },
                },
            ],
        },
    ],
}
