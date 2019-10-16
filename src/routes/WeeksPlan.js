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
    state: { isNextWeek, weekActivities, weekId, workouts }
  } = location;

  const [activities, dispatchActivities] = useReducer(activitiesReducer, [
    { type: "Running", minutes: "", distance: "" }
  ]);

  useEffect(() => {
    if (weekActivities) {
      dispatchActivities({
        type: "setActivities",
        value: weekActivities
      });
    }
  }, [isNextWeek, weekActivities]);

  const saveNextWeekAndRedirect = () => {
    doSaveWeeksPlan(
      firebase,
      authUser,
      workouts,
      activities,
      isNextWeek,
      weekId
    );

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
            value: { type: "Running", minutes: "", distance: "" }
          })
        }
      >
        <PlusIcon src="/icons/plus.svg" alt="plus-icon" />
        Add activity
      </AddActivity>

      <SavePlanButton
        disabled={activities.length === 0}
        onClick={e => {
          saveNextWeekAndRedirect(e);
        }}
      >
        {isNextWeek ? "Save next week's plan" : "Save current week's plan"}
      </SavePlanButton>
    </div>
  );
}

export default withAuthorization(
  withFirebase(withAuthUser(withRouter(WeeksPlan)))
);
