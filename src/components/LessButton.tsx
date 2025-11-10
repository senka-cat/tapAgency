interface LessButtonProps {
  accentColor: string;
  onFlip?: () => void;
}

function CircleIcon({ accentColor, onClick }: { accentColor: string; onClick?: () => void }) {
  return (
    <div 
      className="relative shrink-0 size-[26px] cursor-pointer hover:scale-110 transition-transform active:scale-95 pointer-events-auto" 
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick?.(e);
      }}
      onPointerDown={(e) => e.stopPropagation()}
      style={{ touchAction: 'manipulation' }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g id="Group 1000001817">
          <g filter="url(#filter0_d_34_3708)" id="Ellipse 11">
            <circle cx="13" cy="13" fill={accentColor} r="6" />
          </g>
          <circle cx="13" cy="13" id="Ellipse 12" r="11.5" stroke={accentColor} strokeWidth="3" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="14" id="filter0_d_34_3708" width="14" x="6" y="7">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="0.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.38 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_3708" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_34_3708" mode="normal" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default function LessButton({ accentColor, onFlip }: LessButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onFlip) {
      onFlip();
    }
  };

  return <CircleIcon accentColor={accentColor} onClick={handleClick} />;
}
