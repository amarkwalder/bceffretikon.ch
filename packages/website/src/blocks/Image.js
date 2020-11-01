import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import get from 'lodash.get'
import { Block } from '../templates/Page'

type ImageProps = {
    block: Block
}

export const Image: React.FC<ImageProps> = ({ block }) => {
    return (
        <ImageWrapper>
            {block?.image?.childImageSharp && <Img fluid={block.image.childImageSharp.fluid} />}
        </ImageWrapper>
    )
}

const ImageWrapper = styled.div`
    overflow: hidden;
`

export const ImageBlock = {
    label: 'Image',
    name: 'image',
    key: 'test',
    defaultItem: {
        image: '',
    },
    fields: [
        {
            label: 'Image',
            name: 'image',
            component: 'image',
            parse: (filename: string): string => `../images/${filename}`,
            uploadDir: (): string => `/content/images/`,
            previewSrc: (formValues: unknown, fieldProps: { input: { name: string } }): string => {
                const pathName = fieldProps.input.name.replace('rawJson', 'jsonNode')
                const imageNode = get(formValues, pathName)
                if (!imageNode || !imageNode.childImageSharp) return ''
                return imageNode.childImageSharp.fluid.src
            },
        },
    ],
}
