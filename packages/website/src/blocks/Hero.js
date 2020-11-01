import React from "react";
import { InlineGroup, InlineTextarea } from "react-tinacms-inline";
import { HiddenBlockFields } from "../utils/block-fields";

import styled, { css } from "styled-components";
import { transparentize } from "polished";
import { Wrapper, Overlay, LinkButton, Image } from "../components/Style";
import { GIT_IMAGES_UPLOAD_DIR } from "../constants";

const preview = process.env.RUNTIME_ENV === "preview";

export const Hero = ({ data }) => {
  const { headline, textline, large, overlay, image, ctas } = data;

  console.log("image", image);

  return (
    <HeroWrapper>
      <HeroBackground>
        {overlay && <Overlay />}
        {image && <HeroImage src={image} />}
      </HeroBackground>
      <HeroContent large={large}>
        <Wrapper>
          <InlineGroup name="hero" fields={fields}>
            <Headline>
              <Textarea name="headline" focusRing={false} text={headline} />
            </Headline>
            <Textline>
              <Textarea name="textline" focusRing={false} text={textline} />
            </Textline>
            {ctas && (
              <Actions>
                {Object.values(ctas).map((cta, index) => {
                  return (
                    <LinkButton
                      key={"cta-" + index}
                      primary={cta.primary?.toString() || "false"}
                      to={cta.link}
                    >
                      {cta.label}
                      {cta.arrow && <span>&nbsp;&nbsp;→</span>}
                    </LinkButton>
                  );
                })}
              </Actions>
            )}
            <HiddenBlockFields fields={fields} />
          </InlineGroup>
        </Wrapper>
      </HeroContent>
    </HeroWrapper>
  );
};

const fields = [
  {
    label: "Image",
    name: "image",
    component: "image",
    parse: (media) => `/images/${media.filename}`,
    uploadDir: () => GIT_IMAGES_UPLOAD_DIR,
    previewSrc: (src) => src,
  },
  {
    label: "Actions",
    name: "ctas",
    component: "group-list",
    itemProps: (item) => ({ key: item.link, label: item.label }),
    fields: [
      {
        label: "Label",
        name: "label",
        component: "text",
      },
      {
        label: "Link",
        name: "link",
        component: "text",
      },
      {
        label: "Primary",
        name: "primary",
        component: "toggle",
      },
      {
        label: "Arrow",
        name: "arrow",
        component: "toggle",
      },
    ],
  },
  {
    label: "Overlay",
    name: "overlay",
    component: "toggle",
  },
  {
    label: "Large",
    name: "large",
    component: "toggle",
  },
];

export default Hero;

const HeroWrapper = styled.div`
  position: relative;
  flex: 0 0 auto;
  top: 0;
  padding-top: ${(props) => props.theme.header.height};
  min-height: calc(
    ${(props) => props.theme.header.height} +
      ${(props) => props.theme.header.height}
  );

  ${(props) =>
    props.theme.hero.parallax &&
    css`
      transform-style: preserve-3d;
    `}
`;

const HeroContent = styled.div`
  display: block;
  padding: 3rem 0;

  ${(props) =>
    props.large &&
    css`
      padding: 8rem 0;
    `}
`;

const HeroBackground = styled.div`
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: -${(props) => props.theme.hero.overlap};
  z-index: -1;
  background-color: ${(props) =>
    transparentize(0.1, props.theme.color.primary)};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 0;

  ${Overlay} {
    z-index: 1;
  }

  ${(props) =>
    props.theme.hero.parallax &&
    css`
      transform-style: preserve-3d;
      transform: translateZ(-1px) scale(2) translateY(25%);
    `}
`;

export const Headline = styled.h2`
  font-size: 2.6em;
  line-height: 1.2;
  color: ${(props) => props.theme.color.white};
  word-spacing: 1px;
  font-weight: 700;
  text-transform: none;
`;

export const Textline = styled.p`
  font-size: 1.3rem;
  line-height: 1.2;
  color: ${(props) => props.theme.color.secondary};
  word-spacing: 1px;
  font-weight: 500;
  text-transform: none;
  padding-bottom: 0.3rem;
`;

export const Actions = styled.div`
  padding-bottom: 0.5rem;
  > * {
    margin-right: 1rem;
  }
`;

export const HeroImage = styled(Image)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Textarea = ({ text, ...props }) => {
  if (preview) return <InlineTextarea {...props} />;
  return text;
};
