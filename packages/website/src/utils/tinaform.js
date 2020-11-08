import { useEffect, useState } from "react";
import { useForm, useFormScreenPlugin, usePlugin } from "tinacms";
import { useGithubFile } from "react-tinacms-github";
//import { useFormBrowserCache } from "@tinacms/browser-storage";

const preview = process.env.RUNTIME_ENV === "preview";

export const useTinaForm = (content, formOptions = null) => {
  return preview
    ? useTinaFormPreview(content, false, formOptions)
    : useTinaFormStatic(content, false, formOptions);
};

export const useTinaFormScreenPlugin = (content, formOptions = null) => {
  return preview
    ? useTinaFormPreview(content, true, formOptions)
    : useTinaFormStatic(content, true, formOptions);
};

const useTinaFormStatic = (
  content,
  screenPlugin = false,
  formOptions = null
) => {
  const formConfig = {
    id: content.path,
    initialValues: content.data,
  };

  const [data, form] = useForm({
    ...formConfig,
    ...formOptions,
  });

  if (screenPlugin) {
    useFormScreenPlugin(form);
  } else {
    usePlugin(form);
  }

  return [data, form];
};

const useTinaFormPreview = (
  content,
  screenPlugin = false,
  formOptions = null
) => {
  const { fetchFile, commit } = useGithubFile({
    path: content.path,
    parse: parse,
    serialize: serialize,
  });

  const formConfig = {
    id: content.path,
    loadInitialValues: async () => await fetchFile(),
    onSubmit: async (value) => await commit(value, "TinaCMS update"),
  };

  const [data, form] = useForm({
    ...formConfig,
    ...formOptions,
  });

  // TODO Use Browser Cache for Tina Forms
  //useFormBrowserCache(form, cms.enabled);

  if (screenPlugin) {
    useFormScreenPlugin(form);
  } else {
    usePlugin(form);
  }

  const loading = Object.keys(data).length === 0;
  return [loading ? undefined : data, form];
};

const decode = (text) => {
  return decodeURIComponent(
    text
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
};

const parse = (text) => {
  const decoded = decode(text);
  return JSON.parse(decoded);
};

const serialize = (json) => {
  return JSON.stringify(json, null, 2);
};
