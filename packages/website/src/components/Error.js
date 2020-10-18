import React from "react";

export const Error = ({ title, message }) => {
  return (
    <>
      <h1>{title || "Error"}</h1>
      <p>{"" + message}</p>
    </>
  );
};

export default Error;
