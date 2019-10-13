import React from "react";
import styled from "styled-components";
import { FlexRow } from "./Flex";

const ProgressWrapper = styled(FlexRow)`
  align-items: flex-end;
`;

const HorizontalPercentage = styled.div`
  width: ${({ progress }) => `${progress}%`};
  min-width: 1%;
  max-width: 100%;
  text-align: right;
  font-size: 14px;
  margin-bottom: 4px;
`;

const VerticalPercentage = styled.div`
  margin-bottom: ${({ progress }) =>
    progress > 100 ? "90px" : `${progress - 10}px`};
  text-align: right;
  font-size: 14px;
  -webkit-transition: width 1.5s ease-in-out;
  transition: width 1.5s ease-in-out;
  margin-right: 4px;
`;

const HorizontalBorder = styled.div`
  background-color: #eeeeee;
  border-radius: 16px;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "initial")};
`;

const HorizontalFilled = styled.div`
  height: 8px;
  min-width: 2%;
  width: ${({ progress }) => `${progress}%`};
  max-width: 100%;
  background-color: ${({ color }) => `${color}`};
  border-radius: 16px;
  -webkit-transition: width 1.5s ease-in-out;
  transition: width 1.5s ease-in-out;
`;

const VerticalBorder = styled.div`
  height: 100px;
  border: 1px solid #ccc;
  padding: 3px;
  background-color: white;
  border-radius: 16px;
  width: 4px;
  display: flex;
  align-items: flex-end;
`;

const VerticalFilled = styled.div`
  width: 100%;
  min-height: 2%;
  height: ${({ progress }) => `${progress}%`};
  /* height: ${({ progress }) => `50%`}; */
  max-height: 100%;
  background-color:  ${({ color }) => `${color}`};
  border-radius: 16px;
`;

function ProgressBar({ progress, vertical = false, fullWidth = false }) {
  const color =
    progress > 75 ? "#689f38cf" : progress > 45 ? "#fb8c00a6" : "#e53935ba";

  return (
    <>
      {vertical ? (
        <ProgressWrapper>
          <VerticalPercentage
            progress={progress}
          >{`${progress}%`}</VerticalPercentage>
          <VerticalBorder>
            <VerticalFilled color={color} progress={progress} />
          </VerticalBorder>
        </ProgressWrapper>
      ) : (
        <>
          <HorizontalPercentage
            progress={progress}
          >{`${progress}%`}</HorizontalPercentage>
          <HorizontalBorder fullWidth={fullWidth}>
            <HorizontalFilled color={color} progress={progress} />
          </HorizontalBorder>
        </>
      )}
    </>
  );
}

export default ProgressBar;
