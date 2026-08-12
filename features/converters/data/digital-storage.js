// Conversion factor = number of base units (bytes) equal to 1 of this unit.
// Uses the binary (1024-based) convention, the technically correct one for
// digital storage (as opposed to the decimal 1000-based SI prefixes).
export const digitalStorageCategory = {
  id: "digital-storage",
  name: "Digital Storage",
  baseUnitId: "byte",
  units: [
    { id: "byte", name: "Byte", factor: 1 },
    { id: "kilobyte", name: "Kilobyte", factor: 1024 },
    { id: "megabyte", name: "Megabyte", factor: 1024 ** 2 },
    { id: "gigabyte", name: "Gigabyte", factor: 1024 ** 3 },
    { id: "terabyte", name: "Terabyte", factor: 1024 ** 4 },
  ],
};

export default digitalStorageCategory;
