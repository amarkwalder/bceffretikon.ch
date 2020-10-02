import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

export const NavLink: React.FC = ({ children, ...styleProps }) => {
    return <StyledNavLink {...styleProps}>{children}</StyledNavLink>
}

const StyledNavLink = styled(({ children, ...styleProps }) => (
    <Link activeClassName="active" {...styleProps}>
        <span>{children}</span>
    </Link>
))`
    span {
        display: block;
        width: 100%;
    }
`
