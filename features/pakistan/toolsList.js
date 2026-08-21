import { CalculatorIcon, GemIcon, LandmarkIcon } from "@/components/icons";

// Single source of truth for the Pakistan Tools hub, so the hub page, the
// homepage card, and the header nav link can't drift out of sync. New
// Pakistan-specific tools (electricity bill estimator, etc.) get added here
// and automatically show up on the hub page.
export const pakistanTools = [
  {
    name: "Gold & Silver Rates",
    description: "Live gold and silver rates per tola, converted to PKR.",
    href: "/pakistan/gold-silver-rates",
    icon: GemIcon,
  },
  {
    name: "Zakat Calculator",
    description: "Estimate your Zakat from cash, gold, silver, and other assets.",
    href: "/pakistan/zakat-calculator",
    icon: CalculatorIcon,
  },
];

// The one link the header and homepage grid show for this section - it
// points at the hub, not at any individual tool.
export const pakistanHubLink = {
  name: "Pakistan Tools",
  description: "Pakistan-specific tools: live gold and silver rates, and more to come.",
  href: "/pakistan",
  icon: LandmarkIcon,
};

export default pakistanTools;
