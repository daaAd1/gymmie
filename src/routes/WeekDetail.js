import React from "react";
import { withRouter } from "react-router";
import WorkoutItem from "../components/WorkoutItem";
import styled from "styled-components";
import WorkoutPlanItem from "../components/WorkoutPlanItem";
import WeekInfo from "../components/WeekInfo";
import { isCurrentWeek } from "../utils";
import AddWorkoutTitle from "../components/AddWorkoutTitle";
import { NoResultsFound } from "./Weeks";
import { FlexColumn } from "../components/defaults/Flex";
import moment from "moment";
import { useCollection } from "react-firebase-hooks/firestore";
import { withFirebase } from "../components/Firebase";
import { doRemoveWorkout } from "../firebase-db";
import withAuthUser from "../components/Firebase/Session/withAuthUser";
import { withAuthorization } from "../components/Firebase/Session";
import { Loader } from "../components/defaults/Loader";

const Wrapper = styled.div``;

const WorkoutPlanTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin: 24px 0 16px;
`;

const ActivitiesWrapper = styled(FlexColumn)`
  margin-bottom: 16px;
`;

function WeekDetail({ firebase, authUser, match }) {
  const id = match.params.id;
  const [weekDoc, loading, error] = useCollection(firebase.week(id));
  const week = weekDoc && weekDoc.data();
  const isCurrent = week ? isCurrentWeek(week) : false;

  if (loading) {
    return <Loader />;
  }

  if (!week) {
    return <p>Week with this id does not exits</p>;
  }

  const { activities, workouts } = week;
  let currentDay = "";
  const sortedWorkouts =
    workouts &&
    workouts.sort((a, b) =>
      moment(a.day, "DD.MM.YYYY").diff(moment(b.day, "DD.MM.YYYY"))
    );

  const deleteWorkoutFromWeek = index => {
    doRemoveWorkout(firebase, authUser, week, index);
  };

  return (
    <Wrapper>
      <WeekInfo week={week} />
      <WorkoutPlanTitle>Workout plan</WorkoutPlanTitle>
      <ActivitiesWrapper>
        {activities &&
          activities.map((activity, i) => {
            return <WorkoutPlanItem key={i} activity={activity} />;
          })}
      </ActivitiesWrapper>
      <AddWorkoutTitle
        title="Workouts"
        week={week}
        noMarginBottom={!(workouts && workouts.length > 0)}
      />
      {sortedWorkouts && sortedWorkouts.length > 0 ? (
        sortedWorkouts.map((workout, i) => {
          const previousDay = currentDay;
          currentDay = workout.day;
          const nextWorkout = workouts[i + 1];
          let lastDay = false;
          if (nextWorkout) {
            lastDay = nextWorkout.day !== currentDay;
          }
          const first = previousDay !== currentDay;
          return (
            <WorkoutItem
              i={i}
              last={i === workouts.length - 1}
              key={i}
              workout={workout}
              first={first}
              lastDay={lastDay}
              isCurrent={isCurrent}
              deleteWorkout={() => deleteWorkoutFromWeek(i)}
            />
          );
        })
      ) : (
        <NoResultsFound>
          You have not completed any workouts this week
        </NoResultsFound>
      )}
    </Wrapper>
  );
}

export default withAuthorization(
  withFirebase(withAuthUser(withRouter(WeekDetail)))
);
