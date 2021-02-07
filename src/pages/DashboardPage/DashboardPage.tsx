import React, { FC } from "react";
import Content from "../../layout/components/Content";
import { Dashboard } from "../../components";
import { Box } from "../../inputs";

const DashboardPage: FC = () => {
  return (
    <Box direction="column" alignItems="center" justifyContent="center">
      {/* <Header />
      <Overview /> */}
      <Content>
        <Dashboard />
      </Content>
      {/* <Footer /> */}
    </Box>
  );
};

export default DashboardPage;
