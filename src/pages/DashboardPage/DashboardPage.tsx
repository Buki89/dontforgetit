import React, { FC } from "react";
import Header from "../../layout/components/Header";
import Box from "../../primitives/components/Box";
import Dashboard from "../dashboard/Dashboard";

const DashboardPage: FC = () => {
  return (
    <Box direction="column" alignItems="center" justifyContent="center">
      <Header />
      <Dashboard />
    </Box>
  );
};

export default DashboardPage;
