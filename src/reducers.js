import {
  getNextWeekFromToDates,
  getNextWeekNumber,
  countWeekProgress,
  getCurrentWeekFromToDates,
  getCurrentWeekNumber,
  canNextWeekBeCreated,
  getUpdatedActivities
} from "./utils";

export const appStateReducer = (appState, { type, value, id, workout }) => {
  switch (type) {
    case "populateAppState":
      return value;

    case "deleteWorkout": {
      const { weeks } = appState;
      const { from_date } = getCurrentWeekFromToDates();

      const currentWeek = weeks.filter(w => w.from_date === from_date)[0];
      const { workouts } = currentWeek;
      const index = workouts.findIndex(w => w.id === id);
      const updatedWorkouts = [
        ...workouts.slice(0, index),
        ...workouts.slice(index + 1)
      ];

      const updatedWeeks = appState.weeks.map(week => {
        if (week.id === currentWeek.id) {
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
            workouts: newWeek.workouts,
            activities: newWeek.activities
          });
          return { ...newWeek, progressFulfilled: newProgress };
        }
        return week;
      });

      const newState = {
        ...appState,
        weeks: updatedWeeks
      };
      return newState;
    }

    case "saveCurrentWeek": {
      const { weeks } = appState;
      const { from_date, to_date } = getCurrentWeekFromToDates();
      const correctActivities = value.map(v => ({
        ...v,
        minutes: parseInt(v.minutes, 10),
        distance:
          v.distance === ""
            ? 0
            : parseFloat(v.distance.toString().replace(/,/g, "."))
      }));
      const currentWeek = {
        id: appState.weeks.length + 1,
        name: `Week ${getCurrentWeekNumber()}`,
        from_date,
        to_date,
        progressFulfilled: "0",
        activities: correctActivities,
        workouts: []
      };

      const canCreateNextWeek = canNextWeekBeCreated(weeks);
      let newState;
      if (canCreateNextWeek) {
        newState = {
          ...appState,
          weeks: [...weeks, currentWeek]
        };
      } else {
        const nextWeek = weeks[weeks.length - 1];
        const weeksWithoutNext = weeks.slice(0, weeks.length - 1);
        newState = {
          ...appState,
          weeks: [...weeksWithoutNext, currentWeek, nextWeek]
        };
      }

      // if (weeks[weeks.length - 1].from_date === from_date) {
      //   const newWeeks = weeks;
      //   newWeeks[newWeeks.length - 1] = currentWeek;
      //   newState = {
      //     ...appState,
      //     weeks: newWeeks
      //   };
      // }

      return newState;
    }

    case "saveNextWeek": {
      const { weeks } = appState;
      const { from_date, to_date } = getNextWeekFromToDates();

      const correctActivities = value.map(v => ({
        ...v,
        minutes: parseInt(v.minutes, 10),
        distance:
          v.distance === ""
            ? 0
            : parseFloat(v.distance.toString().replace(/,/g, "."))
      }));
      const nextWeek = {
        id: appState.weeks.length + 1,
        name: `Week ${getNextWeekNumber()}`,
        from_date,
        to_date,
        progressFulfilled: "0",
        activities: correctActivities,
        workouts: []
      };

      let newState = {
        ...appState,
        weeks: [...appState.weeks, nextWeek]
      };

      if (weeks[weeks.length - 1].from_date === from_date) {
        const newWeeks = weeks;
        newWeeks[newWeeks.length - 1] = nextWeek;
        newState = {
          ...appState,
          weeks: newWeeks
        };
      }

      return newState;
    }

    case "hideWeek": {
      const updatedWeeks = appState.weeks.map(week => {
        if (week.id === value) {
          return { ...week, isHidden: !week.isHidden };
        }
        return week;
      });
      return {
        ...appState,
        weeks: updatedWeeks
      };
    }

    case "addWorkout": {
      const { weeks } = appState;
      const correctWorkout = {
        ...workout,
        minutes: workout.minutes === "" ? "0" : workout.minutes,
        seconds: workout.seconds === "" ? "0" : workout.seconds,
        distance: workout.distance === "" ? "0" : workout.distance
      };
      const { minutes, seconds, distance } = correctWorkout;
      const updatedWeeks =
        weeks &&
        weeks.map(week => {
          if (week.id === value) {
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

            return {
              ...updatedWeek,
              progressFulfilled: countWeekProgress({
                workouts: updatedWeek.workouts,
                activities: updatedWeek.activities
              })
            };
          }
          return week;
        });

      const newState = {
        ...appState,
        weeks: updatedWeeks
      };

      return newState;
    }
    default:
      return appState;
  }
};

export const activitiesReducer = (
  activities,
  { type, value, newValue, valueType }
) => {
  switch (type) {
    case "setActivities":
      return value;
    case "add":
      return [...activities, value];
    case "remove":
      return activities.filter((_, index) => index !== value);
    case "setActivityValue":
      const updatedActivities = activities.map((activity, i) => {
        if (i === value) {
          return { ...activity, [valueType]: newValue };
        }
        return activity;
      });
      return updatedActivities;
    default:
      return activities;
  }
};
