import { Container } from "page_components/wallet/create-access";
import { ReactNode } from "react";
import Layout from ".";
import { NextPageXLayout } from "types/next";

const WalletCreateAccessLayout: NextPageXLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <Layout>
      <Container>{children}</Container>
    </Layout>
  );
};

export default WalletCreateAccessLayout;
