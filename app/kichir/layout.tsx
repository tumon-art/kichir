import React from "react";

const kichir = async ({ children }: { children: React.ReactNode }) => {
  return <main className="mainRow">{children}</main>;
};

export default kichir;
