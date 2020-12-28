import React, { FC } from "react";
import Overview from "../../layout/components/Overview";
import Content from "../../layout/components/Content";
import Header from "../../layout/components/Header";
import Box from "../../primitives/components/Box";
import Dashboard from "../dashboard/Dashboard";

const DashboardPage: FC = () => {
  return (
    <Box direction="column" alignItems="center" justifyContent="center">
      <Header />
      <Overview />
      <Content>
        <Dashboard />
      </Content>
      {/* <Footer /> */}
    </Box>
  );
};

export default DashboardPage;
