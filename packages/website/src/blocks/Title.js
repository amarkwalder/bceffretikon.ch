import React from "react";
import styled, { css } from "styled-components";
import { BlocksControls, InlineTextarea } from "react-tinacms-inline";
import { HiddenBlockFields } from "../utils/block-fields";

const Title = ({ data }) => {
  const centered = data?.center || false;
  return (
    <>
      <StyledTitle center={centered}>
        <InlineTextarea name="title" />
      </StyledTitle>
      {data?.underline && <Hr center={centered} />}
    </>
  );
};

export default Title;

const StyledTitle = styled.h2`
  font-size: 2.2em;
  line-height: 1.2;
  word-spacing: 1px;
  font-weight: 700;

  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `};
`;

const Hr = styled.hr`
  margin: 2.2rem 0;

  ${(props) =>
    props.center &&
    css`
      margin-left: auto;
      margin-right: auto;
    `};
`;

const fields = [
  { name: "title", label: "Title", component: "text" },
  { name: "center", label: "Center", component: "toggle" },
  { name: "underline", label: "Underline", component: "toggle" },
];

export const TitleBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <Title data={data.blocks[index]} />
      <HiddenBlockFields fields={fields} />
    </BlocksControls>
  ),
  template: {
    label: "Title",
    defaultItem: {
      _template: "TitleBlock",
      title: "",
      center: false,
      underline: true,
    },
    fields: fields,
  },
};
