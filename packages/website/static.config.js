import path from "path";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

const WEBSITE_PATH = "packages/website/";

const CONTENT_SETTINGS_PATH = "src/content/settings/";
const CONTENT_PAGE_PATH = "src/content/pages/";
const TEMPLATE_PATH = "src/templates/";

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
    return await Promise.all([
      redirect("/", "de"),

      route("404", undefined, "PageNotFound.js"),

      route("de", "home.de.json", "Page.js"),
      route("de/about", "about.de.json", "Page.js"),
      route("de/training", "training.de.json", "Page.js"),
      route("de/interclub", "interclub.de.json", "Page.js"),
      route("de/contact", "contact.de.json", "Page.js"),
      route("de/about", "about.de.json", "Page.js"),
      route("de/404", "404.de.json", "Page.js"),

      route("en", "home.en.json", "Page.js"),
      route("en/about", "about.en.json", "Page.js"),
      route("en/training", "training.en.json", "Page.js"),
      route("en/interclub", "interclub.en.json", "Page.js"),
      route("en/contact", "contact.en.json", "Page.js"),
      route("en/404", "404.en.json", "Page.js"),
    ]);
  },

  devServer: {
    proxy: {
      "/api": "http://localhost:4000",
    },
  },

  plugins: [
    [
      require.resolve("react-static-plugin-source-filesystem"),
      {
        location: path.resolve("./src/pages"),
      },
    ],
    require.resolve("react-static-plugin-reach-router"),
    require.resolve("react-static-plugin-sitemap"),
  ],
};

const redirect = async (path, redirect) => {
  return {
    path: path,
    redirect: redirect,
  };
};

const route = async (path, json, template, children = [], props) => {
  return {
    path: path,
    getData: json
      ? async () => {
          return {
            path: path,
            content: await fetchPage(json),
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
