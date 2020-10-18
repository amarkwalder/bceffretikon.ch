import { useContent } from "../utils/content";
import { useTinaFormScreenPlugin } from "../utils/tinaform";

export const useFooterFormScreenPlugin = () => {
  const content = useContent("content/settings/footer.json");
  const result = useTinaFormScreenPlugin(content, FooterForm);
  return { footer: result.data, ...result };
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
