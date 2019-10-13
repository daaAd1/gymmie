export function getTotalHoursAndDistance(workouts) {
  let totalSeconds = 0;
  let totalDistance = 0;

  workouts &&
    workouts.forEach(workout => {
      const { minutes, seconds, distance } = workout;
      totalSeconds += minutes * 60 + seconds;
      totalDistance += distance;
    });

  return {
    totalHours: (totalSeconds / 3600).toFixed(0),
    totalDistance: totalDistance.toFixed(0)
  };
}

export function getTotalPlannedHoursAndDistance(activities) {
  let totalPlannedSeconds = 0;
  let totalPlannedDistance = 0;

  activities &&
    activities.forEach(activity => {
      const { minutes, distance } = activity;
      totalPlannedSeconds += minutes * 60;
      totalPlannedDistance += distance;
    });

  return {
    totalPlannedHours: (totalPlannedSeconds / 3600).toFixed(0),
    totalPlannedDistance: totalPlannedDistance.toFixed(0)
  };
}

export function getTotalStatsForSports(workouts, activities, sport) {
  let totalSeconds = 0;
  let totalDistance = 0;
  let totalPlannedSeconds = 0;
  let totalPlannedDistance = 0;

  const sportWorkouts = workouts.filter(
    w => w.type.toLowerCase() === sport.toLowerCase()
  );
  const sportActivities = activities.filter(
    a => a.type.toLowerCase() === sport.toLowerCase()
  );

  sportWorkouts &&
    sportWorkouts.forEach(workout => {
      const { minutes, seconds, distance } = workout;
      totalSeconds += minutes * 60 + seconds;
      totalDistance += distance;
    });

  sportActivities &&
    sportActivities.forEach(activity => {
      const { minutes, distance } = activity;
      totalPlannedSeconds += minutes * 60;
      totalPlannedDistance += distance;
    });

  return {
    totalHours: (totalSeconds / 3600).toFixed(0),
    totalDistance,
    totalPlannedHours: (totalPlannedSeconds / 3600).toFixed(0),
    totalPlannedDistance
  };
}
