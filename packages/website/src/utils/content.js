import { useEffect, useState } from "react";
import { useGithubFile } from "react-tinacms-github";
import { useCMS } from "tinacms";
import { GIT_CONTENT_ROOT } from "../constants";

export const useContent = (
  path,
  prefetch = false,
  skipLoadingState = false
) => {
  const cms = useCMS();

  const { fetchFile, commit } = useGithubFile({
    path: GIT_CONTENT_ROOT + path,
    parse: JSON.parse,
    serialize: JSON.stringify,
  });

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(
    cms.enabled && !skipLoadingState && prefetch
  );

  useEffect(() => {
    if (cms.enabled && prefetch) {
      if (!skipLoadingState) setLoading(true);
      fetchFile()
        .then((data) => setData(data))
        .catch((error) => setError(error))
        .finally(() => {
          if (skipLoadingState) return;
          setLoading(false);
        });
    }
  }, [cms.enabled, fetchFile, path, prefetch, skipLoadingState]);

  if (cms.disabled) {
    return {
      data: require("../" + path),
      error: undefined,
      loading: false,
      fetchFile: undefined,
      commit: undefined,
    };
  }

  return { data, error, loading, fetchFile, commit };
};
