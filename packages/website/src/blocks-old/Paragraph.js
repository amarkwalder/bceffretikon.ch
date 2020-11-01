import React from "react";
import { BlocksControls, InlineTextarea } from "react-tinacms-inline";
import { HiddenBlockFields } from "../utils/block-fields";

import "../styles/paragraph.css";

const preview = process.env.RUNTIME_ENV === "preview";

export const Paragraph = ({ data }) => {
  const { text } = data;
  return (
    <div className="paragraph__background">
      <div className="wrapper wrapper--narrow">
        <p className="paragraph__text">
          <Textarea name="text" focusRing={false} text={text} />
        </p>
      </div>
    </div>
  );
};

export default Paragraph;

const Textarea = ({ text, ...props }) => {
  if (preview) return <InlineTextarea {...props} />;
  return text;
};

export const ParagraphBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <Paragraph data={data.blocks[index]} />
      <HiddenBlockFields />
    </BlocksControls>
  ),
  template: {
    label: "Paragraph",
    defaultItem: {
      text:
        "Take root and flourish quis nostrum exercitationem ullam corporis suscipit laboriosam culture Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur descended from astronomers encyclopaedia galactica? Nisi ut aliquid ex ea commodi consequatur something incredible is waiting to be known sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem ",
    },
    fields: [],
  },
};
