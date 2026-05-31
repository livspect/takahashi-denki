type Props = {
  en: string;
  jp: React.ReactNode;
  align?: "left" | "center";
  invert?: boolean;
};

export function SectionLabel({ en, jp, align = "left", invert = false }: Props) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start";
  const accentColor = invert ? "text-brand-300" : "text-brand-600";
  const titleColor = invert ? "text-white" : "text-foreground";
  const lineColor = invert ? "bg-brand-300" : "bg-brand-600";
  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      <div className="flex items-center gap-3">
        <span className={`w-8 h-px ${lineColor}`} />
        <span className={`section-label-en text-xs ${accentColor}`}>{en}</span>
        {align === "center" && <span className={`w-8 h-px ${lineColor}`} />}
      </div>
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight ${titleColor}`}
      >
        {jp}
      </h2>
    </div>
  );
}
