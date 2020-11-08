import { useTinaFormScreenPlugin } from "../utils/tinaform";
import { GIT_IMAGES_UPLOAD_DIR } from "../constants";

export const useSiteFormScreenPlugin = (content) => {
  return useTinaFormScreenPlugin(content, SiteForm);
};

export default useSiteFormScreenPlugin;

const SiteForm = {
  label: "Site",
  fields: [
    {
      label: "Image",
      name: "logo",
      component: "image",
      parse: (media) => `/images/${media.filename}`,
      uploadDir: () => GIT_IMAGES_UPLOAD_DIR,
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
