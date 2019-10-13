import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const primaryStyle = css`
  cursor: pointer;
  display: flex;
  justify-content: center;

  max-width: 400px;
  color: #444444;
  font-family: "Lato", sans-serif;
  font-size: 1.2rem;
  padding: 16px 12px 12px;
  background-color: #ffd873;
  border-radius: 16px;
  font-weight: 700;
  border: 0;

  &:disabled {
    opacity: 0.3;
    cursor: initial;
  }
  &:hover {
    opacity: 0.8;
  }
  &:disabled:hover {
    opacity: 0.3;
  }
`;

export const PrimaryButton = styled.button`
  ${primaryStyle};
  width: 100%;
`;

export const SecondaryButton = styled(PrimaryButton)``;

export const PrimaryLink = styled(Link)`
  ${primaryStyle};
  text-decoration: none;
`;
