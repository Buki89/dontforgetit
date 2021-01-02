import React, { FC } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
`;

type InputProps = {
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const Input: FC<InputProps> = ({ placeholder, onChange, value }) => {
  return (
    <StyledInput
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
