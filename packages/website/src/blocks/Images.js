import React from "react";
import { BlocksControls, InlineImage } from "react-tinacms-inline";
import { HiddenBlockFields } from "../utils/block-fields";

import "../styles/images.css";

const preview = process.env.RUNTIME_ENV === "preview";

export const Images = ({ data }) => {
  const { left, right } = data;
  return (
    <div className="wrapper">
      <div className="image-diptych">
        <Image
          name="left.src"
          parse={(media) => `/${media.filename}`}
          uploadDir={() => "/public"}
          previewSrc={(src) => src}
          focusRing={false}
          src={left.src}
          alt={left.alt}
        />
        <Image
          name="right.src"
          parse={(media) => `/${media.filename}`}
          uploadDir={() => "/public"}
          previewSrc={(src) => src}
          focusRing={false}
          src={right.src}
          alt={right.alt}
        />
      </div>
    </div>
  );
};

export default Images;

const Image = ({ src, alt, ...props }) => {
  if (preview) return <InlineImage {...props} />;
  return <img src={src} alt={alt} />;
};

const fields = [
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
];

export const ImagesBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <Images data={data.blocks[index]} />
      <HiddenBlockFields fields={fields} />
    </BlocksControls>
  ),
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
    fields: fields,
  },
};
