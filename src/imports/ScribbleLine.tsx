import svgPaths from "./svg-3qvwft731m";

export default function ScribbleLine() {
  return (
    <div className="relative size-full" data-name="Scribble line">
      <div className="absolute inset-[-5.44%_-0.42%_-5.43%_-0.42%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1200 102">
          <g filter="url(#filter0_i_90_662)" id="Vector">
            <path d={svgPaths.p2ce4b1d8} stroke="var(--stroke-0, #2A2D34)" strokeLinecap="round" strokeWidth="10" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="106" id="filter0_i_90_662" width="1200" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
              <feBlend in2="shape" mode="normal" result="effect1_innerShadow_90_662" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}