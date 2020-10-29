//import { useContent } from "../utils/content";
import { useTinaFormScreenPlugin } from "../utils/tinaform";

export const useSiteFormScreenPlugin = (content) => {
  //const content = useContent("content/settings/site.json");
  const result = useTinaFormScreenPlugin(content, SiteForm);
  return { site: result.data, ...result };
};

export default useSiteFormScreenPlugin;

const SiteForm = {
  label: "Site",
  fields: [
    {
      label: "Image",
      name: "logo",
      component: "image",
      parse: (filename) => `/images/${filename}`,
      uploadDir: () => `/public/images`,
      previewSrc: (src) => src,
    },
    {
      label: "Title",
      name: "title",
      component: "text",
      parse: (value) => value || "",
    },
    {
      label: "Description",
      name: "description",
      component: "text",
      parse: (value) => value || "",
    },
    {
      label: "Author",
      name: "author",
      component: "text",
      parse: (value) => value || "",
    },
  ],
};
