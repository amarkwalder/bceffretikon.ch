import React from 'react'
import styled, { css } from 'styled-components'
import { Block } from '../templates/Page'

interface ContentProps {
    block: Block
    html: string
}

export const Content: React.FC<ContentProps> = ({ block, html }) => {
    const centered = block.center ? block.center : false
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
