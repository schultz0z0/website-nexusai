type NexusMarkProps = {
  className?: string;
};

/**
 * Símbolo tipográfico da marca Prometeus — usado em superfícies compactas.
 * Mantém viewBox e geometria em um único lugar para garantir consistência visual
 * entre o site e o ícone que aparece na aba do navegador / preview de link.
 */
export function NexusMark({ className }: NexusMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="6" className="fill-foreground" />
      <path
        d="M8 17 V7 H14.5 A3.5 3.5 0 0 1 14.5 14 H8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-background"
      />
    </svg>
  );
}
