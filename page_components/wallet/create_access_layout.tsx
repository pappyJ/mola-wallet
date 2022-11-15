import Container from "page_components/wallet/create_access_container";
import { ReactNode } from "react";
import Layout from "../../components/layouts";
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
