// Temperature isn't a simple multiplicative scale, so each unit defines
// toBase/fromBase formulas instead of a factor. Base unit: Celsius.
export const temperatureCategory = {
  id: "temperature",
  name: "Temperature",
  baseUnitId: "celsius",
  units: [
    {
      id: "celsius",
      name: "Celsius",
      toBase: (value) => value,
      fromBase: (value) => value,
    },
    {
      id: "fahrenheit",
      name: "Fahrenheit",
      toBase: (value) => ((value - 32) * 5) / 9,
      fromBase: (value) => (value * 9) / 5 + 32,
    },
    {
      id: "kelvin",
      name: "Kelvin",
      toBase: (value) => value - 273.15,
      fromBase: (value) => value + 273.15,
    },
  ],
};

export default temperatureCategory;
