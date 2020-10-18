import { useContent } from "../utils/content";
import { useTinaFormScreenPlugin } from "../utils/tinaform";

export const useTranslationsFormScreenPlugin = () => {
  const content = useContent("content/settings/translations.json");
  const result = useTinaFormScreenPlugin(content, TranslationsForm);
  return { translations: result.data, ...result };
};

export default useTranslationsFormScreenPlugin;

export const TranslationsForm = {
  label: "Translations",
  fields: [
    {
      label: "Default Language",
      name: "defaultLanguage",
      component: "text",
    },
    {
      label: "Available Languages",
      name: "availableLanguages",
      component: "list",
      defaultItem: "",
      field: {
        component: "text",
      },
    },
    {
      label: "Translations",
      name: "translations",
      component: "group-list",
      itemProps: (item) => ({ label: item.code }),
      defaultItem: {
        code: "CODE",
      },
      fields: [
        {
          label: "Code",
          name: "code",
          component: "text",
        },
        {
          label: "Translation",
          name: "translation",
          component: "group-list",
          itemProps: (item) => ({
            label: item.text + " (" + item.language + ")",
          }),
          defaultItem: {
            text: "Text to translate",
            language: "de",
          },
          fields: [
            {
              label: "Text",
              name: "text",
              component: "text",
            },
            {
              label: "Language",
              name: "language",
              component: "select",
              options: ["de", "en", "fr", "it"],
            },
          ],
        },
      ],
    },
  ],
};
