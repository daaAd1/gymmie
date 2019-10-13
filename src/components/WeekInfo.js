import React from "react";
import { FlexColumn, FlexRow } from "./defaults/Flex";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Text } from "./defaults/Text";
import { formatDate } from "../utils";

const Wrapper = styled(Link)`
  position: relative;
  display: flex;
  flex-flow: column;
  max-width: 400px;
  opacity: ${({ ishidden }) => (ishidden ? 0.5 : 1)};
  margin-bottom: 16px;
  padding: 24px 16px 16px;
  border-radius: 8px;
  border: 0;
  background-color: ${({ color }) => color};
  /* #17B0CE */
  /* -webkit-box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  -moz-box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2); */
`;

const WeekProgress = styled.div`
  left: 0;
  border-top-left-radius: 8px;
  position: absolute;
  height: 6px;
  top: 1px;
  min-width: 2%;
  max-width: 100%;
  width: ${({ progress }) => `${progress}%`};
  background-color: ${({ color }) => `${color}`};
  border-top-right-radius: ${({ progress }) => (progress > 99 ? "8px" : 0)};
`;

const NamePercentageWrapper = styled(FlexRow)`
  justify-content: center;
`;

const Name = styled(Text)`
  font-weight: 700;
  margin-bottom: 8px;
  font-family: "Rubik", sans-serif;
  font-size: 24px;
  margin-bottom: 16px;
`;

const ProgressPercentage = styled(Text)`
  font-weight: 700;
  color: ${({ color }) => `${color}`};
`;

const WeekInfoRow = styled(FlexRow)`
  justify-content: space-between;
  align-items: center;
`;

const ContentWrapper = styled(FlexColumn)`
  width: 100%;
`;

const DateInfo = styled(Text)`
  color: gray;
`;

const DateDelimeter = styled(Text)`
  color: gray;
  margin: 0 4px;
`;

const DateWrapper = styled(FlexRow)`
  margin-bottom: 8px;
  justify-content: space-between;
`;

function WeekInfo({ week }) {
  const { id, name, from_date, to_date, progressFulfilled, isHidden } = week;
  const color =
    progressFulfilled > 75
      ? "#689f38cf"
      : progressFulfilled > 45
      ? "#fb8c00a6"
      : "#e53935ba";
  const wrapperColor = "#eeeeeeb0";

  return (
    <Wrapper
      progress={progressFulfilled}
      color={wrapperColor}
      to={`/week/${id}`}
      ishidden={isHidden}
    >
      <WeekProgress progress={progressFulfilled} color={color} />
      <WeekInfoRow>
        <ContentWrapper>
          <NamePercentageWrapper>
            <Name>{name}</Name>
          </NamePercentageWrapper>
          <DateWrapper>
            <FlexRow>
              <DateInfo>{formatDate(from_date)}</DateInfo>
              <DateDelimeter>{"-"}</DateDelimeter>
              <DateInfo>{formatDate(to_date)}</DateInfo>
            </FlexRow>
            <ProgressPercentage
              color={color}
            >{`${progressFulfilled}%`}</ProgressPercentage>
          </DateWrapper>
        </ContentWrapper>
      </WeekInfoRow>
    </Wrapper>
  );
}

export default WeekInfo;
