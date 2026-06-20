import { useEffect, useRef } from 'react';
import './GamesHeroBackground.css';

export default function GamesHeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Track mouse coordinates
    const mouse = { x: null, y: null, radius: 140 };

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

    // Static Circuit Lines to draw (resembles PCB trace lines)
    const circuitTracks = [
      { points: [{ x: 50, y: 30 }, { x: 150, y: 30 }, { x: 180, y: 60 }, { x: 300, y: 60 }], color: 'rgba(245, 191, 66, 0.15)' },
      { points: [{ x: 80, y: 150 }, { x: 80, y: 220 }, { x: 140, y: 280 }], color: 'rgba(245, 191, 66, 0.15)' },
      { points: [{ x: 250, y: 20 }, { x: 250, y: 90 }, { x: 200, y: 140 }], color: 'rgba(114, 87, 255, 0.15)' },
      { points: [{ x: 850, y: 40 }, { x: 720, y: 40 }, { x: 680, y: 80 }, { x: 550, y: 80 }], color: 'rgba(55, 215, 255, 0.15)' },
      { points: [{ x: 920, y: 160 }, { x: 920, y: 240 }, { x: 860, y: 300 }], color: 'rgba(55, 215, 255, 0.15)' },
    ];

    // Data Pulses travelling on circuits
    class Pulse {
      constructor(track) {
        this.track = track;
        this.reset();
      }

      reset() {
        this.segmentIdx = 0;
        this.progress = 0;
        this.speed = 0.02 + Math.random() * 0.015;
        const p1 = this.track.points[0];
        this.x = p1.x;
        this.y = p1.y;
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
          this.progress = 0;
          this.segmentIdx++;
          if (this.segmentIdx >= this.track.points.length - 1) {
            this.reset();
            return;
          }
        }

        const pStart = this.track.points[this.segmentIdx];
        const pEnd = this.track.points[this.segmentIdx + 1];

        this.x = pStart.x + (pEnd.x - pStart.x) * this.progress;
        this.y = pStart.y + (pEnd.y - pStart.y) * this.progress;
      }

      draw() {
        ctx.beginPath();
        const radGrd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 8);
        radGrd.addColorStop(0, 'rgba(255, 255, 255, 1)');
        radGrd.addColorStop(0.3, this.track.color.replace('0.15', '0.9'));
        radGrd.addColorStop(1, 'transparent');
        ctx.fillStyle = radGrd;
        ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Floating particles (Crypto Tokens + Dust)
    class Particle {
      constructor(isToken = false) {
        this.isToken = isToken;
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 20;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = -(0.2 + Math.random() * 0.5);
        this.size = this.isToken ? 16 + Math.random() * 14 : 1 + Math.random() * 2;
        this.alpha = 0.1 + Math.random() * 0.45;
        this.fadeSpeed = 0.002 + Math.random() * 0.003;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.015;

        // Custom tokens
        if (this.isToken) {
          const symbols = ['BTG', 'USDT', 'BNB', 'BTC'];
          this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
          this.color = this.symbol === 'BTG' || this.symbol === 'BNB' 
            ? 'rgba(245, 191, 66, ' // gold
            : this.symbol === 'USDT' 
              ? 'rgba(69, 224, 167, ' // mint
              : 'rgba(114, 87, 255, '; // violet
        } else {
          this.color = 'rgba(215, 220, 232, '; // silver dust
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.rotationSpeed;

        // Mouse attraction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 0.8;
            this.y -= (dy / dist) * force * 0.8;
          }
        }

        // Out of boundaries reset
        if (this.y < -30 || this.x < -20 || this.x > width + 20) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        if (this.isToken) {
          // Glow background
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color + (this.alpha * 0.08) + ')';
          ctx.fill();

          // Border outline
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.strokeStyle = this.color + (this.alpha * 0.25) + ')';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Text symbol drawing
          ctx.fillStyle = this.color + (this.alpha * 0.8) + ')';
          ctx.font = `bold ${Math.round(this.size * 0.55)}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(this.symbol, 0, 0);
        } else {
          // Dust drawing
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color + this.alpha + ')';
          ctx.fill();
        }

        ctx.restore();
      }
    }

    const pulses = circuitTracks.map((track) => new Pulse(track));
    const particles = [];
    // Instantiate 10 cryptocurrency tokens and 40 background dust stars
    for (let i = 0; i < 8; i++) particles.push(new Particle(true));
    for (let i = 0; i < 35; i++) particles.push(new Particle(false));

    function drawInteractiveLines() {
      // Connect nearby particles with thin laser lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          if (!p1.isToken && !p2.isToken) continue; // Only connect to tokens

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(55, 215, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Static Circuit Paths
      circuitTracks.forEach((track) => {
        ctx.beginPath();
        ctx.moveTo(track.points[0].x, track.points[0].y);
        for (let i = 1; i < track.points.length; i++) {
          ctx.lineTo(track.points[i].x, track.points[i].y);
        }
        ctx.strokeStyle = track.color;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw terminal circles
        ctx.fillStyle = track.color;
        track.points.forEach((pt, idx) => {
          if (idx === 0 || idx === track.points.length - 1) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      });

      // 2. Update and Draw Pulses
      pulses.forEach((pulse) => {
        pulse.update();
        pulse.draw();
      });

      // 3. Update and Draw Particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // 4. Draw interactive connection lines
      drawInteractiveLines();

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

  return <canvas ref={canvasRef} className="games-hero-bg" />;
}
