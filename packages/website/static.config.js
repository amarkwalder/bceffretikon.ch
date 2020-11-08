import path from "path";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

const WEBSITE_PATH = "packages/website/";

const CONTENT_SETTINGS_PATH = "src/content/settings/";
const CONTENT_PAGE_PATH = "src/content/pages/";
const TEMPLATE_PATH = "src/templates/";

const preview = process.env.RUNTIME_ENV === "preview";

export default {
  getSiteData: async () => {
    return await Promise.all([
      fetchFooterSettings(),
      fetchMenuSettings(),
      fetchSiteSettings(),
      fetchThemeSettings(),
      fetchTranslationsSettings(),
    ]).then((data) => data.reduce((result, data) => ({ ...result, ...data })));
  },

  getRoutes: async ({ dev }) => {
    const result = [];

    result.push(redirect("/", "/de"));
    result.push(routeWithData("404", undefined, "PageNotFound.js"));

    if (preview)
      result.push(
        routeWithData("/github/authorizing", undefined, "Authorizing.js")
      );

    const createRoute = async (page) =>
      await fetchPage(page)
        .then((content) => routeWithData(content.data.path, content, "Page.js"))
        .catch((err) => console.error(err));

    const routes = await fetchPageList(CONTENT_PAGE_PATH)
      .then((pages) => pages.map((page) => createRoute(page)))
      .catch((err) => console.error(err));
    result.push(...routes);

    return await Promise.all(result);
  },

  devServer: {
    proxy: {
      "/api": "http://localhost:4000",
    },
  },

  maxThreads: 8,

  plugins: [
    [
      require.resolve("react-static-plugin-source-filesystem"),
      {
        location: path.resolve("./src/pages"),
      },
    ],
    require.resolve("react-static-plugin-reach-router"),
    require.resolve("react-static-plugin-sitemap"),
    require.resolve("react-static-plugin-styled-components"),
  ],
};

const redirect = async (path, redirect) => {
  return {
    path: path,
    redirect: redirect,
  };
};

const routeWithFile = async (path, file, template, children = [], props) => {
  return {
    path: path,
    getData: file
      ? async () => {
          const page = await fetchPage(file);
          return {
            ...page,
            ...props,
          };
        }
      : undefined,
    template: TEMPLATE_PATH + template,
    children: await Promise.all(children),
  };
};

const routeWithData = async (path, data, template, children = [], props) => {
  return {
    path: path,
    getData: data
      ? async () => {
          return {
            path: path,
            content: data,
            ...props,
          };
        }
      : undefined,
    template: TEMPLATE_PATH + template,
    children: await Promise.all(children),
  };
};

const fetchPage = async (file) => {
  return {
    path: WEBSITE_PATH + CONTENT_PAGE_PATH + file,
    data: await fetch(CONTENT_PAGE_PATH, file),
  };
};

const fetchFooterSettings = async () => {
  return {
    footer: await fetchSettings("footer.json"),
  };
};

const fetchMenuSettings = async () => {
  return {
    menu: await fetchSettings("menu.json"),
  };
};

const fetchRoutesSettings = async () => {
  return {
    routes: await fetchSettings("routes.json"),
  };
};

const fetchSiteSettings = async () => {
  return {
    site: await fetchSettings("site.json"),
  };
};

const fetchThemeSettings = async () => {
  return {
    theme: await fetchSettings("theme.json"),
  };
};

const fetchTranslationsSettings = async () => {
  return {
    translations: await fetchSettings("translations.json"),
  };
};

const fetchSettings = async (file) => {
  return {
    path: WEBSITE_PATH + CONTENT_SETTINGS_PATH + file,
    data: await fetch(CONTENT_SETTINGS_PATH, file),
  };
};

const fetch = async (prefix, file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(prefix + file, "utf-8", (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data.toString()));
    });
  });
};

const fetchPageList = async (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};
