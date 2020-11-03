import React from "react";
import { InlineBlocks } from "react-tinacms-inline";

import { useTinaForm } from "../utils/tinaform";

import { Title, TitleBlock } from "../blocks/Title";
import { Content, ContentBlock } from "../blocks/Content";
import { Image, ImageBlock } from "../blocks/Image";
import { Form, FormBlock } from "../blocks/Form";

import { Error } from "../components/Error";

import { PageLayout } from "../layouts/PageLayout";
import { InlineGithubForm } from "../layouts/InlineGithubForm";

import { useRouteData, useSiteData } from "react-static";

import { Paper } from "../components/Style";

const preview = process.env.RUNTIME_ENV === "preview";

export const Page = (props) => {
  return preview ? <PreviewPage {...props} /> : <StaticPage {...props} />;
};

export default Page;

const StaticPage = () => {
  const siteData = useSiteData();
  const site = siteData.site.data;

  const routeData = useRouteData();
  const { content } = routeData;

  return (
    <PageLayout site={site} page={content.data}>
      <Paper>
        {content?.data?.blocks &&
          content.data.blocks.map((block, index) => {
            const props = { key: "block-" + index, data: block };
            switch (block._template) {
              case "TitleBlock":
                return <Title {...props} />;
              case "ContentBlock":
                return <Content {...props} />;
              case "ImageBlock":
                return <Image {...props} />;
              case "FormBlock":
                return <Form {...props} />;
              default:
                return (
                  <Error
                    key={"block-" + index}
                    message={"Unknown block element '" + block._template + "'"}
                  />
                );
            }
          })}
      </Paper>
    </PageLayout>
  );
};

const PreviewPage = () => {
  const siteData = useSiteData();
  const site = siteData.site.data;

  const routeData = useRouteData();
  const { content } = routeData;
  const { data, form } = useTinaForm(content);

  return (
    <>
      {form && data && (
        <InlineGithubForm form={form}>
          <PageLayout site={site} page={data}>
            <Paper>
              <InlineBlocks
                name="blocks"
                blocks={BLOCKS}
                itemProps={{ data: data }}
              />
            </Paper>
          </PageLayout>
        </InlineGithubForm>
      )}
    </>
  );
};

const BLOCKS = {
  ContentBlock,
  FormBlock,
  TitleBlock,
  ImageBlock,
};
