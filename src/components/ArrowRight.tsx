type Props = {
  className?: string;
  width?: number;
};

export function ArrowRight({ className = "", width = 26 }: Props) {
  return (
    <svg
      viewBox="0 0 28 10"
      width={width}
      height={(width * 10) / 28}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <line x1="0.5" y1="5" x2="26.5" y2="5" />
      <polyline points="22.5,1 26.5,5 22.5,9" />
    </svg>
  );
}
