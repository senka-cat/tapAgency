interface SectionDividerProps {
  color?: string;
  nextSectionColor?: string;
}

export function SectionDivider({ color = '#7F2C4C', nextSectionColor = '#51AE92' }: SectionDividerProps) {
  return (
    <div className="relative w-full py-2 overflow-hidden">
      {/* Simple subtle divider - no scribble lines */}
    </div>
  );
}
