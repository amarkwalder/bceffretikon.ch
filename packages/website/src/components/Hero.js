import React from "react";
import { BlocksControls, InlineTextarea } from "react-tinacms-inline";
import { HiddenBlockFields } from "../utils/block-fields";

import "../styles/hero.css";

const preview = process.env.RUNTIME_ENV === "preview";

export const Hero = ({ data }) => {
  const { headline, subtext, text_color, background_color, align } = data;
  return (
    <div
      className="hero"
      style={{
        color: text_color || "#000",
        backgroundColor: background_color || "aliceblue",
        textAlign: align,
        justifyContent: align === "left" ? "start" : align,
      }}
    >
      <div className="wrapper wrapper--narrow">
        <h1>
          <Textarea name="headline" focusRing={false} text={headline} />
        </h1>
        <p>
          <Textarea name="subtext" focusRing={false} text={subtext} />
        </p>
      </div>
    </div>
  );
};

export default Hero;

const Textarea = ({ text, ...props }) => {
  if (preview) return <InlineTextarea {...props} />;
  return text;
};

const fields = [
  {
    name: "background_color",
    label: "Background Color",
    component: "color",
    widget: "block",
    colors: ["#051e26", "#f2dfc6", "#cfdcc8", "#ebbbbb", "#8a1414"],
  },
  {
    name: "text_color",
    label: "Text Color",
    component: "select",
    options: ["white", "black"],
  },
  {
    name: "align",
    label: "Alignment",
    component: "select",
    options: ["center", "left"],
  },
];

export const heroBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <Hero data={data.blocks[index]} />
      <HiddenBlockFields fields={fields} />
    </BlocksControls>
  ),
  template: {
    label: "Hero",
    defaultItem: {
      headline: "Suspended in a Sunbeam",
      subtext: "Dispassionate extraterrestrial observer",
      background_color: "#051e26",
      text_color: "#fffaf4",
      align: "center",
    },
    fields: fields,
  },
};
