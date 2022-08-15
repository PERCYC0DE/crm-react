import React from "react";

const MessageAlert = ({ children }) => {
  return (
    <div className="text-center my-2 bg-red-600 p-2 text-white">{children}</div>
  );
};

export default MessageAlert;
