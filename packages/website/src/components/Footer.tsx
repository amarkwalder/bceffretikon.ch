import React from 'react'

import * as MaterializeCss from 'react-materialize'
import logo from '../images/logo-white.jpg'

export const Footer: React.FC = () => {
    return (
        <MaterializeCss.Footer
            className="teal"
            copyrights="&copy; 2020 Badminton Club Effretikon. Alle Rechte vorbehalten."
            links={
                <>
                    <h5 className="white-text">Links</h5>
                    <ul>
                        <li>
                            <a className="white-text" href="/">
                                Home
                            </a>
                        </li>
                        <li>
                            <a className="white-text" href="/training/">
                                Training
                            </a>
                        </li>
                        <li>
                            <a className="white-text" href="/interclub/">
                                Interclub
                            </a>
                        </li>
                        <li>
                            <a className="white-text" href="/about/">
                                Über uns
                            </a>
                        </li>
                        <li>
                            <a className="white-text" href="/contact/">
                                Kontakt
                            </a>
                        </li>
                        <li>
                            <a className="white-text" href="/login/">
                                Login
                            </a>
                        </li>
                    </ul>
                </>
            }
            moreLinks={
                <>
                    &nbsp; &nbsp;
                    <span style={{ whiteSpace: 'nowrap' }}>
                        <a className="white-text" href="/dataprotection/">
                            Datenschutz
                        </a>
                        &nbsp; &nbsp;
                        <a className="white-text" href="/legalnotice/">
                            Impressum
                        </a>
                    </span>
                </>
            }
        >
            <img height="50" src={logo} alt="Logo" />
            <p>
                <a className="white-text" href="mailto:info@bceffretikon.ch">
                    info@bceffretikon.ch
                </a>
            </p>
        </MaterializeCss.Footer>
    )
}

export default Footer
