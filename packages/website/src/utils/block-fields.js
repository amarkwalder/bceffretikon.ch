import React from "react";
import { InlineField } from "react-tinacms-inline";
import { useCMS } from "tinacms";

const InlineHidden = ({ name }) => {
  const cms = useCMS();
  return (
    <InlineField name={name}>
      {({ input }) => {
        if (cms.enabled) {
          return <input type="hidden" {...input} />;
        }
        return <></>;
      }}
    </InlineField>
  );
};

export const HiddenBlockFieldTemplate = () => <InlineHidden name="_template" />;

export const HiddenModalBlockFields = ({ fields }) => {
  if (!fields) return null;
  return fields.map((field, index) => (
    <InlineHidden key={field.name + "-" + index} name={field.name} />
  ));
};

export const HiddenBlockFields = ({ fields }) => {
  return (
    <>
      <HiddenBlockFieldTemplate />
      <HiddenModalBlockFields fields={fields} />
    </>
  );
};
