export const getContinentFromCoords = (lat: number, lon: number): string => {
  if (lat > 0 && lon < -30) return "North America";
  if (lat < 0 && lon < -30) return "South America";
  if (lat > 35 && lon > -30 && lon < 60) return "Europe";
  if (lat > -35 && lat < 35 && lon > -20 && lon < 50) return "Africa";
  if (lat > 20 && lon > 50 && lon < 150) return "Asia";
  if (lat < 0 && lon > 110) return "Australia";
  if (lat < -60) return "Antarctica";
  return "Unknown";
};
