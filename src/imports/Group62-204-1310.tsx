import svgPaths from "./svg-6ds1yve6r5";
import imgCikoMali111 from "figma:asset/6774f885406cd11b9515e084826afae88137325c.png";

interface Group62Props {
  color?: string;
}

export default function Group62({ color = "#7F2C4C" }: Group62Props) {
  return (
    <div className="relative size-full" style={{ "--fill-0": color } as React.CSSProperties}>
      <div className="absolute h-[316.562px] left-0 top-0 w-[472.483px]" data-name="ciko mali 1.1 1">
        <img 
          alt="" 
          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" 
          src={imgCikoMali111}
          style={{ filter: 'grayscale(100%)' }}
        />
      </div>
      <div className="absolute h-[42.061px] left-[245.65px] mix-blend-color top-[89.1px] w-[42.048px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 43">
          <g id="Ellipse 4" style={{ mixBlendMode: "color" }}>
            <ellipse cx="21.0238" cy="21.0303" fill="var(--fill-0, #7F2C4C)" rx="21.0238" ry="21.0303" />
          </g>
        </svg>
      </div>
      <div className="absolute h-[40.4px] left-[174.83px] mix-blend-color top-[93.53px] w-[40.388px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 41">
          <g id="Ellipse 5" style={{ mixBlendMode: "color" }}>
            <ellipse cx="20.1939" cy="20.2002" fill="var(--fill-0, #7F2C4C)" rx="20.1939" ry="20.2002" />
          </g>
        </svg>
      </div>
      <div className="absolute h-[28.502px] left-[289.63px] mix-blend-color top-[244.62px] w-[35.962px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 29">
          <g id="Vector 1" style={{ mixBlendMode: "color" }}>
            <path d={svgPaths.p42a3600} fill="var(--fill-0, #7F2C4C)" />
          </g>
        </svg>
      </div>
    </div>
  );
}