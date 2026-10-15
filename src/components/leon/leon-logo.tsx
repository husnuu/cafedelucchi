/**
 * Leon'un Meyhanesi logosu — basılı menüdeki logonun vektör çizimi.
 * Kesme işaretinin yerinde filizlenen yapraklar ve aşağı inen balık.
 * Yazılar Times benzeri serif (--font-logo: Tinos).
 */
export function LeonLogo({ className }: { className?: string }) {
  const blue = "#1f68b0";
  const green = "#7cb342";
  const cut = "#ffffff";

  return (
    <svg viewBox="30 30 1730 770" className={className} role="img" aria-label="Leon'un Meyhanesi">
      <g fill={blue} style={{ fontFamily: "var(--font-logo), 'Times New Roman', serif" }}>
        <text x="40" y="345" fontSize="272" textLength="588" lengthAdjust="spacingAndGlyphs">
          Leon
        </text>
        <text x="672" y="345" fontSize="272" textLength="318" lengthAdjust="spacingAndGlyphs">
          un
        </text>
        <text x="1012" y="556" fontSize="160" textLength="722" lengthAdjust="spacingAndGlyphs">
          Meyhanesi
        </text>
      </g>

      {/* Yapraklar */}
      <path d="M648 205C580 200 450 150 390 50c130-6 232 50 258 155Z" fill={green} />
      <path d="M455 112c60 20 120 48 165 78-48-14-108-40-165-78Z" fill={cut} opacity={0.85} />
      <path d="M656 205c-14-58 4-112 56-142 16 58 0 112-56 142Z" fill={green} />

      {/* Gövde + balık */}
      <path
        d="M649 200h13v150c4 70 30 128 100 168 70 40 170 50 250 108l70 58c-30 34-86 74-160 86-130 22-228-50-262-150-24-70-22-140-11-230Z"
        fill={blue}
      />
      <circle cx="1004" cy="680" r="20" fill={cut} />
      <path d="M945 636c-22 38-24 86-6 124" fill="none" stroke={cut} strokeWidth="9" strokeLinecap="round" />
      <path d="M1086 700l-58 22" fill="none" stroke={cut} strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
}
