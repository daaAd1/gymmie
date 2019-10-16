import {
  getNextWeekFromToDates,
  getNextWeekNumber,
  getUpdatedActivities,
  countWeekProgress,
  getCurrentWeekFromToDates,
  getCurrentWeekNumber
} from "./utils";

export function doSaveWeeksPlan(
  firebase,
  authUser,
  workouts,
  activities,
  isNextWeek,
  weekId = null
) {
  const { from_date, to_date } = isNextWeek
    ? getNextWeekFromToDates()
    : getCurrentWeekFromToDates();

  const correctActivities =
    activities &&
    activities.map(v => ({
      ...v,
      minutes: parseInt(v.minutes, 10) || 0,
      distance: parseFloat(v.distance.toString().replace(/,/g, ".")) || 0
    }));

  if (!weekId) {
    firebase
      .weeks()
      .doc()
      .set({
        name: `Week ${
          isNextWeek ? getNextWeekNumber() : getCurrentWeekNumber()
        }`,
        from_date,
        to_date,
        progressFulfilled: "0",
        user_id: authUser.uid,
        activities: correctActivities,
        workouts: []
      });
  } else {
    let updatedActivities = correctActivities;
    if (workouts && workouts.length > 0) {
      updatedActivities = getUpdatedActivities(correctActivities, workouts);
    }

    const progressFulfilled = countWeekProgress({
      workouts,
      activities: updatedActivities
    });

    firebase
      .weeks()
      .doc(weekId)
      .set({
        name: `Week ${getNextWeekNumber()}`,
        from_date,
        to_date,
        progressFulfilled:
          workouts && workouts.length > 0 ? progressFulfilled : "0",
        user_id: authUser.uid,
        activities: updatedActivities,
        workouts: workouts || []
      });
  }
}

export function doSaveWorkout(firebase, authUser, week, workout) {
  const correctWorkout = {
    ...workout,
    minutes: workout.minutes === "" ? "0" : workout.minutes,
    seconds: workout.seconds === "" ? "0" : workout.seconds,
    distance: workout.distance === "" ? "0" : workout.distance
  };
  const { minutes, seconds, distance } = correctWorkout;

  const newWorkout = {
    ...workout,
    minutes: parseInt(minutes, 10),
    seconds: parseInt(seconds, 10),
    distance: parseFloat(distance.replace(/,/g, ".")),
    id: week.workouts.length + 1
  };

  const updatedWorkouts = [...week.workouts, newWorkout];
  const updatedActivities = getUpdatedActivities(
    week.activities,
    updatedWorkouts
  );

  const updatedWeek = {
    ...week,
    workouts: updatedWorkouts,
    activities: updatedActivities
  };
  const progressFulfilled = countWeekProgress({
    workouts: updatedWorkouts,
    activities: updatedActivities
  });

  firebase
    .weeks()
    .doc(week.id)
    .set({
      ...week,
      ...updatedWeek,
      progressFulfilled
    });
}

export function doRemoveWorkout(firebase, authUser, week, index) {
  const { workouts } = week;
  const updatedWorkouts = [
    ...workouts.slice(0, index),
    ...workouts.slice(index + 1)
  ];

  const updatedActivities = getUpdatedActivities(
    week.activities,
    updatedWorkouts
  );
  const newWeek = {
    ...week,
    workouts: updatedWorkouts,
    activities: updatedActivities
  };
  const newProgress = countWeekProgress({
    activities: newWeek.activities,
    workouts: newWeek.workouts
  });
  const updatedWeek = { ...newWeek, progressFulfilled: newProgress };

  firebase
    .weeks()
    .doc(week.id)
    .set({
      ...updatedWeek
    });
}

export function doSaveUser(firebase, authUser, { name, email }) {
  try {
    firebase
      .users()
      .doc(authUser.user.uid)
      .set({
        name,
        email
      });
  } catch (e) {
    console.log({ e });
  }
}

export function doSaveCurrentWeeksNote(firebase, authUser, week, note) {
  firebase
    .weeks()
    .doc(week.id)
    .set({
      ...week,
      note
    });
}
