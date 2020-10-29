//import { useCallback, useEffect } from "react";
import { useForm, useFormScreenPlugin, usePlugin } from "tinacms";
//import get from "lodash.get";

import { useGithubFile } from "react-tinacms-github";

const preview = process.env.RUNTIME_ENV === "preview";

export const useTinaForm = (content, formOptions) => {
  if (!preview)
    throw new Error("Tina CMS forms can only be used in preview mode.");

  const { fetchFile, commit } = useGithubFile({
    path: content.path,
    parse: JSON.parse,
    serialize: JSON.stringify,
  });

  const formConfig = {
    id: content.path,
    loadInitialValues: fetchFile,
    onSubmit: (value) => commit(value, "TinaCMS update"),
  };

  const [data, form] = useForm({
    ...formConfig,
    ...formOptions,
  });

  //useFormBrowserCache(form, cms.enabled);

  usePlugin(form);

  return { content, data, form };
};

export const useTinaFormScreenPlugin = (content, formOptions) => {
  if (!preview)
    throw new Error("Tina CMS forms can only be used in preview mode.");

  const { fetchFile, commit } = useGithubFile({
    path: content.path,
    parse: JSON.parse,
    serialize: JSON.stringify,
  });

  const formConfig = {
    id: content.path,
    loadInitialValues: fetchFile,
    onSubmit: (value) => commit(value, "TinaCMS update"),
  };

  const [data, form] = useForm({
    ...formConfig,
    ...formOptions,
  });

  useFormScreenPlugin(form);

  return { content, data, form };
};

// const useFormBrowserCache = (form, editing) => {
//   const cms = useCMS();

//   const saveToStorage = useCallback(
//     (_formData) => {
//       cms.api.storage.save(form.id, _formData.values); //getFlattenedFormValues(form));
//     },
//     [cms.api.storage, form]
//   );

//   // save to storage on change
//   useWatchFormValues(form, saveToStorage);

//   // load from storage on boot
//   useEffect(() => {
//     if (!editing) return;

//     const values = cms.api.storage.load(form.id);
//     if (values) {
//       form.updateValues(values);
//     }
//   }, [form, editing, cms.api.storage]);
// };

// const getFlattenedFormValues = (form) => {
//   const flatData = {};
//   const values = form.values;
//   form.finalForm.getRegisteredFields().forEach((field) => {
//     const data = get(values, field);
//     if (typeof data === "object") return;
//     flatData[field] = data;
//   });
//   return flatData;
// };
