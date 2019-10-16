import React, { useState } from "react";
import Input from "./defaults/Input";
import { FlexColumn, FlexRow } from "./defaults/Flex";
import Select from "./defaults/Select";
import { workoutTypes } from "../constants";
import styled from "styled-components";
import { shouldShowDistance } from "../utils";

const Wrapper = styled(FlexColumn)`
  margin: 16px 0;
`;

const TitleRemoveWrapper = styled(FlexRow)`
  justify-content: space-between;
`;

const InputsWrapper = styled(FlexColumn)``;

const HoursDistanceWrapper = styled(FlexRow)`
  justify-content: space-between;
`;

const ActivityTitle = styled.h3`
  font-size: 16px;
  margin: 0;
`;

const RemoveActivityButton = styled(FlexColumn)`
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 4px 20px;
  background-color: #dc9987cc;
  color: #444444;
`;

function ActivityForm({ dispatchActivities, activityNumber, activity }) {
  const i = activityNumber - 1;
  const { type, minutes, distance } = activity;
  const showDistance = shouldShowDistance(type, workoutTypes);

  return (
    <Wrapper>
      <TitleRemoveWrapper>
        <ActivityTitle>Activity {activityNumber}</ActivityTitle>
        <RemoveActivityButton
          onClick={() => dispatchActivities({ type: "remove", value: i })}
        >
          Remove
        </RemoveActivityButton>
      </TitleRemoveWrapper>
      <InputsWrapper>
        <Select
          defaultValue={"Running"}
          value={type}
          options={workoutTypes}
          onChange={e =>
            dispatchActivities({
              type: "setActivityValue",
              value: i,
              newValue: e.target.value,
              valueType: "type"
            })
          }
        />
        <HoursDistanceWrapper>
          <Input
            inputWidth={"45%"}
            label="minutes"
            type="number"
            name="minutes"
            placeholder="0"
            value={minutes}
            onChange={e =>
              dispatchActivities({
                type: "setActivityValue",
                value: i,
                newValue: e.target.value,
                valueType: "minutes"
              })
            }
          />
          {showDistance && (
            <Input
              unit="km"
              inputWidth={"45%"}
              label="distance"
              type="number"
              name="distance"
              placeholder="0"
              value={distance}
              onChange={e =>
                dispatchActivities({
                  type: "setActivityValue",
                  value: i,
                  newValue: e.target.value,
                  valueType: "distance"
                })
              }
            />
          )}
        </HoursDistanceWrapper>
      </InputsWrapper>
    </Wrapper>
  );
}

export default ActivityForm;
