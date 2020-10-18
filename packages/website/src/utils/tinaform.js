import { useGithubToolbarPlugins } from "react-tinacms-github";
import { useForm, useFormScreenPlugin, usePlugin, useCMS } from "tinacms";

export const useTinaForm = (content, formOptions) => {
  const cms = useCMS();

  const formConfig = cms.enabled
    ? {
        loadInitialValues: content.fetchFile,
        onSubmit: (value) => content.commit(value, "TinaCMS update"),
      }
    : {
        initialValues: content.data,
      };

  const [data, form] = useForm({
    ...formConfig,
    ...formOptions,
  });

  usePlugin(form);

  useGithubToolbarPlugins();

  return { content, data, form };
};

export const useTinaFormScreenPlugin = (content, formOptions) => {
  const cms = useCMS();

  const formConfig = cms.enabled
    ? {
        loadInitialValues: content.fetchFile,
        onSubmit: (value) => content.commit(value, "TinaCMS update"),
      }
    : {
        initialValues: content.data,
      };

  const [data, form] = useForm({
    ...formConfig,
    ...formOptions,
  });

  useFormScreenPlugin(form);

  return { content, data, form };
};
