import React, { useState } from "react";
import { getNextWeekFromToDates, getCurrentWeekFromToDates } from "../utils";
import { PrimaryLink, PrimaryButton } from "../components/defaults/Buttons";
import styled from "styled-components";
import { FlexColumn } from "../components/defaults/Flex";
import WorkoutWeek from "../components/WorkoutWeek";
import AddWorkoutTitle from "../components/AddWorkoutTitle";
import { withFirebase } from "../components/Firebase";
import {
  useCollectionOnce,
  useCollection
} from "react-firebase-hooks/firestore";
import withAuthUser from "../components/Firebase/Session/withAuthUser";
import { withAuthorization } from "../components/Firebase/Session";
import { Loader } from "../components/defaults/Loader";

const NewWorkoutLink = styled(PrimaryLink)`
  text-decoration: none;
  max-width: 400px;
`;

const WeeksWrapper = styled(FlexColumn)``;

const WeeksTitle = styled.h2`
  font-size: 16px;
  margin: 32px 0 16px;
  font-weight: 500;
  text-transform: uppercase;
`;

const NextWeeksTitle = styled(WeeksTitle)`
  font-size: 18px;
`;

const LoadMoreButton = styled(PrimaryButton)`
  flex-flow: column;
  align-items: center;
  background-color: transparent;
  font-size: 16px;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }
`;

const DownIcon = styled.img`
  margin-top: 4px;
  width: 24px;
  height: 24px;
`;

export const NoResultsFound = styled.span`
  font-size: 16px;
  color: #dc9987;
`;

function Weeks({ authUser, firebase }) {
  const limit = 10;
  const [previousWeeksOffset, setPreviousWeeksOffset] = useState(0);

  const [nextWeekFirebase, loading, error] = useCollectionOnce(
    firebase
      .weeks()
      .where("from_date", "==", getNextWeekFromToDates().from_date)
      .where("user_id", "==", authUser ? authUser.uid : 0)
      .limit(1)
  );

  const [
    currentWeekFirebase,
    loadingCurrentWeek,
    errorCurrentWeek
  ] = useCollection(
    firebase
      .weeks()
      .where("from_date", "==", getCurrentWeekFromToDates().from_date)
      .where("user_id", "==", authUser ? authUser.uid : 0)
      .limit(1)
  );

  const [
    previousWeeksFirebase,
    loadingPreviousWeeks,
    errorPreviousWeeks
  ] = useCollectionOnce(
    firebase
      .weeks()
      .where("from_date", "<", getCurrentWeekFromToDates().from_date)
      .where("user_id", "==", authUser ? authUser.uid : 0)
      // .orderBy("from_date")
      // .startAt(0)
      .limit(limit)
  );

  const currentWeek = currentWeekFirebase &&
    currentWeekFirebase.docs &&
    currentWeekFirebase.docs[0] && {
      ...currentWeekFirebase.docs[0].data(),
      id: currentWeekFirebase.docs[0].id
    };

  const nextWeek = nextWeekFirebase &&
    nextWeekFirebase.docs &&
    nextWeekFirebase.docs[0] && {
      ...nextWeekFirebase.docs[0].data(),
      id: nextWeekFirebase.docs[0].id
    };
  const canCreateNextWeek = !nextWeek;

  const previousWeeks =
    previousWeeksFirebase &&
    previousWeeksFirebase.docs &&
    previousWeeksFirebase.docs.map(d => ({ ...d.data(), id: d.id }));

  const totalPreviousWeeks = (previousWeeks && previousWeeks.length) || 0;
  const showMoreButton = totalPreviousWeeks > previousWeeksOffset + limit;

  return (
    <>
      <AddWorkoutTitle
        title="Current"
        week={currentWeek}
        noMarginBottom={true}
      />
      {!loadingCurrentWeek ? (
        currentWeek ? (
          <WorkoutWeek week={currentWeek} />
        ) : (
          <NewWorkoutLink
            to={{ pathname: "weeks-plan", state: { isNextWeek: false } }}
          >
            Create plan for this week
          </NewWorkoutLink>
        )
      ) : (
        <Loader />
      )}
      <NextWeeksTitle>Coming up</NextWeeksTitle>
      {!loadingCurrentWeek ? (
        nextWeek && <WorkoutWeek week={nextWeek} />
      ) : (
        <Loader />
      )}
      {!loadingCurrentWeek && (
        <NewWorkoutLink
          to={{
            pathname: "weeks-plan",
            state: {
              isNextWeek: true,
              nextWeekActivities: nextWeek && nextWeek.activities,
              nextWeekId: nextWeek && nextWeek.id
            }
          }}
        >
          {canCreateNextWeek
            ? "Create next week's plan"
            : "Edit next week's plan"}
        </NewWorkoutLink>
      )}
      <WeeksTitle>Previous</WeeksTitle>
      <WeeksWrapper>
        {loadingPreviousWeeks ? (
          <Loader />
        ) : previousWeeks && previousWeeks.length > 0 ? (
          previousWeeks.map((week, i) =>
            i < previousWeeksOffset + limit ? (
              <WorkoutWeek key={week.id} week={week} />
            ) : null
          )
        ) : (
          <NoResultsFound>{"You don't have any previous weeks"}</NoResultsFound>
        )}
      </WeeksWrapper>
      {showMoreButton && (
        <LoadMoreButton
          onClick={() => setPreviousWeeksOffset(previousWeeksOffset + limit)}
        >
          Load previous weeks
          <DownIcon alt="down-icon" src="/icons/arrow-down.svg" />
        </LoadMoreButton>
      )}
    </>
  );
}

export default withAuthorization(withFirebase(withAuthUser(Weeks)));
