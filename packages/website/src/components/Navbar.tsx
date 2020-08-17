import React from 'react'

import * as MaterializeCss from 'react-materialize'
import { Icon, NavItem, Dropdown, Divider } from 'react-materialize'
import logo from '../images/logo-black.jpg'

const LanguageSelector: React.FC<{ id: string; triggerClassName: string }> = ({ id, triggerClassName }) => (
    <Dropdown
        id={id}
        options={{
            alignment: 'left',
            autoTrigger: true,
            closeOnClick: true,
            constrainWidth: true,
            container: null,
            coverTrigger: true,
            hover: false,
            inDuration: 150,
            outDuration: 250,
        }}
        trigger={
            <a className={triggerClassName} href="#!">
                EN <Icon right>arrow_drop_down</Icon>
            </a>
        }
    >
        <a href="#!">EN</a>
        <a href="#!">DE</a>
    </Dropdown>
)

const LanguageSelectorWithDivider: React.FC<{ id: string; triggerClassName: string }> = ({ id, triggerClassName }) => (
    <>
        <LanguageSelector id={id} triggerClassName={triggerClassName} />
        <div className={triggerClassName}>
            <Divider />
        </div>
    </>
)

export const Navbar: React.FC = () => {
    return (
        <MaterializeCss.Navbar
            className="white"
            alignLinks="right"
            fixed={true}
            centerChildren={true}
            brand={
                <a className="brand-logo" href="/">
                    <img height="28" src={logo} alt="Logo" />
                </a>
            }
            menuIcon={<Icon>menu</Icon>}
            options={{
                draggable: true,
                edge: 'left',
                inDuration: 250,
                outDuration: 200,
                preventScrolling: true,
            }}
        >
            <LanguageSelectorWithDivider id="language-selector-1" triggerClassName="hide-on-large-only" />
            <NavItem href="/">Home</NavItem>
            <NavItem href="/training">Training</NavItem>
            <NavItem href="/interclub">Interclub</NavItem>
            <NavItem href="/contact">Contact</NavItem>
            <NavItem href="/about">About</NavItem>
            <NavItem href="/login">Login</NavItem>
            <LanguageSelector id="language-selector-2" triggerClassName="hide-on-med-and-down" />
        </MaterializeCss.Navbar>
    )
}

export default Navbar
