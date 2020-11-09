import React from "react";
import { BlocksControls, InlineBlocks } from "react-tinacms-inline";
import { FeatureBlock, Feature } from "./Feature";
import { HiddenBlockFields } from "../utils/block-fields";
import styled, { css } from "styled-components";

export const FeatureList = ({ data }) => {
  return (
    <FeatureListWrapper>
      <StyledInlineBlocks
        name="features"
        blocks={FEATURE_BLOCKS}
        direction="horizontal"
        itemProps={{ data: data }}
        data={data}
      />
    </FeatureListWrapper>
  );
};

export default FeatureList;

const FeatureListWrapper = styled.div`
  margin: 50px 0px 50px 0px;
`;

const Blocks = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3rem;
  grid-template-rows: auto;
`;

const StyledBlocks = styled.div`
  ${Blocks}
`;

const StyledInlineBlocks = styled(InlineBlocks)`
  ${Blocks}
`;

export const FeatureListBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <FeatureList data={data.blocks[index]} />
      <HiddenBlockFields />
    </BlocksControls>
  ),
  template: {
    label: "Feature List",
    defaultItem: {
      _template: "FeatureListBlock",
      features: [
        {
          _template: "FeatureBlock",
          heading: "Heading 1",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nunc mi ipsum faucibus vitae aliquet. Sed turpis tincidunt id aliquet risus. Nunc sed id semper risus.",
        },
        {
          _template: "FeatureBlock",
          heading: "Heading 2",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nunc mi ipsum faucibus vitae aliquet. Sed turpis tincidunt id aliquet risus. Nunc sed id semper risus.",
        },
        {
          _template: "FeatureBlock",
          heading: "Heading 3",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nunc mi ipsum faucibus vitae aliquet. Sed turpis tincidunt id aliquet risus. Nunc sed id semper risus.",
        },
      ],
    },
    fields: [],
  },
};

const FEATURE_BLOCKS = {
  FeatureBlock,
};
