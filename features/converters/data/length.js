// Conversion factor = number of base units (meters) equal to 1 of this unit.
export const lengthCategory = {
  id: "length",
  name: "Length",
  baseUnitId: "meter",
  units: [
    { id: "kilometer", name: "Kilometer", factor: 1000 },
    { id: "mile", name: "Mile", factor: 1609.344 },
    { id: "meter", name: "Meter", factor: 1 },
    { id: "foot", name: "Foot", factor: 0.3048 },
    { id: "centimeter", name: "Centimeter", factor: 0.01 },
    { id: "inch", name: "Inch", factor: 0.0254 },
    { id: "yard", name: "Yard", factor: 0.9144 },
  ],
};

export default lengthCategory;
