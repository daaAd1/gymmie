import React, { useState } from "react";
import styled from "styled-components";
import { FlexColumn, FlexRow } from "./defaults/Flex";
import { isCurrentWeek } from "../utils";
import WorkoutForm from "./WorkoutForm";
import { withFirebase } from "./Firebase";
import withAuthUser from "./Firebase/Session/withAuthUser";
import { doSaveWorkout } from "../firebase-db";

const Wrapper = styled(FlexColumn)``;

const CurrentWeeksTitleWrapper = styled(FlexRow)`
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ isWeekDetail }) => (isWeekDetail ? "40px" : "16px")};
`;

const CurrentWeeksTitle = styled.h2`
  font-weight: 500;
  text-transform: uppercase;
  font-size: 20px;
  margin: 0;
`;

const PlusIconWrapper = styled(FlexColumn)`
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: #ffd873;
  cursor: pointer;
`;

const PlusIcon = styled.img`
  width: 24px;
  height: 24px;
`;

function AddWorkoutTitle({
  firebase,
  authUser,
  title,
  week,
  isWeekDetail = false
}) {
  const [isWorkoutFormVisible, setIsWorkoutFormVisible] = useState(false);
  const showButton = isCurrentWeek(week);

  const saveWorkout = workout => {
    doSaveWorkout(firebase, authUser, week, workout);
    setIsWorkoutFormVisible(false);
  };

  return (
    <Wrapper isWeekDetail={isWeekDetail}>
      <CurrentWeeksTitleWrapper isWeekDetail={isWeekDetail}>
        <CurrentWeeksTitle>{title}</CurrentWeeksTitle>
        {showButton && (
          <PlusIconWrapper
            onClick={() => {
              setIsWorkoutFormVisible(!isWorkoutFormVisible);
            }}
          >
            <PlusIcon
              alt="plus-icon"
              src={
                isWorkoutFormVisible ? "/icons/minus.svg" : "/icons/plus.svg"
              }
            />
          </PlusIconWrapper>
        )}
      </CurrentWeeksTitleWrapper>
      {isWorkoutFormVisible ? (
        <WorkoutForm saveWorkout={saveWorkout} week={week} />
      ) : null}
    </Wrapper>
  );
}

export default withFirebase(withAuthUser(AddWorkoutTitle));
