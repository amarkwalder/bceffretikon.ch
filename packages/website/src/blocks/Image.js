import React from "react";
import { BlocksControls, InlineImage } from "react-tinacms-inline";
import styled from "styled-components";

import { GIT_IMAGES_UPLOAD_DIR } from "../constants";
import { HiddenBlockFields } from "../utils/block-fields";

const preview = process.env.RUNTIME_ENV === "preview";

export const Image = (props) => {
  return preview ? <PreviewImage {...props} /> : <StaticImage {...props} />;
};

export default Image;

export const StaticImage = ({ data }) => {
  return (
    <ImageWrapper>
      {data?.image && <img src={data.image} alt="" />}
    </ImageWrapper>
  );
};

export const PreviewImage = ({ data }) => {
  return (
    <ImageWrapper>
      <InlineImage
        name="image"
        focusRing={false}
        parse={(media) => `/images/${media.filename}`}
        uploadDir={() => GIT_IMAGES_UPLOAD_DIR}
        previewSrc={(src) => src}
      />
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div`
  overflow: hidden;
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
    label: "Image Diptych",
    defaultItem: {
      image: "",
      alt: "",
    },
  },
  fields: fields,
};
