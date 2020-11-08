import { useTinaFormScreenPlugin } from "../utils/tinaform";

export const useFooterFormScreenPlugin = (content) => {
  return useTinaFormScreenPlugin(content, FooterForm);
};

export default useFooterFormScreenPlugin;

const FooterForm = {
  label: "Footer",
  fields: [
    {
      label: "Title",
      name: "title",
      component: "text",
      parse: (value) => value || "",
    },
    {
      label: "Links",
      name: "links",
      component: "group-list",
      itemProps: (item) => ({ label: item.title }),
      defaultItem: {
        title: "Title",
        link: "/path",
      },
      fields: [
        {
          label: "Title",
          name: "title",
          component: "text",
          parse: (value) => value || "",
        },
        {
          label: "Link",
          name: "link",
          component: "text",
          parse: (value) => value || "",
        },
      ],
    },
  ],
};
