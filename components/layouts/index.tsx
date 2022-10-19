import Header from "components/headers";
import Footer from "components/footers";
import React from "react";
import { NextPageX } from "types/next";

const Layout: NextPageX["Layout"] = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
