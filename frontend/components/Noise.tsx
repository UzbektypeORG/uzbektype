"use client";

import './Noise.css';

interface NoiseProps {
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number;
}

const Noise = ({
  patternAlpha = 15
}: NoiseProps) => {
  return (
    <div className="noise-overlay" style={{ opacity: patternAlpha / 100 }}>
      <svg className="noise-svg">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
};

export default Noise;
