interface WaveDividerProps {
  flip?: boolean;
  height?: number;
  color?: string;
}

const WaveDivider = ({ flip = false, height = 120, color = "#fce4ec" }: WaveDividerProps) => (
  <div
    className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}
    style={{ marginTop: flip ? 0 : -1, marginBottom: flip ? -1 : 0 }}
  >
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="w-full block"
      style={{ height }}
    >
      <path
        fill={color}
        d="M0,220 C180,380 360,50 540,220 C720,380 900,50 1080,220 C1260,380 1440,60 1440,220 L1440,400 L0,400 Z"
      />
    </svg>
  </div>
);

// "M0,160 C180,280 360,40 540,160 C720,280 900,40 1080,160 C1200,240 1320,80 1440,160 L1440,320 L0,320 Z"

export default WaveDivider;
