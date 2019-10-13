import React from "react";
import styled from "styled-components";
import { FlexRow } from "./Flex";

const Wrapper = styled(FlexRow)`
  margin-bottom: 15px;
  max-width: 400px;
  width: ${({ inputWidth }) => inputWidth || "100%"};
`;

export const Label = styled.label`
  margin-bottom: 8px;
  margin-left: 4px;
  font-weight: 700;
  color: #444444;
`;

const Input = styled.input`
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  padding: 4px 16px 0;
  height: 45px;
  background-color: #f7f7f7;
  color: #444444;
  font-family: "Lato", sans-serif;
  font-size: 1rem;
  width: 100%;
  padding-right: ${({ unit }) => (unit ? "43px" : "16px")};

  -webkit-box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.08);
  -moz-box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.08);
  box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.08);

  &:focus {
    outline: none;
    border: 1px solid #444444;
  }

  &::-webkit-input-placeholder {
    color: #ccc;
  }

  &:-ms-input-placeholder {
    color: #ccc;
  }

  &::placeholder {
    color: #ccc;
  }
`;

const InputUnitWrapper = styled(FlexRow)`
  flex-flow: row;
  width: 100%;
  position: relative;
`;

const Unit = styled.span`
  right: 16px;
  position: absolute;
`;

export default ({
  label,
  onChange,
  type,
  name,
  value,
  inputWidth,
  unit,
  ...other
}) => (
  <Wrapper inputWidth={inputWidth}>
    <Label>{label}</Label>
    <InputUnitWrapper>
      <Input
        onChange={onChange}
        type={type}
        name={name}
        value={value}
        unit={unit}
        {...other}
      />
      {unit && <Unit>{unit}</Unit>}
    </InputUnitWrapper>
  </Wrapper>
);
