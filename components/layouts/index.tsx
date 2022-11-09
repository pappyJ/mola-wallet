import Header from "components/headers";
import Footer from "components/footers";
import React from "react";
import { NextPageXLayout } from "types/next";

const Layout: NextPageXLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
