import React from 'react'
import styled, { css } from 'styled-components'

interface ContentProps {
    data: any
    html: any
}

export const Content: React.FC<ContentProps> = ({ data, html }) => {
    const centered = data.center ? data.center : false
    return (
        <StyledContent
            center={centered}
            dangerouslySetInnerHTML={{
                __html: html,
            }}
        ></StyledContent>
    )
}

const StyledContent = styled.div<{ center: boolean }>`
    ${props =>
        props.center &&
        css`
            text-align: center;
        `};
`

export const ContentBlock = {
    label: 'Content',
    name: 'content',
    key: 'test',
    defaultItem: {
        content: '',
        center: false,
    },
    fields: [
        { name: 'content', label: 'Content', component: 'markdown' },
        { name: 'center', label: 'Center', component: 'toggle' },
    ],
}
