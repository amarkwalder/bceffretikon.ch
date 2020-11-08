import React from "react";

import { InlineForm } from "react-tinacms-inline";
import { useGithubToolbarPlugins } from "react-tinacms-github";
//import { usePlugin } from "tinacms";
//import { PipelineStateToolbarWidget } from "../plugins/PipelineStatePlugin";

export const InlineGithubForm = ({ form, children }) => {
  // TODO Pipeline Status Plugin
  //usePlugin(PipelineStateToolbarWidget);
  useGithubToolbarPlugins();

  return (
    <>
      <InlineForm form={form}>{children}</InlineForm>
    </>
  );
};
