import React from "react";

const MessageAlert = ({ children }) => {
  return (
    <div className="text-center my-4 bg-red-600 font-bold p-3 uppercase">
      {children}
    </div>
  );
};

export default MessageAlert;
