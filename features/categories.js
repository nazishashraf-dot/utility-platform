import { LayersIcon } from "@/components/icons";
import { pakistanHubLink } from "@/features/pakistan/toolsList";

// The one link shown for the converters category - it points at the hub,
// not at any individual converter.
export const convertersHubLink = {
  name: "Converters",
  description: "Currency, length, weight, temperature, volume, time, and digital storage.",
  href: "/converters",
  icon: LayersIcon,
};

// Single source of truth for the top-level category nav (header) and the
// homepage's category grid, so they can't drift out of sync with each
// other. Add new categories here as they get their own hub page.
export const categories = [convertersHubLink, pakistanHubLink];

export default categories;
