import React from "react";

export const Loading = ({ message = null }) => {
  return <p>Loading{message && ": " + message.toString()}...</p>;
};

export default Loading;
