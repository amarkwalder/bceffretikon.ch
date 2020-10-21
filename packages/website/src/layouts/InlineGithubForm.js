import React from "react";
import { InlineForm } from "react-tinacms-inline";
import { useGithubToolbarPlugins } from "react-tinacms-github";
import { useCMS, usePlugin } from "tinacms";
import { useFormBrowserCache } from "@tinacms/browser-storage";
import { PipelineStateToolbarWidget } from "../plugins/PipelineStatePlugin";

export const InlineGithubForm = ({ form, children }) => {
  const cms = useCMS();

  usePlugin(PipelineStateToolbarWidget);
  useGithubToolbarPlugins();

  useFormBrowserCache(form, cms.enabled);

  return (
    <>
      <InlineForm form={form}>{children}</InlineForm>
    </>
  );
};
