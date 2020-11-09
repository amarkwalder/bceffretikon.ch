import React from "react";
import styled, { css } from "styled-components";
import { InlineWysiwyg } from "react-tinacms-editor";
import ReactMarkdown from "react-markdown";
import { BlocksControls } from "react-tinacms-inline";
import { HiddenBlockFields } from "../utils/block-fields";

export const Content = ({ data }) => {
  const center = data?.center || false;
  return (
    <StyledContent center={center}>
      <InlineWysiwyg name="content" format="markdown">
        <ReactMarkdown source={data.content} />
      </InlineWysiwyg>
    </StyledContent>
  );
};

export default Content;

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
      <Content data={data.blocks[index]} />
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
