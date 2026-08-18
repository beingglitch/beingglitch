// Counts full years since `startYear`, ticking over every July (month index 6).
export function getYearsOfExperience(startYear: number) {
  const now = new Date();
  const anniversaryPassed = now.getMonth() >= 6;
  return now.getFullYear() - startYear - (anniversaryPassed ? 0 : 1);
}
