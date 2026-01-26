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
      <div className="noise-layer noise-layer-1" />
      <div className="noise-layer noise-layer-2" />
    </div>
  );
};

export default Noise;
