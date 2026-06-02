export function StepIllustrationDescribe() {
  return (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-18 mx-auto mb-4" aria-hidden="true">
      {/* Paper / text area */}
      <rect x="20" y="10" width="80" height="60" rx="8" fill="#DBEAFE" />
      <rect x="20" y="10" width="80" height="16" rx="8" fill="#3B82F6" />
      <rect x="20" y="18" width="80" height="8" fill="#3B82F6" />
      <rect x="32" y="14" width="40" height="6" rx="3" fill="white" opacity="0.8" />
      <rect x="32" y="36" width="56" height="5" rx="2.5" fill="#BFDBFE" />
      <rect x="32" y="47" width="44" height="5" rx="2.5" fill="#BFDBFE" />
      <rect x="32" y="58" width="50" height="5" rx="2.5" fill="#BFDBFE" />
      {/* Pencil */}
      <rect x="78" y="48" width="10" height="28" rx="2" fill="#F59E0B" transform="rotate(-35 78 48)" />
      <polygon points="88,68 92,76 84,74" fill="#1E293B" transform="rotate(-35 88 68)" />
      <rect x="78" y="48" width="10" height="5" rx="1" fill="#FDE68A" transform="rotate(-35 78 48)" />
      {/* Sparkle */}
      <path d="M95 15 L96.5 10 L98 15 L103 16.5 L98 18 L96.5 23 L95 18 L90 16.5 Z" fill="#FBBF24" />
    </svg>
  );
}

export function StepIllustrationQA() {
  return (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-18 mx-auto mb-4" aria-hidden="true">
      {/* AI bubble (left) */}
      <rect x="8" y="8" width="68" height="32" rx="10" fill="#8B5CF6" />
      <polygon points="18,40 10,52 30,40" fill="#8B5CF6" />
      <rect x="16" y="18" width="44" height="5" rx="2.5" fill="white" opacity="0.85" />
      <rect x="16" y="28" width="36" height="5" rx="2.5" fill="white" opacity="0.6" />
      {/* User bubble (right) */}
      <rect x="44" y="50" width="68" height="32" rx="10" fill="#DDD6FE" />
      <polygon points="102,50 110,38 90,50" fill="#DDD6FE" />
      <rect x="52" y="60" width="44" height="5" rx="2.5" fill="#7C3AED" opacity="0.7" />
      <rect x="52" y="70" width="32" height="5" rx="2.5" fill="#7C3AED" opacity="0.5" />
      {/* Dots */}
      <circle cx="108" cy="16" r="4" fill="#C4B5FD" opacity="0.7" />
      <circle cx="10" cy="78" r="3" fill="#A78BFA" opacity="0.6" />
    </svg>
  );
}

export function StepIllustrationDocs() {
  return (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-18 mx-auto mb-4" aria-hidden="true">
      {/* Back doc */}
      <rect x="32" y="14" width="64" height="62" rx="8" fill="#BBF7D0" />
      {/* Middle doc */}
      <rect x="22" y="10" width="64" height="62" rx="8" fill="#6EE7B7" />
      {/* Front doc */}
      <rect x="12" y="6" width="64" height="62" rx="8" fill="white" stroke="#10B981" strokeWidth="1.5" />
      <rect x="12" y="6" width="64" height="18" rx="8" fill="#10B981" />
      <rect x="12" y="16" width="64" height="8" fill="#10B981" />
      <rect x="22" y="11" width="36" height="6" rx="3" fill="white" opacity="0.85" />
      <rect x="22" y="34" width="44" height="5" rx="2.5" fill="#D1FAE5" />
      <rect x="22" y="45" width="36" height="5" rx="2.5" fill="#D1FAE5" />
      <rect x="22" y="56" width="40" height="5" rx="2.5" fill="#D1FAE5" />
      {/* Download arrow */}
      <circle cx="96" cy="64" r="16" fill="#10B981" />
      <path d="M96 55 L96 69 M90 64 L96 70 L102 64" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Sparkle */}
      <path d="M104 12 L105.5 7 L107 12 L112 13.5 L107 15 L105.5 20 L104 15 L99 13.5 Z" fill="#FBBF24" />
    </svg>
  );
}
