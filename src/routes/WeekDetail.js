import React, { useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import WorkoutItem from "../components/WorkoutItem";
import styled from "styled-components";
import WorkoutPlanItem from "../components/WorkoutPlanItem";
import WeekInfo from "../components/WeekInfo";
import { isCurrentWeek } from "../utils";
import AddWorkoutTitle from "../components/AddWorkoutTitle";
import { NoResultsFound } from "./Weeks";
import { FlexColumn } from "../components/defaults/Flex";
import TextareaAutosize from 'react-autosize-textarea';
import moment from "moment";
import { useCollection } from "react-firebase-hooks/firestore";
import { withFirebase } from "../components/Firebase";
import { doRemoveWorkout, doSaveCurrentWeeksNote } from "../firebase-db";
import withAuthUser from "../components/Firebase/Session/withAuthUser";
import { withAuthorization } from "../components/Firebase/Session";
import { Loader } from "../components/defaults/Loader";

const Wrapper = styled.div``;

const WorkoutPlanTitle = styled.h3`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  margin: 24px 0 16px;
`;

const EditWeekWrapper = styled(Link)`
  border-radius: 16px;
  padding: 8px 16px;
  background-color: #ffd873;
  font-size: 16px;
  font-weight: 400;
  text-transform: lowercase;
`;

const ActivitiesWrapper = styled(FlexColumn)`
  margin-bottom: 16px;
`;

const Note = styled(TextareaAutosize)`
  width: 100%;
  border-radius: 16px;
  padding: 16px 8px;
  box-sizing: border-box;
`;

const NoteLabel = styled.p`
  margin: 0;
  margin-bottom: 8px;
  margin-top: 24px;
  font-size: 20px;
  font-family: "Rubik", sans-serif;
`;

function WeekDetail({ firebase, authUser, match }) {
  const { addToast } = useToasts();
  const [note, setNote] = useState(null);

  const id = match.params.id;
  const [weekDoc, loading, error] = useCollection(firebase.week(id));
  const week = weekDoc && {
    ...weekDoc.data(),
    id: weekDoc.id
  };

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

  const saveNote = () => {
    doSaveCurrentWeeksNote(firebase, authUser, week, note || week.note);
    addToast("Your note was automatically saved", {
      appearance: "success",
      autoDismiss: true
    });
  };

  return (
    <Wrapper>
      <WeekInfo week={week} />
      {(note || week.note || isCurrent) && (
        <>
          <NoteLabel>Notes</NoteLabel>
          <Note
            rows={3}
            disabled={!isCurrent}
            onBlur={saveNote}
            placeholder="Write your notes here about this week's progress"
            value={note || week.note}
            onChange={e => setNote(e.target.value)}
          />
        </>
      )}
      <WorkoutPlanTitle>
        Workout plan{" "}
        <EditWeekWrapper
          to={{
            pathname: "/weeks-plan",
            state: {
              isNextWeek: false,
              weekActivities: week.activities,
              weekId: week.id,
              workouts: week.workouts
            }
          }}
        >
          Edit
        </EditWeekWrapper>
      </WorkoutPlanTitle>
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
        isWeekDetail={true}
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
