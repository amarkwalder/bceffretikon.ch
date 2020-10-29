import React from "react";
import { InlineBlocks } from "react-tinacms-inline";

//import { useContent } from "../utils/content";
import { useTinaForm } from "../utils/tinaform";

import { Hero, heroBlock } from "../components/Hero";
import { Images, imagesBlock } from "../components/Images";
import { Paragraph, paragraphBlock } from "../components/Paragraph";
import { FeatureList, featureListBlock } from "../components/FeatureList";

import { Error } from "../components/Error";

import { PageLayout } from "../layouts/PageLayout";
import { InlineGithubForm } from "../layouts/InlineGithubForm";

import { useRouteData } from "react-static";
import { Redirect, useMatch } from "@reach/router";

const preview = process.env.RUNTIME_ENV === "preview";

export const Page = (props) => {
  return preview ? <PreviewPage {...props} /> : <StaticPage {...props} />;
};

export default Page;

const StaticPage = () => {
  const routeData = useRouteData();
  const { content } = routeData;

  return (
    <PageLayout data={content.data}>
      {content?.data?.blocks &&
        content.data.blocks.map((block, index) => {
          const props = { key: "block-" + index, data: block };
          switch (block._template) {
            case "hero":
              return <Hero {...props} />;
            case "images":
              return <Images {...props} />;
            case "paragraph":
              return <Paragraph {...props} />;
            case "features":
              return <FeatureList {...props} />;
            default:
              return (
                <Error
                  key={"block-" + index}
                  message={"Unknown block element '" + block._template + "'"}
                />
              );
          }
        })}
    </PageLayout>
  );
};

const PreviewPage = () => {
  //const content = useContent(contentPath);

  const routeData = useRouteData();

  const { content } = routeData;
  const { data, form } = useTinaForm(content, null);

  return (
    <>
      {form && data && (
        <InlineGithubForm form={form}>
          <PageLayout data={data}>
            <InlineBlocks
              name="blocks"
              blocks={HOME_BLOCKS}
              itemProps={{ data: content.data }}
            />
          </PageLayout>
        </InlineGithubForm>
      )}
    </>
  );
};

const HOME_BLOCKS = {
  hero: heroBlock,
  images: imagesBlock,
  paragraph: paragraphBlock,
  features: featureListBlock,
};
