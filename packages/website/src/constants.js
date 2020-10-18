export const CSRF_TOKEN_KEY = "csrf_token";
export const WORKING_REPO_KEY = "working_repo_full_name";
export const HEAD_BRANCH_KEY = "head_branch";

export const GIT_CONTENT_ROOT = "packages/website/src/";

const env = process.env;

export const GITHUB_CLIENT_ID = env.REACT_APP_GITHUB_CLIENT_ID;
export const GITHUB_SOURCE_REPO_OWNER = env.REACT_APP_GITHUB_SOURCE_REPO_OWNER;
export const GITHUB_SOURCE_REPO_NAME = env.REACT_APP_GITHUB_SOURCE_REPO_NAME;
