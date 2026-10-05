'use client';
import styles from './StarField.module.css';
import { useEffect, useRef } from 'react';

const DENSITY = 0.0004; // stars per pixel of screen area
const MIN_SIZE = 0.2; // smallest star radius (px)
const MAX_SIZE = 2.4; // largest star radius (px)
const MIN_SPEED = 0.4; // slowest twinkle (cycles per second)
const MAX_SPEED = 1; // fastest twinkle

// Mostly white with a faint blue or warm tint
const TINTS = ['255,255,255', '255,255,255', '255,255,255', '200,220,255', '255,235,210'];

export default function Starfield({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let stars = [];
    let width = 0;
    let height = 0;
    let rafId = 0;

    function makeStar() {
      // Squaring makes small stars far more common than big ones
      const sizeBias = Math.random() ** 2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: MIN_SIZE + sizeBias * (MAX_SIZE - MIN_SIZE),
        baseAlpha: 0.6 + Math.random() * 0.4,
        speed: MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED),
        phase: Math.random() * Math.PI * 2,
        depth: 0.3 + Math.random() * 0.5, // how deeply the star dims when twinkling
        tint: TINTS[Math.floor(Math.random() * TINTS.length)],
      };
    }

    function draw(time) {
      const t = time / 1000;
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        const wave = reduceMotion
          ? 1
          : 0.5 + 0.5 * Math.sin(t * s.speed * Math.PI * 2 + s.phase);
        const alpha = s.baseAlpha * (1 - s.depth + s.depth * wave);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.tint},${alpha.toFixed(3)})`;
        ctx.fill();

        // Soft glow on the bigger stars
        if (s.r > 1.4) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.tint},${(alpha * 0.12).toFixed(3)})`;
          ctx.fill();
        }
      }
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor(width * height * DENSITY);
      stars = Array.from({ length: count }, makeStar);
      if (reduceMotion) draw(0);
    }

    function loop(time) {
      draw(time);
      rafId = requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    resize();
    if (!reduceMotion) rafId = requestAnimationFrame(loop);

    // Cleanup on unmount (also handles React Strict Mode's double-invoke in dev)
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`${styles.starfield} ${className}`}
    />
  );
}