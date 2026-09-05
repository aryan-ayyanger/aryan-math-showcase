interface IconProps {
  size?: number;
  className?: string;
}

// Congruence/modulus symbol — the defining notation of number theory.
export function ModulusIcon({ size = 24, className }: IconProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="5" y1="8" x2="19" y2="8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="5" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// A squared variable — the hallmark of algebraic manipulation.
export function AlgebraIcon({ size = 24, className }: IconProps): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <text
        x="12"
        y="17.5"
        textAnchor="middle"
        fontSize="16"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fill="currentColor"
      >
        x&#178;
      </text>
    </svg>
  );
}
