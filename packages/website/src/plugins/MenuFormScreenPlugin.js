import { useTinaFormScreenPlugin } from "../utils/tinaform";

export const useMenuFormScreenPlugin = (content) => {
  return useTinaFormScreenPlugin(content, MenuForm);
};

export default useMenuFormScreenPlugin;

const MenuForm = {
  label: "Menu",
  fields: [
    {
      label: "Main Menu",
      name: "menuItems",
      component: "group-list",
      itemProps: (item) => ({ label: item.title }),
      defaultItem: {
        title: "Menu Item",
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
