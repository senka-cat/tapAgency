function Group() {
  return (
    <div className="relative shrink-0 size-[26px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g id="Group 1000001817">
          <g filter="url(#filter0_d_34_3708)" id="Ellipse 11">
            <circle cx="13" cy="13" fill="var(--fill-0, #ECE7E1)" r="6" />
          </g>
          <circle cx="13" cy="13" id="Ellipse 12" r="11.5" stroke="var(--stroke-0, #ECE7E1)" strokeWidth="3" />
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

export default function Frame() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative size-full">
      <Group />
      <div className="flex flex-col font-['Lacquer:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ece7e1] text-[20px] text-center text-nowrap tracking-[-0.1px]">
        <p className="leading-[1.4] whitespace-pre">less</p>
      </div>
    </div>
  );
}