import React, { FC } from "react";
import Overview from "../../core/components/Overview/Overview";
import Content from "../../layout/components/Content";
import Footer from "../../layout/components/Footer";
import Header from "../../layout/components/Header";
import Box from "../../primitives/components/Box";
import Dashboard from "../dashboard/Dashboard";

const DashboardPage: FC = () => {
  return (
    <Box direction="column" alignItems="center" justifyContent="center">
      <Header />
      <Overview completed={0} incompleted={0} overall={0} />
      <Content>
        <Dashboard />
      </Content>
      <Footer />
    </Box>
  );
};

export default DashboardPage;
