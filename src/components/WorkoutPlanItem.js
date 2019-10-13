import React from "react";
import { FlexRow, FlexColumn } from "./defaults/Flex";
import styled from "styled-components";
import { Text } from "./defaults/Text";
import {
  getIconFromWorkoutType,
  formatDistance,
  formatHours,
  getFulfilledWorkoutIcon
} from "../utils";

const Wrapper = styled(FlexColumn)`
  background-color: ${({ isFulfilled }) =>
    isFulfilled ? " #689f3830" : "#dc99874a"};
  border-radius: 8px;
  padding: 16px;
  border-bottom-right-radius: ${({ isFulfilled }) => (isFulfilled ? "8px" : 0)};
  margin-bottom: ${({ isFulfilled }) => (isFulfilled ? "16px" : 0)};
`;

const PlanWrapper = styled(FlexRow)`
  max-width: 400px;
  /* padding: 12px; */
`;

const WorkoutIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 16px;
`;

const FullfilledIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const MiddleSection = styled(FlexColumn)`
  flex: 1;
`;

const Type = styled(Text)`
  font-weight: 700;
  margin-bottom: 4px;
`;

const Duration = styled(Text)`
  color: gray;
  font-size: 16px;
`;

const Date = styled(Text)`
  color: gray;
  font-size: 16px;
`;

const Delimeter = styled(Text)`
  color: gray;
  font-size: 16px;
  margin: 0 8px;
`;

const BottomRow = styled(FlexRow)`
  width: 100%;
`;

const MissingStatsWrapper = styled(FlexRow)`
  justify-content: flex-end;
  margin-left: auto;
  padding: 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background: white;
  border: 2px solid #dc99874a;
  border-top: 0;
`;

const MissingWrapper = styled(FlexRow)`
  height: 50px;
  width: 100%;
  margin-bottom: 16px;
`;

const EmptySpace = styled.div`
  background: white;
  height: 100%;
`;

const Missing = styled(Text)`
  font-weight: 700;
  color: #dc9987cc;
  margin: 0 8px;
`;

const MissingText = styled(Text)`
  color: #444444;
`;

const WorkoutPlanItem = ({ activity }) => {
  const {
    type,
    minutes,
    distance,
    isFulfilled,
    progressMinutesMissing,
    progressDistanceMissing
  } = activity;

  const missingMinutes = progressMinutesMissing || minutes;
  const missingDistance = progressDistanceMissing || distance;

  return (
    <>
      <Wrapper isFulfilled={isFulfilled}>
        <PlanWrapper>
          <WorkoutIcon src={getIconFromWorkoutType(type)} />
          <MiddleSection>
            <Type>{type}</Type>
            <BottomRow>
              <Date>{formatHours(minutes)}</Date>
              <Delimeter>{"/"}</Delimeter>
              <Duration>{formatDistance(distance)}</Duration>
            </BottomRow>
          </MiddleSection>
          <FullfilledIcon src={getFulfilledWorkoutIcon(isFulfilled)} />
        </PlanWrapper>
      </Wrapper>
      {!isFulfilled && (
        <MissingWrapper>
          <EmptySpace />
          <MissingStatsWrapper>
            <FlexRow>
              <Missing>{"Missing: "}</Missing>
              <MissingText>{formatHours(missingMinutes)}</MissingText>
              {distance !== 0 && (
                <>
                  <Delimeter>{"/"}</Delimeter>
                  <MissingText>{formatDistance(missingDistance)}</MissingText>
                </>
              )}
            </FlexRow>
          </MissingStatsWrapper>
        </MissingWrapper>
      )}
    </>
  );
};

export default WorkoutPlanItem;
