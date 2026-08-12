// Shared by ConverterPanel and CurrencyConverterPanel so both display
// numbers the same way: up to 6 decimals normally, exponential notation
// for extremely large/small magnitudes.
export function formatNumber(num) {
  const abs = Math.abs(num);
  if (abs !== 0 && (abs < 1e-6 || abs >= 1e15)) {
    return num.toExponential(6);
  }
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 6 }).format(
    num
  );
}

export default formatNumber;
