import React, { useState } from "react";
import { FlexColumn, FlexRow } from "../components/defaults/Flex";
import styled from "styled-components";
import {
  getTotalHoursAndDistance,
  getTotalPlannedHoursAndDistance,
  getTotalStatsForSports
} from "../stats-utils";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Select from "../components/defaults/Select";
import { workoutTypes } from "../constants";
import { withAuthorization } from "../components/Firebase/Session";
import { useCollection } from "react-firebase-hooks/firestore";
import { withFirebase } from "../components/Firebase";
import { NoResultsFound } from "./Weeks";
import withAuthUser from "../components/Firebase/Session/withAuthUser";
import { getNextWeekFromToDates } from "../utils";
import { Loader } from "../components/defaults/Loader";

const TitleAll = styled.h2`
  margin: 0;
  margin-bottom: 24px;
  text-align: center;
  font-size: 20px;
  text-transform: uppercase;
`;

const ProgressWrapper = styled.div`
  border-radius: 24px;
  padding: 24px;
  padding-bottom: 8px;
  margin-bottom: 24px;
`;

const CircleProgressWrapper = styled.div`
  width: 96px;
  margin: 0 auto;
  margin-bottom: 24px;
`;

const StatsWrapper = styled(FlexColumn)`
  background: ${({ color }) => color};
  border-radius: 24px;
  padding-top: 24px;
  padding-bottom: 8px;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  color: #444444;
  text-align: center;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 16px;
  letter-spacing: 0.0625em;
  font-size: 20px;
`;

const TotalWrapper = styled(FlexRow)`
  justify-content: space-around;
  margin-bottom: 16px;
`;

// const ResetStatsButton = styled(PrimaryButton)`
//   background-color: #dc9987cc;
// `;

const Value = styled.p`
  font-weight: 700;
  font-size: 26px;
  margin: 0;
  color: #444444;
`;

const Type = styled.p`
  font-size: 16px;
  margin: 0;
  margin-left: 8px;
  color: #444444;
  opacity: 0.7;
  margin-bottom: 2px;
  font-size: 18px;
`;

const ValueWrapper = styled(FlexRow)`
  align-items: flex-end;
`;

const NavItems = styled(FlexRow)`
  justify-content: space-around;
  margin-bottom: 24px;
`;

const NavItem = styled.div`
  cursor: pointer;
  font-family: "Lato", sans-serif;
  color: ${({ active }) => (active ? "#444444" : "gray")};
  font-weight: ${({ active }) => (active ? 700 : 400)};
  font-size: 18px;
  position: relative;

  &::after {
    content: "";
    background: ${({ active }) => (active ? "#ffd873" : "white")};
    position: absolute;
    bottom: -8px;
    right: 0;
    height: 3px;
    width: 50%;
  }
`;

function Stats({ firebase, authUser }) {
  const [tab, setTab] = useState("all");
  const [activity, setActivity] = useState("Running");

  const [weeksDoc, loading, error] = useCollection(
    firebase
      .weeks()
      .where("user_id", "==", authUser ? authUser.uid : 0)
      .where("from_date", "<", getNextWeekFromToDates().from_date)
  );

  if (loading) {
    return <Loader />;
  }

  if (!weeksDoc) {
    return (
      <NoResultsFound>{"You don't have any available data"}</NoResultsFound>
    );
  }

  const weeks = weeksDoc && weeksDoc.docs.map(d => ({ ...d.data(), id: d.id }));

  const workouts = [];
  const activities = [];
  weeks.map(w => w.workouts && w.workouts.map(w => workouts.push(w)));
  weeks.map(w => w.activities && w.activities.map(a => activities.push(a)));

  const { totalHours, totalDistance } = getTotalHoursAndDistance(workouts);
  const {
    totalPlannedHours,
    totalPlannedDistance
  } = getTotalPlannedHoursAndDistance(activities);
  const {
    totalHours: totalSportHours,
    totalDistance: totalSportDistance,
    totalPlannedHours: totalSportPlannedHours,
    totalPlannedDistance: totalSportPlannedDistance
  } = getTotalStatsForSports(workouts, activities, activity);

  return (
    <>
      <NavItems>
        <NavItem onClick={() => setTab("all")} active={tab === "all"}>
          Overall
        </NavItem>
        <NavItem onClick={() => setTab("sport")} active={tab === "sport"}>
          By sport
        </NavItem>
      </NavItems>
      {tab === "all" && (
        <>
          <ProgressWrapper>
            <TitleAll>Overall progress</TitleAll>
            <CircleProgressWrapper>
              {/* <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}> */}
              <CircularProgressbar
                value={60}
                text={`${60}%`}
                background={true}
                styles={buildStyles({
                  textColor: "#444444",
                  pathColor: "#689f38cf",
                  trailColor: "#ccc",
                  textSize: "20px",
                  pathTransitionDuration: 0.5,
                  backgroundColor: "white"
                })}
              />
              {/* </ChangingProgressProvider> */}
            </CircleProgressWrapper>
          </ProgressWrapper>
          <StatsWrapper color={"#689f3842"}>
            <Title>Completed</Title>
            <TotalWrapper>
              <ValueWrapper>
                <Value>{totalHours}</Value>
                <Type>{totalHours < 2 ? "hour" : "hours"}</Type>
              </ValueWrapper>
              <ValueWrapper>
                <Value>{totalDistance}</Value>
                <Type>km</Type>
              </ValueWrapper>
            </TotalWrapper>
          </StatsWrapper>
          <StatsWrapper color={"#ffd87359"}>
            <Title>Planned</Title>
            <TotalWrapper>
              <ValueWrapper>
                <Value>{totalPlannedHours}</Value>
                <Type>{totalPlannedHours < 2 ? "hour" : "hours"}</Type>
              </ValueWrapper>
              <ValueWrapper>
                <Value>{totalPlannedDistance}</Value>
                <Type>km</Type>
              </ValueWrapper>
            </TotalWrapper>
          </StatsWrapper>
          {/* <ResetStatsButton
            onClick={e => {
              if (
                window.confirm("Are you sure you want to delete all workouts?")
              ) {
                clearLocalStorage(e);
              }
            }}
          >
            Delete all workouts
          </ResetStatsButton> */}
        </>
      )}
      {tab === "sport" && (
        <>
          <Select
            value={activity}
            options={workoutTypes}
            onChange={e => setActivity(e.target.value)}
          />
          <br />
          <StatsWrapper color={"#689f3842"}>
            <Title>Completed</Title>
            <TotalWrapper>
              <ValueWrapper>
                <Value>{totalSportHours}</Value>
                <Type>{totalSportHours < 2 ? "hour" : "hours"}</Type>
              </ValueWrapper>
              <ValueWrapper>
                <Value>{totalSportDistance}</Value>
                <Type>km</Type>
              </ValueWrapper>
            </TotalWrapper>
          </StatsWrapper>
          <StatsWrapper color={"#ffd87359"}>
            <Title>Planned</Title>
            <TotalWrapper>
              <ValueWrapper>
                <Value>{totalSportPlannedHours}</Value>
                <Type>{totalSportPlannedHours < 2 ? "hour" : "hours"}</Type>
              </ValueWrapper>
              <ValueWrapper>
                <Value>{totalSportPlannedDistance}</Value>
                <Type>km</Type>
              </ValueWrapper>
            </TotalWrapper>
          </StatsWrapper>
        </>
      )}
    </>
  );
}

export default withAuthUser(withFirebase(withAuthorization(Stats)));
