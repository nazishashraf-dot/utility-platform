// Conversion factor = number of base units (liters) equal to 1 of this unit.
export const volumeCategory = {
  id: "volume",
  name: "Volume",
  baseUnitId: "liter",
  units: [
    { id: "liter", name: "Liter", factor: 1 },
    { id: "milliliter", name: "Milliliter", factor: 0.001 },
    { id: "gallon", name: "Gallon (US)", factor: 3.785411784 },
    { id: "fluid-ounce", name: "Fluid Ounce (US)", factor: 0.0295735295625 },
    { id: "cup", name: "Cup", factor: 0.2365882365 },
  ],
};

export default volumeCategory;
