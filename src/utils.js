import moment from "moment";

export function getNextWeekNumber() {
  return moment()
    .add(7, "days")
    .week();
}

export function getCurrentWeekNumber() {
  return moment().week();
}

export function getNextWeekFromToDates() {
  const from_date = moment()
    .add(7, "days")
    .startOf("isoWeek")
    .unix();
  const to_date = moment()
    .add(7, "days")
    .endOf("isoWeek")
    .unix();

  return { from_date, to_date };
}

export function getCurrentWeekFromToDates() {
  const from_date = moment()
    .startOf("isoWeek")
    .unix();
  const to_date = moment()
    .endOf("isoWeek")
    .unix();

  return { from_date, to_date };
}

export function isWeekNextWeek(week) {
  return (
    week &&
    week.from_date ===
      moment()
        .add(7, "days")
        .startOf("isoWeek")
        .format("DD.MM.YYYY")
  );
}

export function countWeekProgress({ activities, workouts }) {
  const weekProgressPercentages = [];

  activities.map(activity => {
    let seconds = 0;
    let distance = 0;

    workouts &&
      workouts.map(workout => {
        if (workout.type === activity.type) {
          seconds += workout.minutes * 60 + workout.seconds;
          distance += workout.distance;
        }
        return workout;
      });

    const hoursProgressPercentage = (seconds / (activity.minutes * 60)) * 100;
    const distanceProgressPercentage = Math.round(
      (distance / activity.distance) * 100,
      2
    );
    let betterProgress = hoursProgressPercentage;
    if (
      distance !== 0 &&
      distanceProgressPercentage > hoursProgressPercentage
    ) {
      betterProgress = distanceProgressPercentage;
    }

    weekProgressPercentages.push(betterProgress);

    return activities;
  });

  if (weekProgressPercentages.length > 0) {
    const totalProgress = weekProgressPercentages.reduce(
      (total, percentage) => total + percentage,
      0
    );
    return Math.round(totalProgress / weekProgressPercentages.length).toFixed(
      0
    );
  }

  return "0";
}

export function getUpdatedActivities(activities, workouts) {
  return activities.map(activity => {
    const activityWorkouts = workouts.filter(
      w => w.type.toLowerCase() === activity.type.toLowerCase()
    );
    let totalWorkoutSeconds = 0;
    let totalWorkoutDistance = 0;

    activityWorkouts &&
      activityWorkouts.forEach(workout => {
        totalWorkoutSeconds +=
          parseInt(workout.minutes, 10) * 60 + parseInt(workout.seconds, 10);
        totalWorkoutDistance += parseInt(workout.distance, 10);
      });

    const isFulfilled =
      activity.distance !== 0
        ? totalWorkoutSeconds >= parseInt(activity.minutes, 10) * 60 ||
          totalWorkoutDistance >= parseInt(activity.distance, 10)
        : totalWorkoutSeconds >= parseInt(activity.minutes, 10) * 60;
    const progressMinutesMissing = (
      (parseInt(activity.minutes, 10) * 60 - totalWorkoutSeconds) /
      60
    ).toFixed(0);
    const progressDistanceMissing =
      parseInt(activity.distance, 10) - totalWorkoutDistance;

    return {
      ...activity,
      isFulfilled,
      progressMinutesMissing,
      progressDistanceMissing
    };
  });
}

export function isCurrentWeek(week) {
  return (
    week &&
    week.from_date &&
    formatDate(week.from_date) ===
      moment()
        .startOf("isoWeek")
        .format("DD.MM.YYYY")
  );
}

export function getIconFromWorkoutType(type) {
  switch (type.toLowerCase()) {
    case "running":
      return "/icons/running.svg";

    case "biking":
      return "/icons/biking.svg";

    case "swimming":
      return "/icons/swimming.svg";

    case "gym":
      return "/icons/fitness.svg";

    case "other":
      return "/icons/ball.svg";

    default:
      return "/icons/fitness.svg";
  }
}

export function getFulfilledWorkoutIcon(isFulfilled) {
  if (isFulfilled) {
    return "/icons/check.svg";
  }

  return "/icons/close.svg";
}

export function formatDate(unix) {
  return moment.unix(unix).format("DD.MM.YYYY");
}

export function formatHours(hours) {
  return `${hours} minutes`;
}

export function formatDistance(distance) {
  return `${distance} km`;
}

export function getCurrentWeekDays(week) {
  const { from_date } = week;
  const daysOptions = [];
  for (let i = 0; i < 7; i++) {
    const next = moment.unix(from_date).add(i, "day");
    const dayInWeek = getWeekDayFromNumber(next.isoWeekday());
    const date = next.format("DD.MM.YYYY");
    daysOptions.push({ name: `${dayInWeek} - ${date}`, value: date });
  }

  return daysOptions;
}

export function getWeekDayFromNumber(dayNumber) {
  switch (dayNumber) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
    default:
      return "";
  }
}

export function getTodayDate() {
  return moment().format("DD.MM.YYYY");
}

export function canNextWeekBeCreated(weeks) {
  let canCreateNextWeek = true;
  const lastCreatedWeek = weeks[weeks.length - 1];
  if (lastCreatedWeek) {
    canCreateNextWeek = !isWeekNextWeek(lastCreatedWeek);
  }

  return canCreateNextWeek;
}

export function getPreviousWeeks(weeks) {
  const canCreateNextWeek = canNextWeekBeCreated(weeks);
  const withoutNext = canCreateNextWeek
    ? weeks
    : weeks.slice(0, weeks.length - 1);

  const hasCurrent = isCurrentWeek(withoutNext[withoutNext.length - 1]);
  const withoutCurrentAndNext = hasCurrent
    ? withoutNext.slice(0, withoutNext.length - 1)
    : withoutNext;

  return withoutCurrentAndNext;
}

export function formatSeconds(seconds) {
  return seconds.toString().length === 1 ? `0${seconds}` : seconds;
}

export function shouldShowDistance(type, types) {
  const current = types.filter(t => t.name === type)[0];
  if (!current) {
    return true;
  }

  return !current.hideDistance;
}
