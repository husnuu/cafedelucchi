/**
 * Cafe de Lucchi amblemi — Instagram profilindeki logodan vektöre aktarıldı
 * (bordo halka, cloche ve çatal-bıçak, ortada isim şeridi, altta "Cafe • Lounge • Bar").
 * Orijinal vektör dosyası gelirse admin panelinden yüklenen görsel bunun yerini alacak.
 */
export function LogoBadge({ className, title = "Cafe de Lucchi" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={title} className={className}>
      <circle cx="100" cy="100" r="74" fill="#fff" stroke="var(--brand)" strokeWidth="7" />
      <circle cx="100" cy="100" r="66" fill="none" stroke="var(--brand)" strokeOpacity="0.35" strokeWidth="1" />

      {/* Çatal, bıçak, kaşık */}
      <g fill="#2a1a20">
        <rect x="83" y="46" width="3" height="26" rx="1.5" />
        <rect x="79" y="44" width="1.6" height="11" rx="0.8" />
        <rect x="83" y="44" width="1.6" height="9" rx="0.8" />
        <rect x="87" y="44" width="1.6" height="11" rx="0.8" />
        <path d="M98 70 V48 c0-4 6-6 6 4 v18 z" />
        <ellipse cx="116" cy="51" rx="4.5" ry="6.5" />
        <rect x="114.6" y="54" width="2.8" height="18" rx="1.4" />
      </g>
      {/* Cloche */}
      <path d="M68 86 a32 22 0 0 1 64 0 z" fill="#2a1a20" />
      <circle cx="100" cy="62.5" r="2.6" fill="#2a1a20" />

      {/* İsim şeridi */}
      <rect x="8" y="84" width="184" height="32" rx="16" fill="var(--brand)" />
      <rect x="11" y="87" width="178" height="26" rx="13" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="0.8" />
      <text
        x="100"
        y="105.5"
        textAnchor="middle"
        fill="#fff"
        fontSize="17"
        fontWeight="700"
        letterSpacing="0.6"
        style={{ fontFamily: "var(--font-logo)" }}
      >
        · Cafe de Lucchi ·
      </text>

      <text
        x="100"
        y="134"
        textAnchor="middle"
        fill="var(--brand)"
        fontSize="10.5"
        fontStyle="italic"
        letterSpacing="0.6"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Cafe • Lounge • Bar
      </text>
    </svg>
  );
}
