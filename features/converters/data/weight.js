// Conversion factor = number of base units (kilograms) equal to 1 of this unit.
export const weightCategory = {
  id: "weight",
  name: "Weight",
  baseUnitId: "kilogram",
  units: [
    { id: "kilogram", name: "Kilogram", factor: 1 },
    { id: "pound", name: "Pound", factor: 0.45359237 },
    { id: "gram", name: "Gram", factor: 0.001 },
    { id: "ounce", name: "Ounce", factor: 0.0283495231 },
  ],
};

export default weightCategory;
