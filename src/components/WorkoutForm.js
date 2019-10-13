import React, { useState } from "react";
import Input from "./defaults/Input";
import { FlexColumn, FlexRow } from "./defaults/Flex";
import { PrimaryButton } from "./defaults/Buttons";
import styled from "styled-components";
import { getCurrentWeekDays, getTodayDate, shouldShowDistance } from "../utils";
import Select from "./defaults/Select";
import { workoutTypes } from "../constants";

const Wrapper = styled(FlexColumn)`
  margin-bottom: 24px;
`;

const MinutesSecondsWrapper = styled(FlexRow)`
  justify-content: space-between;
`;

function WorkoutForm({ saveWorkout, week }) {
  const [workout, setWorkout] = useState({
    day: getTodayDate(),
    type: "Running",
    minutes: "",
    seconds: "",
    distance: ""
  });
  const { day, type, minutes, seconds, distance } = workout;
  const daysOptions = getCurrentWeekDays(week);
  const showDistance = shouldShowDistance(workout.type, workoutTypes);

  return (
    <Wrapper>
      <Select
        label="day"
        value={day}
        options={daysOptions}
        onChange={e => setWorkout({ ...workout, day: e.target.value })}
      />
      <Select
        label="type"
        value={type}
        options={workoutTypes}
        onChange={e => setWorkout({ ...workout, type: e.target.value })}
      />
      <MinutesSecondsWrapper>
        <Input
          inputWidth={showDistance ? "25%" : "45%"}
          label="minutes"
          type="number"
          name="minutes"
          placeholder={0}
          value={minutes}
          onChange={e => {
            setWorkout({ ...workout, minutes: e.target.value });
          }}
        />
        <Input
          inputWidth={showDistance ? "25%" : "45%"}
          label="seconds"
          type="number"
          name="seconds"
          placeholder={0}
          value={seconds}
          onChange={e => {
            setWorkout({ ...workout, seconds: e.target.value });
          }}
        />
        {showDistance && (
          <Input
            inputWidth={"35%"}
            label="distance"
            type="number"
            name="Distance"
            unit={"km"}
            placeholder={0}
            value={distance}
            onChange={e => {
              setWorkout({ ...workout, distance: e.target.value });
            }}
          />
        )}
      </MinutesSecondsWrapper>
      <PrimaryButton onClick={() => saveWorkout(workout)}>
        Add workout
      </PrimaryButton>
    </Wrapper>
  );
}

export default WorkoutForm;
