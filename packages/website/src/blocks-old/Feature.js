import React from "react";
import { BlocksControls, InlineTextarea } from "react-tinacms-inline";
import { HiddenBlockFields } from "../utils/block-fields";

import "../styles/features.css";

const preview = process.env.RUNTIME_ENV === "preview";

export const Feature = ({ data }) => {
  const { heading, supporting_copy } = data;
  return (
    <div className="feature">
      <h3>
        <Textarea name="heading" focusRing={false} text={heading} />
      </h3>
      <p>
        <Textarea
          name="supporting_copy"
          focusRing={false}
          text={supporting_copy}
        />
      </p>
    </div>
  );
};

export default Feature;

const Textarea = ({ text, ...props }) => {
  if (preview) return <InlineTextarea {...props} />;
  return text;
};

export const FeatureBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <Feature data={data.features[index]} />
      <HiddenBlockFields />
    </BlocksControls>
  ),
  template: {
    label: "Feature",
    defaultItem: {
      _template: "feature",
      heading: "Marie Skłodowska Curie",
      supporting_copy:
        "Rich in mystery muse about vastness is bearable only through love Ut enim ad minima veniam at the edge of forever are creatures of the cosmos. ",
    },
    fields: [],
  },
};
