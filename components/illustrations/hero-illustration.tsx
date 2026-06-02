export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-md mx-auto"
      aria-hidden="true"
    >
      {/* Background blobs */}
      <ellipse cx="370" cy="110" rx="170" ry="130" fill="#EDE9FE" opacity="0.6" />
      <ellipse cx="90" cy="320" rx="110" ry="85" fill="#DBEAFE" opacity="0.5" />
      <ellipse cx="400" cy="350" rx="80" ry="60" fill="#D1FAE5" opacity="0.4" />

      {/* Card 1: 用户旅程地图 — Blue */}
      <rect x="20" y="60" width="108" height="76" rx="10" fill="white" stroke="#BFDBFE" strokeWidth="1.5" />
      <rect x="20" y="60" width="108" height="22" rx="10" fill="#3B82F6" />
      <rect x="20" y="72" width="108" height="10" fill="#3B82F6" />
      <rect x="32" y="67" width="52" height="7" rx="3.5" fill="white" opacity="0.85" />
      <rect x="32" y="92" width="76" height="5" rx="2.5" fill="#EFF6FF" />
      <rect x="32" y="103" width="60" height="5" rx="2.5" fill="#EFF6FF" />
      <rect x="32" y="114" width="68" height="5" rx="2.5" fill="#EFF6FF" />
      <rect x="32" y="125" width="44" height="7" rx="3.5" fill="#BFDBFE" />

      {/* Card 2: 产品需求PRD — Purple */}
      <rect x="350" y="30" width="108" height="76" rx="10" fill="white" stroke="#DDD6FE" strokeWidth="1.5" />
      <rect x="350" y="30" width="108" height="22" rx="10" fill="#8B5CF6" />
      <rect x="350" y="42" width="108" height="10" fill="#8B5CF6" />
      <rect x="362" y="37" width="52" height="7" rx="3.5" fill="white" opacity="0.85" />
      <rect x="362" y="62" width="76" height="5" rx="2.5" fill="#F5F3FF" />
      <rect x="362" y="73" width="60" height="5" rx="2.5" fill="#F5F3FF" />
      <rect x="362" y="84" width="68" height="5" rx="2.5" fill="#F5F3FF" />
      <rect x="362" y="95" width="44" height="7" rx="3.5" fill="#DDD6FE" />

      {/* Card 3: 前端设计 — Amber */}
      <rect x="10" y="268" width="108" height="76" rx="10" fill="white" stroke="#FDE68A" strokeWidth="1.5" />
      <rect x="10" y="268" width="108" height="22" rx="10" fill="#F59E0B" />
      <rect x="10" y="280" width="108" height="10" fill="#F59E0B" />
      <rect x="22" y="275" width="52" height="7" rx="3.5" fill="white" opacity="0.85" />
      <rect x="22" y="300" width="76" height="5" rx="2.5" fill="#FFFBEB" />
      <rect x="22" y="311" width="60" height="5" rx="2.5" fill="#FFFBEB" />
      <rect x="22" y="322" width="68" height="5" rx="2.5" fill="#FFFBEB" />
      <rect x="22" y="333" width="44" height="7" rx="3.5" fill="#FDE68A" />

      {/* Card 4: 后端设计 — Pink */}
      <rect x="360" y="278" width="108" height="76" rx="10" fill="white" stroke="#FBCFE8" strokeWidth="1.5" />
      <rect x="360" y="278" width="108" height="22" rx="10" fill="#EC4899" />
      <rect x="360" y="290" width="108" height="10" fill="#EC4899" />
      <rect x="372" y="285" width="52" height="7" rx="3.5" fill="white" opacity="0.85" />
      <rect x="372" y="310" width="76" height="5" rx="2.5" fill="#FDF2F8" />
      <rect x="372" y="321" width="60" height="5" rx="2.5" fill="#FDF2F8" />
      <rect x="372" y="332" width="68" height="5" rx="2.5" fill="#FDF2F8" />
      <rect x="372" y="343" width="44" height="7" rx="3.5" fill="#FBCFE8" />

      {/* Main document — center */}
      <rect x="158" y="76" width="164" height="216" rx="14" fill="#6366F1" opacity="0.07" />
      <rect x="154" y="72" width="164" height="216" rx="14" fill="white" stroke="#E2E8F0" strokeWidth="2" />
      <rect x="154" y="72" width="164" height="46" rx="14" fill="#6366F1" />
      <rect x="154" y="104" width="164" height="14" fill="#6366F1" />
      <rect x="170" y="83" width="84" height="9" rx="4.5" fill="white" opacity="0.9" />
      <rect x="170" y="96" width="56" height="6" rx="3" fill="white" opacity="0.5" />
      <rect x="170" y="132" width="132" height="6" rx="3" fill="#F1F5F9" />
      <rect x="170" y="145" width="108" height="6" rx="3" fill="#F1F5F9" />
      <rect x="170" y="158" width="120" height="6" rx="3" fill="#F1F5F9" />
      <rect x="170" y="176" width="132" height="6" rx="3" fill="#E2E8F0" />
      <rect x="170" y="189" width="92" height="6" rx="3" fill="#E2E8F0" />
      <rect x="170" y="202" width="114" height="6" rx="3" fill="#E2E8F0" />
      <rect x="170" y="220" width="132" height="6" rx="3" fill="#F1F5F9" />
      <rect x="170" y="233" width="100" height="6" rx="3" fill="#F1F5F9" />
      <rect x="170" y="252" width="52" height="22" rx="8" fill="#6366F1" opacity="0.12" />
      <rect x="230" y="252" width="60" height="22" rx="8" fill="#6366F1" opacity="0.12" />

      {/* AI badge above main doc */}
      <rect x="174" y="48" width="92" height="28" rx="14" fill="#4F46E5" />
      <path d="M191 56 L187 67 L193 67 L189 78 L202 63 L195 63 L199 52 Z" fill="#FCD34D" />
      <rect x="207" y="57" width="46" height="7" rx="3.5" fill="white" opacity="0.9" />
      <rect x="207" y="67" width="34" height="5" rx="2.5" fill="white" opacity="0.55" />

      {/* Card 5: 数据库设计 — Green */}
      <rect x="186" y="322" width="108" height="70" rx="10" fill="white" stroke="#BBF7D0" strokeWidth="1.5" />
      <rect x="186" y="322" width="108" height="20" rx="10" fill="#10B981" />
      <rect x="186" y="332" width="108" height="10" fill="#10B981" />
      <rect x="198" y="327" width="52" height="6" rx="3" fill="white" opacity="0.85" />
      <rect x="198" y="352" width="76" height="4" rx="2" fill="#ECFDF5" />
      <rect x="198" y="362" width="60" height="4" rx="2" fill="#ECFDF5" />
      <rect x="198" y="376" width="44" height="8" rx="4" fill="#BBF7D0" />

      {/* Dashed connection lines */}
      <line x1="128" y1="106" x2="154" y2="136" stroke="#C7D2FE" strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1="350" y1="74" x2="318" y2="112" stroke="#DDD6FE" strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1="118" y1="304" x2="154" y2="278" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1="360" y1="314" x2="318" y2="278" stroke="#FBCFE8" strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1="240" y1="322" x2="240" y2="288" stroke="#BBF7D0" strokeWidth="1.5" strokeDasharray="5 4" />

      {/* Sparkle stars */}
      <path d="M432 46 L435 36 L438 46 L448 49 L438 52 L435 62 L432 52 L422 49 Z" fill="#FBBF24" />
      <path d="M4 178 L6.5 170 L9 178 L17 180.5 L9 183 L6.5 191 L4 183 L-4 180.5 Z" fill="#A78BFA" />
      <path d="M460 218 L461.8 212 L463.6 218 L469 219.8 L463.6 221.6 L461.8 227 L460 221.6 L454.6 219.8 Z" fill="#34D399" />
      <path d="M68 38 L69.8 32 L71.6 38 L77 39.8 L71.6 41.6 L69.8 47 L68 41.6 L62.6 39.8 Z" fill="#60A5FA" />

      {/* Decorative dots */}
      <circle cx="452" cy="308" r="7" fill="#FDE68A" opacity="0.7" />
      <circle cx="28" cy="238" r="5" fill="#C7D2FE" opacity="0.8" />
      <circle cx="462" cy="148" r="4" fill="#FBCFE8" opacity="0.7" />
      <circle cx="108" cy="392" r="8" fill="#D1FAE5" opacity="0.8" />
    </svg>
  );
}
