"use client";

import React, { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { Loader2 } from "lucide-react";

type GlobeMapProps = {
  coordinates?: [number, number];
  size?: number;
  interactive?: boolean;
};

export default function GlobeMap({ coordinates, size = 400, interactive = true }: GlobeMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const phiRef = useRef(0);
  const thetaRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    let animationFrameId: number;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 1.5,
      width: size,
      height: size,
      phi: coordinates ? (coordinates[1] * Math.PI) / 180 : 0.5,
      theta: coordinates ? (coordinates[0] * Math.PI) / 180 : 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 2500,
      mapBrightness: 1.2,
      baseColor: [0.2, 0.5, 0.9],
      markerColor: [1, 1, 1],
      glowColor: [0.3, 0.6, 1],
      markers: coordinates ? [{ location: coordinates, size: 0.08 }] : [],
      // @ts-ignore
      onRender: (state: { phi: number; theta: number }) => {
        phiRef.current = state.phi;
        thetaRef.current = state.theta;
      },
    });

    setIsReady(true);

    if (interactive && !coordinates) {
      let autoRotate = true;
      const autoRotateSpeed = 0.003;

      const animate = () => {
        if (autoRotate) {
          globe.setPhi(globe.phi + autoRotateSpeed);
        }
        animationFrameId = requestAnimationFrame(animate);
      };
      animate();

      // Pause on hover
      const canvas = canvasRef.current;
      const handleMouseEnter = () => { autoRotate = false; };
      const handleMouseLeave = () => { autoRotate = true; };
      canvas.addEventListener("mouseenter", handleMouseEnter);
      canvas.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        cancelAnimationFrame(animationFrameId);
        canvas.removeEventListener("mouseenter", handleMouseEnter);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        globe.destroy();
      };
    }

    return () => {
      globe.destroy();
    };
  }, [coordinates, size, interactive]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 rounded-full">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="rounded-full shadow-2xl cursor-grab active:cursor-grabbing"
        style={{ width: size, height: size }}
        onPointerDown={(e) => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          canvas.setPointerCapture(e.pointerId);
          const startX = e.clientX;
          const startPhi = phiRef.current;

          const handlePointerMove = (ev: PointerEvent) => {
            const dx = ev.clientX - startX;
            phiRef.current = startPhi + dx * 0.005;
          };

          const handlePointerUp = (ev: PointerEvent) => {
            canvas.removeEventListener("pointermove", handlePointerMove);
            canvas.removeEventListener("pointerup", handlePointerUp);
            canvas.removeEventListener("pointercancel", handlePointerUp);
            canvas.releasePointerCapture(ev.pointerId);
          };

          canvas.addEventListener("pointermove", handlePointerMove);
          canvas.addEventListener("pointerup", handlePointerUp);
          canvas.addEventListener("pointercancel", handlePointerUp);
        }}
      />
    </div>
  );
}