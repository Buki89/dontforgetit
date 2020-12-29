import React, { FC } from "react";
import styled from "styled-components";

const checkboxSize = "2rem";

const StyledCheckbox = styled.input`
  position: relative;
  -webkit-appearance: none;
  border: 0;
  outline: 0;
  width: ${checkboxSize};
  height: ${checkboxSize};
  background: transparent;
  z-index: 0;
  cursor: pointer;

  &:checked:after {
    content: "";
    display: block;
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: -1px;
    left: 3px;
    z-index: 0;
    background: transparent no-repeat;
    background-image: url("/assets/check.svg");
  }

  &:before {
    box-sizing: border-box;

    content: "";
    display: block;
    width: ${checkboxSize};
    height: ${checkboxSize};
    border: 4px solid
      ${({ checked, theme }) =>
        checked ? theme.colors.secondaryGreen : theme.colors.ligthGrey};
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.white};
    position: absolute;
    top: 2px;
    left: 0;
    z-index: 0;
  }
`;

type CheckboxProps = {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <StyledCheckbox type="checkbox" checked={checked} onChange={onChange} />
  );
};
