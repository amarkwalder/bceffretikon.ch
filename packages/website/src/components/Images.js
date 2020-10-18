import React from "react";
import { BlocksControls, InlineImage } from "react-tinacms-inline";
import "../styles/images.css";

/**
 * 1. Define the Block Component
 */
function Images({ data, index }) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div className="wrapper">
        <div className="image-diptych">
          <InlineImage
            name="left.src"
            parse={(media) => `/${media.filename}`}
            uploadDir={() => "/public"}
            previewSrc={(src) => src}
            focusRing={false}
            alt={data.left.alt}
          />
          <InlineImage
            name="right.src"
            parse={(media) => `/${media.filename}`}
            uploadDir={() => "/public"}
            previewSrc={(src) => src}
            focusRing={false}
            alt={data.left.alt}
          />
        </div>
      </div>
    </BlocksControls>
  );
}

/**
 * 2. Define the Block with
 *  the Template and Component
 */
export const imagesBlock = {
  Component: Images,
  template: {
    label: "Image Diptych",
    defaultItem: {
      _template: "images",
      left: {
        src: "/ivan-bandura-unsplash-square.jpg",
        alt: "ocean",
      },
      right: {
        src: "/martin-sanchez-unsplash-square.jpg",
        alt: "dunes",
      },
    },
    fields: [
      {
        name: "left.src",
        label: "Left-Hand Image",
        component: "image",
        parse: (media) => `/${media.filename}`,
        uploadDir: () => "/public",
        previewSrc: (src) => src,
        focusRing: false,
      },
      {
        name: "left.alt",
        label: "Left-Hand Image Alt Text",
        component: "text",
      },
      {
        name: "right.src",
        label: "Right-Hand Image",
        component: "image",
        parse: (media) => `/${media.filename}`,
        uploadDir: () => "/public",
        previewSrc: (src) => src,
        focusRing: false,
      },
      {
        name: "right.alt",
        label: "Right-Hand Image Alt Text",
        component: "text",
      },
    ],
  },
};
