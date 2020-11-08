export const removeTrailingSlash = (path) =>
  path === `/` ? path : path.replace(/\/$/, ``);

export const removeSuffixSlash = (path) =>
  !path.startsWith("/") ? path : path.substring(1);
