import React from "react";
import { InlineTextarea, BlocksControls } from "react-tinacms-inline";
import { HiddenBlockFields } from "../utils/block-fields";

import "../styles/hero.css";

/**
 * 1. Define the style props
 */
export function Hero({ text_color, background_color, align }) {
  /**
   * 2. Add dynamic inline styles on the 'hero' div
   */
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
          <InlineTextarea name="headline" focusRing={false} />
        </h1>
        <p>
          <InlineTextarea name="subtext" focusRing={false} />
        </p>
      </div>
    </div>
  );
}

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
      <Hero {...data} />
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
