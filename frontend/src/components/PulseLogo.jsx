export default function PulseLogo({ size = "md", showText = true }) {
  const dims = size === "sm" ? { w: 28, h: 20 } : size === "lg" ? { w: 44, h: 30 } : { w: 34, h: 24 };

  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={dims.w}
        height={dims.h}
        viewBox="0 0 60 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pulse-line shrink-0"
      >
        <path
          d="M0 16 H14 L20 4 L26 28 L32 10 L37 16 H60"
          stroke="url(#pulseGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="pulseGradient" x1="0" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
      {showText && (
        <span className="font-display font-semibold text-lg tracking-tight text-ink">
          Reg<span className="text-violet">Pulse</span>
        </span>
      )}
    </div>
  );
}
