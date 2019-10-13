import React from "react";
import styled from "styled-components";
import { Label } from "./Input";
import { FlexColumn } from "./Flex";

const StyledSelect = styled.select`
  display: block;
  font-size: 16px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  color: #444444;
  line-height: 1.3;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 16px;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: linear-gradient(45deg, transparent 50%, #444444 50%),
    linear-gradient(135deg, #444444 50%, transparent 50%),
    radial-gradient(#f7f7f7 70%, transparent 72%);
  /* background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 0.5em) 0.5em; */
  background-position: calc(100% - 20px) calc(1em + 8px),
    calc(100% - 15px) calc(1em + 8px), calc(100% - 0.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1.5em 1.5em;
  background-repeat: no-repeat;

  border-radius: 8px;
  border: 1px solid #e6e6e6;
  background-color: #f7f7f7;
  -webkit-box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.08);
  -moz-box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.08);
  box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.08);

  &::-ms-expand {
    display: none;
  }

  &:hover {
    border-color: #888;
  }

  &:focus {
    outline: none;
    border: 1px solid #444444;
  }
`;

const Wrapper = styled(FlexColumn)`
  margin-bottom: 15px;
  max-width: 400px;
  width: ${({ inputWidth }) => inputWidth || "100%"};
`;

const StyledOption = styled.option`
  font-weight: normal;
`;

function Select({ options, value, onChange, label }) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <StyledSelect value={value} onChange={onChange}>
        {options &&
          options.map((option, i) => (
            <StyledOption value={option.value} key={i}>
              {option.name}
            </StyledOption>
          ))}
      </StyledSelect>
    </Wrapper>
  );
}

export default Select;
