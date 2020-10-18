import React from "react";
import { InlineBlocks, InlineForm } from "react-tinacms-inline";

import { useContent } from "../utils/content";
import { useTinaForm } from "../utils/tinaform";

import { heroBlock } from "../components/Hero";
import { imagesBlock } from "../components/Images";
import { paragraphBlock } from "../components/Paragraph";
import { featureListBlock } from "../components/FeatureList";

import { PageLayout } from "../layouts/PageLayout";

export const Page = ({ route, contentPath }) => {
  const content = useContent(contentPath);
  const { data, form } = useTinaForm(content);

  return (
    <>
      {form && data && (
        <InlineForm form={form} initialStatus="active">
          <PageLayout data={data}>
            <InlineBlocks name="blocks" blocks={HOME_BLOCKS} />
          </PageLayout>
        </InlineForm>
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
