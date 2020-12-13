import React, { FC } from "react";
//import styled from 'styled-components'

type InputProps = {
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const Input: FC<InputProps> = ({ placeholder, onChange, value }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
