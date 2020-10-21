import React from "react";
import { BlocksControls, InlineBlocks } from "react-tinacms-inline";
import { featureBlock } from "./Feature";
import { HiddenBlockFields } from "../utils/block-fields";

import styled from "styled-components";
import "../styles/features.css";

export function FeatureList({ index }) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div className="wrapper">
        <StyledInlineBlocks
          name="features"
          blocks={FEATURE_BLOCKS}
          direction="horizontal"
        />
      </div>
      <HiddenBlockFields />
    </BlocksControls>
  );
}

// Define a new 'styled' version of InlineBlocks
const StyledInlineBlocks = styled(InlineBlocks)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3rem;
  grid-template-rows: auto;
`;

/**
 * 2. Define the FeatureList Block
 */
export const featureListBlock = {
  Component: FeatureList,
  template: {
    label: "Feature List",
    defaultItem: {
      _template: "features",
      features: [
        {
          _template: "feature",
          heading: "heading 1",
          supporting_copy: "supporting copy",
        },
        {
          _template: "feature",
          heading: "heading 2",
          supporting_copy: "supporting copy",
        },
        {
          _template: "feature",
          heading: "heading 3",
          supporting_copy: "supporting copy",
        },
      ],
    },
    fields: [],
  },
};

/**
 * 3. Define the block options
 * for FeatureList to render, we will add
 * a block to this next
 */
const FEATURE_BLOCKS = {
  feature: featureBlock,
};
