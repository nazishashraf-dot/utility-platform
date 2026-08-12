import {
  ClockIcon,
  CoinsIcon,
  DropletIcon,
  HardDriveIcon,
  RulerIcon,
  ScaleIcon,
  ThermometerIcon,
} from "@/components/icons";

// Single source of truth for the live converter tools, so the header nav
// and homepage grid can't drift out of sync with each other.
export const converterTools = [
  {
    name: "Currency",
    description: "Convert between major world currencies using live exchange rates.",
    href: "/converters/currency",
    icon: CoinsIcon,
  },
  {
    name: "Length",
    description: "Convert between kilometers, miles, meters, feet, and more.",
    href: "/converters/length",
    icon: RulerIcon,
  },
  {
    name: "Weight",
    description: "Convert between kilograms, pounds, grams, and ounces.",
    href: "/converters/weight",
    icon: ScaleIcon,
  },
  {
    name: "Temperature",
    description: "Convert between Celsius, Fahrenheit, and Kelvin.",
    href: "/converters/temperature",
    icon: ThermometerIcon,
  },
  {
    name: "Volume",
    description: "Convert between liters, gallons, cups, and fluid ounces.",
    href: "/converters/volume",
    icon: DropletIcon,
  },
  {
    name: "Time",
    description: "Convert between seconds, minutes, hours, days, and weeks.",
    href: "/converters/time",
    icon: ClockIcon,
  },
  {
    name: "Digital Storage",
    description: "Convert between bytes, kilobytes, megabytes, gigabytes, and terabytes.",
    href: "/converters/digital-storage",
    icon: HardDriveIcon,
  },
];

export default converterTools;
