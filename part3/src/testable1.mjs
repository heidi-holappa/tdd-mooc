const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmas(today = getToday(), christmasDay = getChristmasDay()) {
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  const daysBetween = Math.floor(diffMillis / millisPerDay);
  return daysBetween;
}

function getToday() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return today;
}

function getChristmasDay() {
  const now = new Date();
  const christmasDay = new Date(now.getFullYear(), 12 - 1, 25);
  return christmasDay;
}
