/*
Observations:
Review if this should be refactored and if Date should be replaced with Temporal.PlainDate
Consider corner/edge cases of testing code dealing with time. 
- Is the test result same in all situations?
- Is day-light saving accounted for? Ensure daylight saving does not affect UTC
- Extreme edge-case: What if the times are exactly the same?
Function is long and does multiple things. Separate into multiple smaller functions? 
- Perhaps helps testing. Could test cases then have set values? 
const today has the date for day before. Misleading
*/

const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmas() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const christmasDay = new Date(now.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}
