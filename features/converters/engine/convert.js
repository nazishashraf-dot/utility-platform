// Rounds to a fixed number of significant figures to remove floating-point
// noise (e.g. 0.30000000000000004) without truncating precision for very
// large or very small magnitudes.
function roundToSignificantFigures(num, precision = 12) {
  if (num === 0 || !Number.isFinite(num)) return num;

  const magnitude = Math.floor(Math.log10(Math.abs(num)));
  const factor = Math.pow(10, precision - magnitude - 1);

  return Math.round(num * factor) / factor;
}

// A unit is either factor-based (multiply/divide relative to the base unit)
// or formula-based (arbitrary toBase/fromBase functions, e.g. temperature).
function isFactorUnit(unit) {
  return typeof unit.factor === "number";
}

function isFormulaUnit(unit) {
  return typeof unit.toBase === "function" && typeof unit.fromBase === "function";
}

function assertValidUnit(unit) {
  if (isFactorUnit(unit)) {
    if (!(unit.factor > 0)) {
      throw new Error(`convert: unit "${unit.id}" factor must be greater than zero`);
    }
    return;
  }

  if (!isFormulaUnit(unit)) {
    throw new Error(
      `convert: unit "${unit.id}" must define either a numeric "factor" or both "toBase" and "fromBase" functions`
    );
  }
}

function toBaseValue(unit, value) {
  return isFactorUnit(unit) ? value * unit.factor : unit.toBase(value);
}

function fromBaseValue(unit, baseValue) {
  return isFactorUnit(unit) ? baseValue / unit.factor : unit.fromBase(baseValue);
}

/**
 * Converts a value from one unit to another within the same category.
 *
 * @param {number} value - The numeric value to convert.
 * @param {string} fromUnitId - id of the unit `value` is currently in.
 * @param {string} toUnitId - id of the unit to convert to.
 * @param {Array<{id: string, name: string, factor?: number, toBase?: (value: number) => number, fromBase?: (value: number) => number}>} unitsArray -
 *   Units for the category. Each unit is either factor-based (a `factor` relative
 *   to the category's base unit) or formula-based (`toBase`/`fromBase` functions,
 *   for conversions that aren't a simple multiplication, e.g. temperature).
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

  assertValidUnit(fromUnit);
  assertValidUnit(toUnit);

  if (fromUnitId === toUnitId) return value;

  const baseValue = toBaseValue(fromUnit, value);
  const result = fromBaseValue(toUnit, baseValue);

  return roundToSignificantFigures(result);
}

export default convert;
