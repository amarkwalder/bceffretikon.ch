import React from "react";
import { BlocksControls, InlineTextarea } from "react-tinacms-inline";
//import { HiddenBlockFields } from "../utils/block-fields";
import styled from "styled-components";

export const Feature = ({ data }) => {
  return (
    <StyledFeature>
      <h3>
        <InlineTextarea name="heading" focusRing={false} />
      </h3>
      <p>
        <InlineTextarea name="content" focusRing={false} />
      </p>
    </StyledFeature>
  );
};

export default Feature;

const StyledFeature = styled.div``;

// TODO Browser Cache
export const FeatureBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <Feature data={data.features[index]} />
      {/* <HiddenBlockFields /> */}
    </BlocksControls>
  ),
  template: {
    label: "Feature",
    defaultItem: {
      _template: "FeatureBlock",
      heading: "Heading",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nunc mi ipsum faucibus vitae aliquet. Sed turpis tincidunt id aliquet risus. Nunc sed id semper risus.",
    },
    fields: [],
  },
};
