import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FlexRow, FlexColumn } from "./defaults/Flex";
import { Text } from "./defaults/Text";
import { formatDate } from "../utils";

const Wrapper = styled(Link)`
  position: relative;
  display: flex;
  flex-flow: column;
  max-width: 400px;
  opacity: ${({ ishidden }) => (ishidden ? 0.5 : 1)};
  margin-bottom: 16px;
  padding: 24px 16px 8px;
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
  justify-content: space-between;
`;

const Name = styled(Text)`
  font-weight: 700;
  margin-bottom: 8px;
`;

const ProgressPercentage = styled(Text)`
  font-weight: 700;
  margin-bottom: 8px;
  color: ${({ color }) => `${color}`};
`;

const WeekInfo = styled(FlexRow)`
  justify-content: space-between;
  align-items: center;
`;

const RightArrowIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const DateInfo = styled(Text)`
  color: gray;
  font-size: 14px;
`;

const DateDelimeter = styled(Text)`
  color: gray;
  font-size: 14px;
  margin: 0 4px;
`;

const DateWrapper = styled(FlexRow)`
  margin-bottom: 8px;
`;

function WorkoutWeek({ week, dispatchAppState, location }) {
  const { id, name, from_date, to_date, progressFulfilled, isHidden } = week;
  const color =
    progressFulfilled > 75
      ? "#689f38cf"
      : progressFulfilled > 45
      ? "#fb8c00a6"
      : "#e53935ba";
  const wrapperColor = "#eeeeee54";
  // progressFulfilled > 75
  //   ? "#689f3824"
  //   : progressFulfilled > 45
  //   ? "#fbc02d45"
  //   : "#dc99873b";

  return (
    <Wrapper
      progress={progressFulfilled}
      color={wrapperColor}
      to={`/week/${id}`}
      ishidden={isHidden}
    >
      <WeekProgress progress={progressFulfilled} color={color} />
      <WeekInfo>
        <FlexColumn>
          <NamePercentageWrapper>
            <Name>{name}</Name>
            <ProgressPercentage
              color={color}
            >{`${progressFulfilled}%`}</ProgressPercentage>
          </NamePercentageWrapper>
          <DateWrapper>
            <DateInfo>{formatDate(from_date)}</DateInfo>
            <DateDelimeter>{"-"}</DateDelimeter>
            <DateInfo>{formatDate(to_date)}</DateInfo>
          </DateWrapper>
        </FlexColumn>
        <RightArrowIcon src="/icons/arrow-right.svg" alt="right-arrow" />
      </WeekInfo>
      {/* <HideWeekButton
          onClick={() => dispatchAppState({ type: "hideWeek", value: id })}
        >
          {isHidden ? "Show week" : "Hide week"}
        </HideWeekButton> */}
    </Wrapper>
  );
}

export default WorkoutWeek;
