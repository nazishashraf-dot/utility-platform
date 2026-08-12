// Conversion factor = number of base units (seconds) equal to 1 of this unit.
export const timeCategory = {
  id: "time",
  name: "Time",
  baseUnitId: "second",
  units: [
    { id: "second", name: "Second", factor: 1 },
    { id: "minute", name: "Minute", factor: 60 },
    { id: "hour", name: "Hour", factor: 3600 },
    { id: "day", name: "Day", factor: 86400 },
    { id: "week", name: "Week", factor: 604800 },
  ],
};

export default timeCategory;
