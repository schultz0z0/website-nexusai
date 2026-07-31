type NexusMarkProps = {
  className?: string;
};

/**
 * "N" mark da marca Nexus AI — usado no nav e no favicon (via ImageResponse / SVG).
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
        d="M7 17 V7 L17 17 V7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-background"
      />
    </svg>
  );
}