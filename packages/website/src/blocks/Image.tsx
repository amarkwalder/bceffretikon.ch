import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import get from 'lodash.get'
import { Block } from '../templates/Page'

interface ImageProps {
    block: Block
}

export const Image: React.FC<ImageProps> = ({ block }) => {
    return (
        block.image &&
        block.image.childImageSharp && (
            <ImageWrapper>
                <Img fluid={block.image.childImageSharp.fluid} />
            </ImageWrapper>
        )
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
            parse: (filename: string) => `../images/${filename}`,
            uploadDir: () => `/content/images/`,
            previewSrc: (formValues: any, fieldProps: any) => {
                const pathName = fieldProps.input.name.replace('rawJson', 'jsonNode')
                const imageNode = get(formValues, pathName)
                if (!imageNode || !imageNode.childImageSharp) return ''
                return imageNode.childImageSharp.fluid.src
            },
        },
    ],
}
