import { FieldMeta } from "tinacms";
import styled from "styled-components";
import React, { useEffect, useState } from "react";

const MetaText = styled.div`
  display: block;
  max-width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: var(--tina-font-size-3);
  line-height: 1.35;
  color: var(--tina-color-primary-dark);
`;

const MetaLink = styled.a`
  display: block;
  max-width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: var(--tina-font-size-3);
  line-height: 1.35;
  color: var(--tina-color-primary-dark);
`;

const PipelineStateInfo = () => {
  const [pipelineState, setPipelineState] = useState();

  const fetchPipelineState = () => {
    const token = localStorage.getItem("tinacms-github-token") || null;
    fetch("/api/pipeline", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        if (!response.ok) return { message: response.statusText };
        return response.json();
      })
      .then((result) => setPipelineState(result))
      .catch((err) => setPipelineState({ message: err }));
  };

  useEffect(() => {
    fetchPipelineState();
    const interval = setInterval(() => fetchPipelineState(), 10000);
    return () => clearInterval(interval);
  }, []);

  if (!pipelineState) {
    return (
      <FieldMeta name={"Pipeline"}>
        <MetaText>unknown</MetaText>
      </FieldMeta>
    );
  }

  if (pipelineState.message) {
    return (
      <FieldMeta name={"Pipeline"}>
        <MetaText>{pipelineState.message}</MetaText>
      </FieldMeta>
    );
  }

  return pipelineState.map((actionState, index) => (
    <FieldMeta
      key={"pipeline-action-" + index}
      name={
        "Pipeline [" +
        actionState.stageName +
        "." +
        actionState.actionName +
        "]"
      }
    >
      <MetaLink target="_blank" href={actionState.entityUrl}>
        {actionState.status}
      </MetaLink>
    </FieldMeta>
  ));
};

export const PipelineStateToolbarWidget = {
  __type: "toolbar:widget",
  name: "pipeline-state-info",
  weight: 1,
  component: PipelineStateInfo,
};
