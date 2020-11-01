import React from "react";
import { InlineBlocks } from "react-tinacms-inline";

import { useTinaForm } from "../utils/tinaform";

// import { Images, ImagesBlock } from "../blocks/Images";
// import { Paragraph, ParagraphBlock } from "../blocks/Paragraph";
// import { FeatureList, FeatureListBlock } from "../blocks/FeatureList";
import { Content, ContentBlock } from "../blocks/Content";

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
              // case "images":
              //   return <Images {...props} />;
              // case "paragraph":
              //   return <Paragraph {...props} />;
              // case "features":
              //   return <FeatureList {...props} />;

              case "ContentBlock":
                return <Content {...props} />;
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
                blocks={HOME_BLOCKS}
                itemProps={{ data: data }}
              />
            </Paper>
          </PageLayout>
        </InlineGithubForm>
      )}
    </>
  );
};

const HOME_BLOCKS = {
  ContentBlock,
  // images: ImagesBlock,
  // paragraph: ParagraphBlock,
  // features: FeatureListBlock,
};
