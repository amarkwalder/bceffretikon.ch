import React from "react";

import { useRouteData, useSiteData } from "react-static";
import { useTinaForm } from "../utils/tinaform";

import { InlineBlocks } from "react-tinacms-inline";
import { TitleBlock } from "../blocks/Title";
import { ContentBlock } from "../blocks/Content";
import { ImageBlock } from "../blocks/Image";
import { FormBlock } from "../blocks/Form";
import { FeatureListBlock } from "../blocks/FeatureList";

import { Loading } from "../components/Loading";
import { PageLayout } from "../layouts/PageLayout";
import { InlineGithubForm } from "../layouts/InlineGithubForm";

import { Paper } from "../components/Style";

export const Page = () => {
  const siteData = useSiteData();
  const site = siteData.site.data;

  const routeData = useRouteData();
  const { content } = routeData;

  const [data, form] = useTinaForm(content);

  if (!data) {
    return <Loading message="Form Data" />;
  }

  return (
    <InlineGithubForm form={form}>
      <PageLayout site={site} page={data}>
        <Paper>
          <InlineBlocks name="blocks" blocks={BLOCKS} itemProps={{ data }} />
        </Paper>
      </PageLayout>
    </InlineGithubForm>
  );
};

export default Page;

const BLOCKS = {
  ContentBlock,
  FormBlock,
  TitleBlock,
  ImageBlock,
  FeatureListBlock,
};
