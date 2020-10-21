import React from "react";
import { InlineBlocks } from "react-tinacms-inline";

import { useContent } from "../utils/content";
import { useTinaForm } from "../utils/tinaform";

import { heroBlock } from "../components/Hero";
import { imagesBlock } from "../components/Images";
import { paragraphBlock } from "../components/Paragraph";
import { featureListBlock } from "../components/FeatureList";

import { PageLayout } from "../layouts/PageLayout";
import { InlineGithubForm } from "../layouts/InlineGithubForm";

export const Page = ({ contentPath }) => {
  const content = useContent(contentPath);
  const { data, form } = useTinaForm(contentPath, content, null);
  return (
    <>
      {form && data && (
        <InlineGithubForm form={form}>
          <PageLayout data={data}>
            <InlineBlocks name="blocks" blocks={HOME_BLOCKS} />
          </PageLayout>
        </InlineGithubForm>
      )}
    </>
  );
};

export default Page;

const HOME_BLOCKS = {
  hero: heroBlock,
  images: imagesBlock,
  paragraph: paragraphBlock,
  features: featureListBlock,
};
