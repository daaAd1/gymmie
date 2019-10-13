import React from "react";
import { FlexRow, FlexColumn } from "./defaults/Flex";
import styled from "styled-components";
import { Text } from "./defaults/Text";
import {
  getIconFromWorkoutType,
  formatDistance,
  formatSeconds,
  getWeekDayFromNumber
} from "../utils";
import DotLineDelimeter from "./defaults/DotLineDelimeter";
import moment from "moment";

const Wrapper = styled(FlexColumn)``;

const WeekWrapper = styled(FlexRow)`
  max-width: 400px;
  background-color: #eeeeee;
  padding: 16px;
  border-radius: 8px;
`;

const WorkoutIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 16px;
`;

const InfoWrapper = styled(FlexColumn)`
  flex: 1;
`;

const Type = styled(Text)`
  font-weight: 700;
  text-transform: uppercase;
  color: #44444491;
`;

const Distance = styled(Text)`
  font-weight: 700;
`;

const TopRow = styled(FlexRow)`
  width: 100%;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const BottomRow = styled(FlexRow)`
  width: 100%;
  justify-content: space-between;
`;

const DayInWeekWrapper = styled.div`
  position: relative;
  margin-top: 16px;
`;

const DayInWeek = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  position: absolute;
  top: -20px;
  color: #444444a1;
`;

const DeleteIcon = styled.img`
  width: 24x;
  height: 24px;
  margin-left: 24px;
`;

const WorkoutItem = ({
  workout,
  last,
  first,
  lastDay,
  isCurrent,
  deleteWorkout
}) => {
  const { day, type, minutes, seconds, distance } = workout;
  const formattedSeconds = formatSeconds(seconds);
  const dayName = getWeekDayFromNumber(
    moment(day, "DD.MM.YYYY").isoWeekday()
  ).slice(0, 2);

  return (
    <Wrapper>
      {first && (
        <DayInWeekWrapper>
          <DayInWeek>{`${dayName} - ${day}`}</DayInWeek>
        </DayInWeekWrapper>
      )}
      <WeekWrapper>
        <WorkoutIcon src={getIconFromWorkoutType(type)} />
        <InfoWrapper>
          <TopRow>
            <Type>{type}</Type>
          </TopRow>
          <BottomRow>
            <Distance>{`${formatDistance(
              distance
            )} / ${minutes}:${formattedSeconds}`}</Distance>
          </BottomRow>
        </InfoWrapper>
        {isCurrent && (
          <DeleteIcon onClick={deleteWorkout} src="/icons/delete.svg" />
        )}
      </WeekWrapper>
      {!last && <DotLineDelimeter last={lastDay} />}
    </Wrapper>
  );
};

export default WorkoutItem;
