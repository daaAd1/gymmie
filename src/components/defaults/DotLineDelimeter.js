import React from "react";
import styled from "styled-components";
import { FlexColumn } from "./Flex";

const WeekDelimeter = styled(FlexColumn)`
  align-items: center;
`;

const TopDot = styled.div`
  width: 20px;
  height: 10px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-top: 0;
  background-color: white;
  margin-top: -8px;
  z-index: 5;
`;

const BottomDot = styled.div`
  width: 20px;
  height: 10px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-bottom: 0;
  background-color: white;
  margin-bottom: -8px;
  z-index: 5;
`;

const Line = styled.div`
  width: 2px;
  height: ${({ last }) => (last ? "48px" : "16px")};
  background-color: #ccc9;
`;

function DotLineDelimeter({ last }) {
  return (
    <WeekDelimeter>
      <TopDot />
      <Line last={last} />
      <BottomDot />
    </WeekDelimeter>
  );
}

export default DotLineDelimeter;
