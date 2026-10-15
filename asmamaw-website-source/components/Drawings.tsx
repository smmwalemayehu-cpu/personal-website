/* Engineering-drawing artwork: pavement cross-sections for the research page
   and plan-view placeholders for projects that have no photographs yet. */

/* ---------- Pavement cross-sections (research page) ---------- */

type Layer = { h: number; fill: string; label: string; joint?: boolean };

function Section({ title, layers, label }: { title: string; layers: Layer[]; label: string }) {
  const w = 180;
  let y = 0;
  return (
    <svg viewBox="0 0 340 262" className="block w-full h-auto" role="img" aria-label={label}>
      <defs>
        <pattern id="gravel" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#dfe4ea" />
          <circle cx="3" cy="4" r="1.6" fill="#b5bfcc" /><circle cx="10" cy="9" r="1.3" fill="#b5bfcc" /><circle cx="6" cy="12" r="0.9" fill="#b5bfcc" />
        </pattern>
        <pattern id="soil" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#eef1f4" />
          <path d="M0 16 L16 0" stroke="#c9d1db" strokeWidth="1" />
        </pattern>
        <pattern id="concrete" width="18" height="18" patternUnits="userSpaceOnUse">
          <rect width="18" height="18" fill="#c3cfe0" />
          <path d="M4 5 l3 2 -3 1z M12 12 l2 3 -3 0z" fill="#9fb0c8" />
        </pattern>
      </defs>
      <text x="0" y="18" fontSize="19" fontWeight="600" fill="#0b1f3a" fontFamily="var(--font-serif)">{title}</text>
      <g transform="translate(0,36)">
        {layers.map((l) => {
          const top = y;
          y += l.h;
          return (
            <g key={l.label}>
              <rect x="0" y={top} width={w} height={l.h} fill={l.fill} />
              {l.joint && <line x1={w / 2} x2={w / 2} y1={top} y2={top + l.h} stroke="#0b1f3a" strokeOpacity="0.5" strokeDasharray="4 3" />}
              <line x1={w + 4} x2={w + 14} y1={top + l.h / 2} y2={top + l.h / 2} stroke="#b08d57" />
              <text x={w + 20} y={top + l.h / 2 + 5} fontSize="15" fill="#4a5669" fontFamily="var(--font-sans)">{l.label}</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export function PavementSections() {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <Section
        title="Rigid pavement"
        label="Rigid pavement cross-section: concrete slab on a base course over subgrade."
        layers={[
          { h: 62, fill: "url(#concrete)", label: "Concrete slab", joint: true },
          { h: 40, fill: "url(#gravel)", label: "Base course" },
          { h: 120, fill: "url(#soil)", label: "Subgrade" },
        ]}
      />
      <Section
        title="Flexible pavement"
        label="Flexible pavement cross-section: asphalt surface over base and sub-base courses over subgrade."
        layers={[
          { h: 24, fill: "#213d66", label: "Asphalt surface" },
          { h: 44, fill: "url(#gravel)", label: "Base course" },
          { h: 40, fill: "#e7ebf0", label: "Sub-base course" },
          { h: 114, fill: "url(#soil)", label: "Subgrade" },
        ]}
      />
    </div>
  );
}

/* ---------- Project placeholder: plan view on drafting grid ---------- */

export function PlanViewPlaceholder({ variant = 0 }: { variant?: number }) {
  const roads = [
    "M-10,150 C80,140 120,60 220,70 S360,150 420,110",
    "M-10,60 C90,70 150,160 250,140 S360,40 420,70",
    "M-10,120 C60,120 110,120 170,90 S300,30 420,40",
  ];
  const d = roads[variant % roads.length];
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="block w-full h-full" aria-hidden="true">
      <defs>
        <pattern id={`grid-${variant}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#ffffff" strokeOpacity="0.07" />
        </pattern>
      </defs>
      <rect width="400" height="200" fill="#0b1f3a" />
      <rect width="400" height="200" fill={`url(#grid-${variant})`} />
      <path d={d} fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="16" />
      <path d={d} fill="none" stroke="#d6b880" strokeWidth="1.5" strokeDasharray="8 7" />
    </svg>
  );
}
