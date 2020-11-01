import React from "react";
import styled, { css } from "styled-components";
import { InlineWysiwyg } from "react-tinacms-editor";
import ReactMarkdown from "react-markdown";
import { BlocksControls } from "react-tinacms-inline";
import { HiddenBlockFields } from "../utils/block-fields";

const preview = process.env.RUNTIME_ENV === "preview";

export const Content = (props) => {
  return preview ? <PreviewContent {...props} /> : <StaticContent {...props} />;
};

export default Content;

const StaticContent = ({ data }) => {
  const center = data?.center || false;
  return (
    <StyledContent center={center}>
      <ReactMarkdown source={data.content} />
    </StyledContent>
  );
};

const PreviewContent = ({ data }) => {
  const center = data?.center || false;
  return (
    <StyledContent center={center}>
      <InlineWysiwyg name="content" format="markdown">
        <ReactMarkdown source={data.content} />
      </InlineWysiwyg>
    </StyledContent>
  );
};

const StyledContent = styled.div`
  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `};
`;

const fields = [{ name: "center", label: "Center", component: "toggle" }];

export const ContentBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <Content data={data.features[index]} />
      <HiddenBlockFields fields={fields} />
    </BlocksControls>
  ),
  template: {
    label: "Content",
    defaultItem: {
      _template: "ContentBlock",
      content: "",
      center: false,
    },
    fields: fields,
  },
};
