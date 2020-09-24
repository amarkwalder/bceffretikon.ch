import React from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'

import { Link } from 'gatsby'

import { Wrapper } from './Style'
import { FooterLink } from '../plugins/Footer'

export const Footer = styled(({ title, links, currentLanguage, ...styleProps }) => {
    return (
        <footer {...styleProps}>
            <Wrapper>
                {title}
                {links
                    .filter((footerLink: FooterLink) => footerLink.language === currentLanguage)
                    .map((footerLink: FooterLink, index: number, arr: any[]) => (
                        <span key={'footer-' + index}>
                            {' - '}
                            <Link to={footerLink.link}>{footerLink.title}</Link>
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
