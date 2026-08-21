// Simple lucide-style inline SVGs (stroke-based, 24x24, round caps) so we
// don't need to add lucide-react as a dependency for a handful of icons.
function IconBase({ className, children }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function CoinsIcon({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="9" cy="9" r="6" />
      <path d="M14.5 9.5c2.9.4 5.5 2.2 5.5 5.5 0 3.31-3.13 6-7 6-2.9 0-5.4-1.5-6.4-3.6" />
    </IconBase>
  );
}

export function RulerIcon({ className }) {
  return (
    <IconBase className={className}>
      <rect x="3" y="7" width="18" height="10" rx="2" />
      <path d="M7 7v3M11 7v4M15 7v3M19 7v4" />
    </IconBase>
  );
}

export function ScaleIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M12 3v18" />
      <path d="M5 7h14" />
      <path d="M5 7 2.5 13.5a2.5 2.5 0 0 0 5 0Z" />
      <path d="M19 7l-2.5 6.5a2.5 2.5 0 0 0 5 0Z" />
    </IconBase>
  );
}

export function ThermometerIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M14 14.76V4a2 2 0 1 0-4 0v10.76a4 4 0 1 0 4 0Z" />
      <path d="M12 10v3" />
    </IconBase>
  );
}

export function DropletIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M12 2.7s6 7 6 11.3a6 6 0 0 1-12 0c0-4.3 6-11.3 6-11.3Z" />
    </IconBase>
  );
}

export function ClockIcon({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </IconBase>
  );
}

export function HardDriveIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M5.5 5.5 3 12v6.5A1.5 1.5 0 0 0 4.5 20h15a1.5 1.5 0 0 0 1.5-1.5V12l-2.5-6.5A1.5 1.5 0 0 0 17.1 4.5H6.9a1.5 1.5 0 0 0-1.4 1Z" />
      <path d="M3 12h18" />
      <path d="M7 16h.01M11 16h.01" />
    </IconBase>
  );
}

export function LayersIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </IconBase>
  );
}

export function GemIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M6 3h12l3 6-9 12L3 9Z" />
      <path d="M3 9h18" />
      <path d="M9 3 8.5 9l3.5 12 3.5-12L15 3" />
    </IconBase>
  );
}

export function CalculatorIcon({ className }) {
  return (
    <IconBase className={className}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8" />
      <path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01" />
    </IconBase>
  );
}

export function PercentIcon({ className }) {
  return (
    <IconBase className={className}>
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </IconBase>
  );
}

export function FolderIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M4 6a2 2 0 0 1 2-2h4l2 2.5h6a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
    </IconBase>
  );
}

export function ImageIcon({ className }) {
  return (
    <IconBase className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
    </IconBase>
  );
}

export function LandmarkIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="m3 8 9-5 9 5" />
      <path d="M4 8h16v2H4z" />
      <path d="M6 10v8M10 10v8M14 10v8M18 10v8" />
      <path d="M3 21h18" />
    </IconBase>
  );
}
