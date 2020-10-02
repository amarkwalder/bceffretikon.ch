import React, { useContext } from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'

import { Link } from 'gatsby'

import { Wrapper } from './Style'
import { FooterLink } from '../plugins/Footer'
import { TranslationContext } from './Translation'
import { removeSuffixSlash, removeTrailingSlash } from '../utils/helpers'

export const Footer = styled(({ title, links, currentLanguage, ...styleProps }) => {
    const { tr } = useContext(TranslationContext)

    return (
        <footer {...styleProps}>
            <Wrapper>
                {title}
                {links.map((footerLink: FooterLink, index: number) => (
                    <span key={'footer-' + index}>
                        {' - '}
                        <Link
                            to={removeTrailingSlash('/' + currentLanguage + '/' + removeSuffixSlash(footerLink.link))}
                        >
                            {tr('FOOTER.' + footerLink.title) || '!!' + footerLink.title}
                        </Link>
                    </span>
                ))}
            </Wrapper>
        </footer>
    )
})`
    font-size: 0.8rem;
    line-height: 3rem;
    text-align: center;
    height: 3rem;
    background-color: ${props => transparentize(0.97, props.theme.color.foreground)};
    box-shadow: inset 0 1px 0 ${props => transparentize(0.95, props.theme.color.foreground)};
`
