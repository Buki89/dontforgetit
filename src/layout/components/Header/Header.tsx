import React, { FC } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { Box } from "../../../inputs";

const Day = styled.p`
  font-size: 2.5rem;
  line-height: 0.8;
  font-weight: bold;
  margin-right: 0.125rem;
`;

const Header: FC = () => {
  const day = format(new Date(), "iiii");
  const month = format(new Date(), "MMM");
  const dayOfTheMonth = format(new Date(), "d");
  const year = format(new Date(), "u");

  return (
    <Box justifyContent="space-between">
      <div>
        <Box alignItems="center">
          <Day>{dayOfTheMonth}</Day>
          <Box direction="column">
            <p>{month}</p>
            <p>{year}</p>
          </Box>
        </Box>
      </div>
      <p>{day}</p>
    </Box>
  );
};

export default Header;
