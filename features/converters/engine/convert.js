// Rounds to a fixed number of significant figures to remove floating-point
// noise (e.g. 0.30000000000000004) without truncating precision for very
// large or very small magnitudes.
function roundToSignificantFigures(num, precision = 12) {
  if (num === 0 || !Number.isFinite(num)) return num;

  const magnitude = Math.floor(Math.log10(Math.abs(num)));
  const factor = Math.pow(10, precision - magnitude - 1);

  return Math.round(num * factor) / factor;
}

/**
 * Converts a value from one unit to another within the same category.
 *
 * @param {number} value - The numeric value to convert.
 * @param {string} fromUnitId - id of the unit `value` is currently in.
 * @param {string} toUnitId - id of the unit to convert to.
 * @param {Array<{id: string, name: string, factor: number}>} unitsArray -
 *   Units for the category, each with a factor relative to the category's base unit.
 * @returns {number} The converted value.
 */
export function convert(value, fromUnitId, toUnitId, unitsArray) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`convert: value must be a finite number, received ${value}`);
  }

  if (!Array.isArray(unitsArray) || unitsArray.length === 0) {
    throw new Error("convert: unitsArray must be a non-empty array of units");
  }

  const fromUnit = unitsArray.find((unit) => unit.id === fromUnitId);
  const toUnit = unitsArray.find((unit) => unit.id === toUnitId);

  if (!fromUnit) {
    throw new Error(`convert: unknown unit id "${fromUnitId}"`);
  }
  if (!toUnit) {
    throw new Error(`convert: unknown unit id "${toUnitId}"`);
  }
  if (!(fromUnit.factor > 0) || !(toUnit.factor > 0)) {
    throw new Error("convert: unit factors must be greater than zero");
  }

  if (fromUnitId === toUnitId) return value;

  const valueInBaseUnits = value * fromUnit.factor;
  const result = valueInBaseUnits / toUnit.factor;

  return roundToSignificantFigures(result);
}

export default convert;
