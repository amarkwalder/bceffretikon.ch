import React, { useEffect, useRef, useState, MouseEvent } from 'react'
import styled, { css } from 'styled-components'
import { mix, transparentize } from 'polished'

import { LeftArrow, DownArrow } from 'styled-icons/boxicons-solid'

interface NavSelectProps {
    items: string[]
    selected: string
    isDarkMode: boolean
    onClick: (value: string) => void
}

export const NavSelect: React.FC<NavSelectProps> = ({ items, selected, isDarkMode, onClick, ...styleProps }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggleDropdownOpen = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const selectItem = (e: MouseEvent) => {
        const value = e.currentTarget.textContent
        if (value && value !== selected) {
            setDropdownOpen(false)
            onClick(value)
        }
    }

    const handleOutsideClick = (e: Event) => {
        if (ref.current && e.target instanceof Node && ref.current.contains(e.target)) {
            return
        }
        setDropdownOpen(false)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [])

    return (
        <Select ref={ref} {...styleProps}>
            <Trigger onClick={toggleDropdownOpen}>
                {selected} {!dropdownOpen ? <LeftArrow size="15" /> : <DownArrow size="15" />}
            </Trigger>
            <Options open={dropdownOpen}>
                {items.map(item => (
                    <Option key={item} onClick={selectItem} selected={item === selected} isDarkMode={isDarkMode}>
                        {item}
                    </Option>
                ))}
            </Options>
        </Select>
    )
}

const Select = styled.div`
    display: block;
    color: inherit;
`

const Trigger = styled.span`
    display: block;

    cursor: pointer;

    font-size: 0.8rem;
    letter-spacing: 0.5px;
    text-decoration: none;
    color: inherit !important;
    opacity: 0.5;
    overflow: visible;

    &:focus-visible {
        opacity: 1;
    }

    &:hover:not(.active) {
    }

    &:hover,
    &:active,
    &.active {
        opacity: 1;
    }

    &.active {
    }
`

const Options = styled.div<{ open: boolean }>`
    position: absolute;
    display: block;
    top: 100%;
    left: 0;
    right: 0;

    z-index: 2;

    ${props =>
        !props.open &&
        css`
            visibility: hidden;
            pointer-events: none;
        `}

    ${props =>
        props.open &&
        css`
            visibility: visible;
            pointer-events: all;
        `}
`

const Option = styled.div<{ selected: boolean; isDarkMode: boolean }>`
    position: relative;
    display: block;

    @media (min-width: ${props => props.theme.breakpoints.small}) {
        padding: 15px 22px 15px 22px;
    }

    @media (max-width: ${props => props.theme.breakpoints.small}) {
        padding: 0px 22px 0px 22px;
    }

    cursor: pointer;

    opacity: 1;
    pointer-events: all;

    background-color: ${props =>
        props.isDarkMode || props.theme.header.transparent
            ? mix(0.95, props.theme.color.black, props.theme.color.white)
            : mix(0.95, props.theme.color.white, props.theme.color.black)};
    box-shadow: 0 1rem 2rem -0.5rem ${props => transparentize(0.5, props.theme.color.black)};

    ${props =>
        props.selected &&
        css`
            color: ${props.theme.color.white};
            background-color: ${props.theme.color.primary};
        `}

    &:hover {
        cursor: pointer;
        background-color: #b2b2b2;
    }
`
