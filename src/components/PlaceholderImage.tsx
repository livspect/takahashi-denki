type Props = {
  label?: string;
  variant?: "blue" | "dark" | "orange" | "light";
  className?: string;
  ratio?: "video" | "square" | "portrait" | "wide";
};

export function PlaceholderImage({
  label,
  className = "",
  ratio = "video",
}: Props) {
  const ratioClass = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
  }[ratio];

  return (
    <div
      className={`relative overflow-hidden bg-[#e5e7eb] ${ratioClass} ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 64 64"
          className="w-16 h-16 text-[#9ca3af]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="6" y="10" width="52" height="44" rx="2" />
          <circle cx="22" cy="24" r="4" />
          <path d="M10 48l14-14 10 10 8-8 14 12" />
        </svg>
      </div>
      {label && (
        <div className="absolute bottom-3 left-3 text-[10px] font-bold tracking-widest text-[#6b7280]">
          {label}
        </div>
      )}
    </div>
  );
}
