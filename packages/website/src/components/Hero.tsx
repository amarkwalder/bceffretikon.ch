import React from 'react'

import Img from 'gatsby-image'
import { Parallax } from 'react-materialize'
import BackgroundImage from 'gatsby-background-image'

interface HeroProps {
    hero: any
}

export const Hero: React.FC<HeroProps> = ({ hero }) => {
    return (
        <Img fluid={hero.image.childImageSharp.fluid} />

        // <Parallax
        //     image2={<img alt="" src="http://materializecss.com/images/parallax1.jpg" />}
        //     image={<Img fluid={hero.image.childImageSharp.fluid} />}
        //     options={{
        //         responsiveThreshold: 0,
        //     }}
        // />
    )
}
