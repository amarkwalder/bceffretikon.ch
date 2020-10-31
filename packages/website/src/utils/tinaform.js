import { useCMS, useForm, useFormScreenPlugin, usePlugin } from "tinacms";

import { useGithubFile } from "react-tinacms-github";
import { useFormBrowserCache } from "@tinacms/browser-storage";

const preview = process.env.RUNTIME_ENV === "preview";

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

export const useTinaForm = (content, formOptions = null) => {
  if (!preview)
    throw new Error("Tina CMS forms can only be used in preview mode.");

  const cms = useCMS();

  const { fetchFile, commit } = useGithubFile({
    path: content.path,
    parse: parse,
    serialize: serialize,
  });

  const formConfig = {
    id: content.path,
    initialValues: content.data,
    loadInitialValues: async () => await fetchFile(),
    onSubmit: (value) => commit(value, "TinaCMS update"),
  };

  const [data, form] = useForm({
    ...formConfig,
    ...formOptions,
  });

  useFormBrowserCache(form, cms.enabled);

  usePlugin(form);

  return { content, data, form };
};

export const useTinaFormScreenPlugin = (content, formOptions = null) => {
  if (!preview)
    throw new Error("Tina CMS forms can only be used in preview mode.");

  const { fetchFile, commit } = useGithubFile({
    path: content.path,
    parse: parse,
    serialize: serialize,
  });

  const formConfig = {
    id: content.path,
    loadInitialValues: async () => await fetchFile(),
    onSubmit: (value) => commit(value, "TinaCMS update"),
  };

  const [data, form] = useForm({
    ...formConfig,
    ...formOptions,
  });

  useFormScreenPlugin(form);

  return { content, data, form };
};
