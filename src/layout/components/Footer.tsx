import React, { FC } from "react";
import styled from "styled-components";
import { FaTasks } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import Box from "../../primitives/components/Box";

const Container = styled.div`
  min-height: 4rem;
  background-color: ${({ theme }) => theme.colors.eclipse};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  position: fixed;
  left: 0;
  bottom: 0;
`;
const Text = styled.p`
  font-size: 1.25rem;
  line-height: 1.5;
  font-weight: bold;
  color: #fff;
  margin: 0;
`;

type FooterProps = {};

const Footer: FC<FooterProps> = () => {
  return (
    <Container>
      <Box direction="column" margin="0 1rem" alignItems="center">
        <FaTasks size="1.5rem" color="#fff" />
        <Text>Tasks list</Text>
      </Box>
      <Box direction="column" margin="0 1rem" alignItems="center">
        <TiShoppingCart size="1.8rem" color="#fff" />
        <Text>Shopping list</Text>
      </Box>
    </Container>
  );
};

export default Footer;
