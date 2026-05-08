import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import styles from './GlobeMap.module.css';

type GlobeMapProps = {
  coordinates: [number, number];
};

export default function GlobeMap({ coordinates }: GlobeMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: (coordinates[1] * Math.PI) / 180,
      theta: (coordinates[0] * Math.PI) / 180,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [0.95, 0.95, 0.95],
      markerColor: [0.1, 0.5, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: coordinates, size: 0.1 }
      ],
    });

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      globe.destroy();
    };
  }, [coordinates]);

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        style={{ width: '100%', height: '100%', maxWidth: 500, maxHeight: 500, aspectRatio: '1 / 1' }}
      />
    </div>
  );
}