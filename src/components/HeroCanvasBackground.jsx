import { useEffect, useRef } from 'react';
import './HeroCanvasBackground.css';

export default function HeroCanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const mouse = { x: null, y: null, radius: 180 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    canvas.parentElement.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    // --- 1. Warp Speed Particles (Light Streaks) ---
    class WarpParticle {
      constructor() {
        this.reset();
      }

      reset() {
        // Spawn around center coordinates with a small random offset
        this.x = width / 2 + (Math.random() - 0.5) * 40;
        this.y = height / 2 + (Math.random() - 0.5) * 40;
        this.px = this.x;
        this.py = this.y;

        // Angle of flight
        this.angle = Math.random() * Math.PI * 2;
        // Radial speed
        this.speed = 1 + Math.random() * 3;
        this.acceleration = 1.02 + Math.random() * 0.02;

        this.color = Math.random() > 0.5 ? 'rgba(55, 215, 255, ' : 'rgba(245, 191, 66, '; // Cyan / Gold
        this.alpha = 0.1;
      }

      update() {
        this.px = this.x;
        this.py = this.y;

        // Move outwards
        const vx = Math.cos(this.angle) * this.speed;
        const vy = Math.sin(this.angle) * this.speed;
        
        this.x += vx;
        this.y += vy;
        
        this.speed *= this.acceleration; // Accelerate outwards
        this.alpha = Math.min(this.alpha + 0.05, 0.7);

        // Interaction with mouse: pull trace towards mouse slightly if close
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }

        // Reset if goes off-screen
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.px, this.py);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = this.color + this.alpha + ')';
        ctx.lineWidth = Math.min(1.8, this.speed * 0.12);
        ctx.stroke();
      }
    }

    // --- 2. Floating Game Assets (Ludo Die, Ruby Gem, Energy Sphere) ---
    class GameAsset {
      constructor(type) {
        this.type = type;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseY = this.y;
        this.angle = Math.random() * Math.PI * 2;
        this.bobSpeed = 0.01 + Math.random() * 0.01;
        this.bobHeight = 15 + Math.random() * 10;
        this.spinSpeed = 0.005 + Math.random() * 0.005;
        this.bobOffset = Math.random() * Math.PI;
        this.size = 28 + Math.random() * 10;
        this.alpha = 0.75;

        if (type === 'dice') this.color = 'rgba(245, 191, 66, '; // gold
        if (type === 'gem') this.color = 'rgba(239, 68, 68, ';   // red ruby
        if (type === 'core') this.color = 'rgba(168, 85, 247, ';  // violet prediction
      }

      update() {
        this.angle += this.spinSpeed;
        this.bobOffset += this.bobSpeed;
        
        // Floating motion
        this.y = this.baseY + Math.sin(this.bobOffset) * this.bobHeight;

        // Magnetized behavior towards mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.8;
            this.y -= (dy / dist) * force * 1.8;
          }
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.strokeStyle = this.color + this.alpha + ')';
        ctx.fillStyle = this.color + '0.08)';
        ctx.lineWidth = 1.6;

        const s = this.size;

        if (this.type === 'dice') {
          // Detailed dice representation
          ctx.beginPath();
          ctx.rect(-s / 2, -s / 2, s, s);
          ctx.fill();
          ctx.stroke();

          // Dots pattern for '6' pips
          ctx.fillStyle = this.color + '0.95)';
          const pSize = s * 0.085;
          const offset = s * 0.28;
          const pips = [
            [-offset, -offset], [-offset, 0], [-offset, offset],
            [offset, -offset], [offset, 0], [offset, offset]
          ];
          pips.forEach(([px, py]) => {
            ctx.beginPath();
            ctx.arc(px, py, pSize, 0, Math.PI * 2);
            ctx.fill();
          });
        } else if (this.type === 'gem') {
          // Faceted gem drawing
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.85, -s * 0.25);
          ctx.lineTo(0, s);
          ctx.lineTo(-s * 0.85, -s * 0.25);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.lineTo(0, s);
          ctx.moveTo(-s * 0.85, -s * 0.25);
          ctx.lineTo(s * 0.85, -s * 0.25);
          ctx.stroke();
        } else if (this.type === 'core') {
          // Energy Core
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = this.color + '0.35)';
          ctx.fill();
          ctx.stroke();

          // Concentric dash rings
          ctx.beginPath();
          ctx.arc(0, 0, s, 0, Math.PI * 2);
          ctx.strokeStyle = this.color + '0.3)';
          ctx.setLineDash([6, 8]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.restore();
      }
    }

    // --- 3. Perspective Scrolling 3D Grid ---
    let gridOffset = 0;
    const gridSpeed = 0.8;

    function drawPerspectiveGrid() {
      const horizonY = height * 0.45;
      const step = 28;

      ctx.save();
      ctx.strokeStyle = 'rgba(55, 215, 255, 0.16)'; // Cyan laser lines
      ctx.lineWidth = 1;

      // Vertical lines extending from horizon point to bottom
      const linesCount = 18;
      const centerHorizonX = width / 2;

      for (let i = -linesCount / 2; i <= linesCount / 2; i++) {
        const startX = centerHorizonX + i * 8; // Convergence spacing at horizon
        const endX = centerHorizonX + i * 160; // Spread spacing at bottom
        
        ctx.beginPath();
        ctx.moveTo(startX, horizonY);
        ctx.lineTo(endX, height);
        ctx.stroke();
      }

      // Scrolling horizontal perspective lines
      gridOffset = (gridOffset + gridSpeed) % step;

      for (let y = horizonY; y < height; y += step) {
        // Interpolate perspective spacing: wider lines at bottom
        const pct = (y - horizonY) / (height - horizonY);
        const curvedPct = Math.pow(pct, 2.5); // Exponential perspective spacing
        const scrollY = horizonY + curvedPct * (height - horizonY) + gridOffset * pct * 0.8;

        if (scrollY > horizonY && scrollY < height) {
          ctx.strokeStyle = `rgba(55, 215, 255, ${0.03 + pct * 0.22})`; // Brighter lines near bottom
          ctx.beginPath();
          ctx.moveTo(0, scrollY);
          ctx.lineTo(width, scrollY);
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    // Setup arrays
    const warpStars = Array.from({ length: 65 }).map(() => new WarpParticle());
    const assets = [
      new GameAsset('dice'),
      new GameAsset('gem'),
      new GameAsset('core')
    ];

    const render = () => {
      // Clear canvas with subtle radial backdrop fade to retain styling gradients
      ctx.clearRect(0, 0, width, height);

      // 1. Draw perspective scrolling grid
      drawPerspectiveGrid();

      // 2. Update and draw warp speed lines
      warpStars.forEach((star) => {
        star.update();
        star.draw();
      });

      // 3. Update and draw bobbing interactive game assets
      assets.forEach((asset) => {
        asset.update();
        asset.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas-background" />;
}
