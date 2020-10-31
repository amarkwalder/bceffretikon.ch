import React from "react";
import { BlocksControls, InlineBlocks } from "react-tinacms-inline";
import { FeatureBlock, Feature } from "./Feature";
import { HiddenBlockFields } from "../utils/block-fields";
import { Error } from "../components/Error";

import styled from "styled-components";
import "../styles/features.css";

const preview = process.env.RUNTIME_ENV === "preview";

export const FeatureList = ({ data }) => {
  return (
    <div className="wrapper">
      <StyledBlocks
        name="features"
        blocks={FEATURE_BLOCKS}
        direction="horizontal"
        itemProps={{ data: data }}
        data={data}
      />
    </div>
  );
};

const Blocks = ({ data, className, ...props }) => {
  if (preview) return <InlineBlocks className={className} {...props} />;
  return (
    <div className={className}>
      {data?.features &&
        data.features.map((block, index) => {
          const props = { key: "feature-block-" + index, data: block };
          switch (block._template) {
            case "feature":
              return <Feature {...props} />;
            default:
              return (
                <Error
                  key={"feature-block-" + index}
                  message={"Unknown block element '" + block._template + "'"}
                />
              );
          }
        })}
    </div>
  );
};

const StyledBlocks = styled(Blocks)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3rem;
  grid-template-rows: auto;
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

const FEATURE_BLOCKS = {
  feature: FeatureBlock,
};
