import React from "react";
import { BlocksControls, InlineImage } from "react-tinacms-inline";
import styled, { css } from "styled-components";

import { GIT_IMAGES_UPLOAD_DIR } from "../constants";
import { HiddenBlockFields } from "../utils/block-fields";

export const Image = ({ data }) => {
  return (
    <ImageWrapper>
      <InlineImage
        name="image"
        alt={data?.alt ? data.alt : ""}
        focusRing={false}
        parse={(media) => `/images/${media.filename}`}
        uploadDir={() => GIT_IMAGES_UPLOAD_DIR}
        previewSrc={(src) => src}
      />
    </ImageWrapper>
  );
};

export default Image;

const ImageWrapper = styled.div`
  overflow: hidden;
  margin: 50px 0px 50px 0px;
`;

const fields = [
  {
    label: "Image",
    name: "image",
    component: "image",
    parse: (media) => `/images/${media.filename}`,
    uploadDir: () => GIT_IMAGES_UPLOAD_DIR,
    previewSrc: (src) => src,
  },
  {
    name: "alt",
    label: "Image Alt Text",
    component: "text",
  },
];

export const ImageBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <Image data={data.blocks[index]} />
      <HiddenBlockFields fields={fields} />
    </BlocksControls>
  ),
  template: {
    label: "Image",
    defaultItem: {
      _template: "ImageBlock",
      image: "",
      alt: "",
    },
    fields: fields,
  },
};
