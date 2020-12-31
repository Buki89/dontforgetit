import React, { FC, useCallback } from "react";
import styled from "styled-components";
import Box from "../../primitives/components/Box";

const NavigationItem = styled.button`
  border: 1px solid grey;
  border-radius: 3px;
  margin: 0 0.5rem;
  padding: 0.125rem 0.5rem;
  &:hover {
    background-color: grey;
  }
`;

type PaginationProps = {
  page: number;
  handleChangePage: (page: string) => void;
};

const Pagination: FC<PaginationProps> = ({ page, handleChangePage }) => {
  const helperArr = () => {
    const arr = [];
    for (let i = 1; i <= page; i++) {
      arr.push(i);
    }
    return arr;
  };

  const changePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
      handleChangePage(event.currentTarget.value),
    [handleChangePage]
  );

  return (
    <Box justifyContent="center">
      {helperArr().map((item: number) => {
        return (
          <NavigationItem type="button" value={item} onClick={changePage}>
            {item}
          </NavigationItem>
        );
      })}
    </Box>
  );
};

export default Pagination;
