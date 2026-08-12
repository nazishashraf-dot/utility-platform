"use client";

import ConverterPanel from "@/components/ConverterPanel";
import { temperatureCategory } from "@/features/converters/data/temperature";

// Renders ConverterPanel from within client code so temperatureCategory
// (whose units carry toBase/fromBase functions) never has to cross the
// server -> client props boundary, where functions can't be serialized.
export default function TemperatureConverter() {
  return <ConverterPanel category={temperatureCategory} />;
}
