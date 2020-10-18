import { useContent } from "../utils/content";
import { useTinaFormScreenPlugin } from "../utils/tinaform";

export const useThemeFormScreenPlugin = () => {
  const content = useContent("content/settings/theme.json");
  const result = useTinaFormScreenPlugin(content, ThemeForm);
  return { theme: result.data, ...result };
};

export default useThemeFormScreenPlugin;

const ThemeForm = {
  label: "Theme",
  fields: [
    {
      label: "Color",
      name: "color",
      component: "group",
      fields: [
        {
          label: "Black",
          name: "black",
          component: "color",
          colorFormat: "hex",
        },
        {
          label: "White",
          name: "white",
          component: "color",
          colorFormat: "hex",
        },
        {
          label: "Primary",
          name: "primary",
          component: "color",
          colorFormat: "hex",
        },
        {
          label: "Secondary",
          name: "secondary",
          component: "color",
          colorFormat: "hex",
        },
      ],
    },
    {
      label: "Header",
      name: "header",
      component: "group",
      fields: [
        {
          label: "Overline",
          name: "overline",
          component: "toggle",
          parse: (value) => value || false,
        },
        {
          label: "Underline",
          name: "underline",
          component: "toggle",
          parse: (value) => value || false,
        },
        {
          label: "Transparent",
          name: "transparent",
          component: "toggle",
          parse: (value) => value || false,
        },
        {
          label: "Height",
          name: "height",
          component: "text",
          parse: (value) => value || "",
        },
      ],
    },
    {
      label: "Menu",
      name: "menu",
      component: "group",
      fields: [
        {
          label: "Style",
          description: "Options are 'pill' and 'glow'",
          name: "style",
          component: "text",
          parse: (value) => value || "",
        },
      ],
    },
    {
      label: "Hero",
      name: "hero",
      component: "group",
      fields: [
        {
          label: "Default Image",
          name: "image",
          component: "text",
          parse: (value) => value || "",
        },
        {
          label: "Overlay",
          name: "overlay",
          component: "toggle",
          parse: (value) => value || false,
        },
        {
          label: "Large",
          name: "large",
          component: "toggle",
          parse: (value) => value || false,
        },
        {
          label: "Overlap",
          name: "overlap",
          component: "text",
          parse: (value) => value || "",
        },
        {
          label: "Parallax",
          name: "parallax",
          component: "toggle",
          parse: (value) => value || false,
        },
      ],
    },
    {
      label: "Typography",
      name: "typography",
      component: "group",
      fields: [
        {
          label: "Uppercase H2",
          name: "uppercaseH2",
          component: "toggle",
          parse: (value) => value || false,
        },
      ],
    },
  ],
};
