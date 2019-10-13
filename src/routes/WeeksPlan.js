import React, { useReducer, useEffect } from "react";
import { withRouter } from "react-router";
import { PrimaryButton } from "../components/defaults/Buttons";
import { activitiesReducer } from "../reducers";
import styled from "styled-components";
import ActivityForm from "../components/ActivityForm";
import { FlexRow } from "../components/defaults/Flex";
import { withFirebase } from "../components/Firebase";
import { doSaveWeeksPlan } from "../firebase-db";
import withAuthUser from "../components/Firebase/Session/withAuthUser";
import { withAuthorization } from "../components/Firebase/Session";

const StyledTitle = styled.h2`
  font-size: 20px;
  margin: 0;
  margin-bottom: 32px;
  text-align: center;
  font-weight: 500;
`;

const PlusIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const AddActivity = styled(FlexRow)`
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 4px 16px;
  background-color: #689f3830;
  color: #444444;
  border-radius: 16px;
  width: fit-content;
  margin: 0 auto;
  margin-bottom: 16px;
`;

const SavePlanButton = styled(PrimaryButton)`
  margin-top: 24px;
`;

function WeeksPlan({ history, location, firebase, authUser }) {
  const {
    state: { isNextWeek, nextWeekActivities, nextWeekId }
  } = location;

  const [activities, dispatchActivities] = useReducer(activitiesReducer, [
    { type: "Running", minutes: "", distance: "" }
  ]);

  useEffect(() => {
    if (isNextWeek && nextWeekActivities) {
      dispatchActivities({
        type: "setActivities",
        value: nextWeekActivities
      });
    }
  }, [isNextWeek, nextWeekActivities]);

  const saveNextWeekAndRedirect = () => {
    doSaveWeeksPlan(firebase, authUser, activities, isNextWeek, nextWeekId);

    history.push("/weeks");
  };

  return (
    <div>
      <StyledTitle>
        {isNextWeek ? "Next week's plan" : "Current week's plan"}
      </StyledTitle>

      {activities &&
        activities.map((activity, i) => {
          const activityNumber = i + 1;
          return (
            <ActivityForm
              key={i}
              activityNumber={activityNumber}
              activity={activity}
              dispatchActivities={dispatchActivities}
            />
          );
        })}

      <AddActivity
        onClick={() =>
          dispatchActivities({
            type: "add",
            value: { type: "", minutes: "", distance: "" }
          })
        }
      >
        <PlusIcon src="/icons/plus.svg" alt="plus-icon" />
        Add activity
      </AddActivity>

      <SavePlanButton
        disabled={activities.length === 0}
        onClick={e => {
          if (
            !isNextWeek &&
            window.confirm(
              "Are you sure you want to create this workout? You won't be able to change it later"
            )
          ) {
            saveNextWeekAndRedirect(e);
          } else {
            saveNextWeekAndRedirect(e);
          }
        }}
      >
        Save next week's plan
      </SavePlanButton>
    </div>
  );
}

export default withAuthorization(
  withFirebase(withAuthUser(withRouter(WeeksPlan)))
);
