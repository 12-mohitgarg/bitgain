import { useEffect, useRef } from 'react';
import './HomeBackground.css';

export default function HomeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const mouse = { x: null, y: null, radius: 160 };

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

    // 1. Rotating Ludo Dice Particle (Isometric wireframe cube)
    class DiceParticle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 30;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = -(0.15 + Math.random() * 0.3);
        this.size = 20 + Math.random() * 15;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.01;
        this.alpha = 0.08 + Math.random() * 0.15;
        this.color = 'rgba(245, 191, 66, '; // Gold Ludo Dice
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.spin;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 0.5;
            this.y -= (dy / dist) * force * 0.5;
          }
        }

        if (this.y < -40 || this.x < -40 || this.x > width + 40) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.strokeStyle = this.color + this.alpha + ')';
        ctx.fillStyle = this.color + (this.alpha * 0.15) + ')';
        ctx.lineWidth = 1.2;

        const s = this.size;

        // Draw isometric square faces (flat dice representation with 3D shadow lines)
        ctx.beginPath();
        ctx.rect(-s / 2, -s / 2, s, s);
        ctx.fill();
        ctx.stroke();

        // Draw standard dice pips (e.g. 5 pips pattern)
        ctx.fillStyle = this.color + (this.alpha * 0.8) + ')';
        const pSize = Math.max(1.8, s * 0.08);

        // Center dot
        ctx.beginPath();
        ctx.arc(0, 0, pSize, 0, Math.PI * 2);
        ctx.fill();

        // Corner dots
        const offset = s * 0.26;
        const corners = [
          [-offset, -offset],
          [offset, -offset],
          [-offset, offset],
          [offset, offset]
        ];
        corners.forEach(([cx, cy]) => {
          ctx.beginPath();
          ctx.arc(cx, cy, pSize, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      }
    }

    // 2. Faceted Cascade Gem Particle (Faceted Diamond Shape)
    class GemParticle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 30;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = -(0.2 + Math.random() * 0.35);
        this.size = 14 + Math.random() * 12;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.015;
        this.alpha = 0.08 + Math.random() * 0.18;

        const gemColors = [
          'rgba(59, 130, 246, ',  // Blue Sapphire
          'rgba(239, 68, 68, ',   // Red Ruby
          'rgba(245, 191, 66, ',  // Gold Topaz
          'rgba(16, 185, 129, ',  // Green Emerald
        ];
        this.color = gemColors[Math.floor(Math.random() * gemColors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.spin;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 0.5;
            this.y -= (dy / dist) * force * 0.5;
          }
        }

        if (this.y < -40 || this.x < -40 || this.x > width + 40) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        const s = this.size;
        ctx.strokeStyle = this.color + this.alpha + ')';
        ctx.fillStyle = this.color + (this.alpha * 0.15) + ')';
        ctx.lineWidth = 1;

        // Draw diamond gem outline
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.8, -s * 0.2);
        ctx.lineTo(0, s);
        ctx.lineTo(-s * 0.8, -s * 0.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw inner gem facet cuts
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(0, s);
        ctx.moveTo(-s * 0.8, -s * 0.2);
        ctx.lineTo(s * 0.8, -s * 0.2);
        ctx.stroke();

        ctx.restore();
      }
    }

    // 3. Color Prediction Core Particle (Energy Rings)
    class PredictionCore {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 40;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = -(0.1 + Math.random() * 0.25);
        this.radius = 18 + Math.random() * 12;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.008;
        this.alpha = 0.08 + Math.random() * 0.16;

        // Color cores transition
        this.colorType = Math.random() > 0.66 ? 'gold' : Math.random() > 0.5 ? 'violet' : 'mint';
        this.color = this.colorType === 'gold' 
          ? 'rgba(245, 191, 66, ' 
          : this.colorType === 'violet' 
            ? 'rgba(168, 85, 247, ' 
            : 'rgba(69, 224, 167, ';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.spin;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 0.5;
            this.y -= (dy / dist) * force * 0.5;
          }
        }

        if (this.y < -50 || this.x < -50 || this.x > width + 50) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        const r = this.radius;

        // Core Solid Circle
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.fill();

        // Concentric Dashed Ring
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = this.color + (this.alpha * 0.4) + ')';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]); // clear dash

        ctx.restore();
      }
    }

    // 4. Hourly Digit Draw Bubble (Glow Bubble containing digits 0-9)
    class DigitBubble {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 30;
        this.vx = (Math.random() - 0.5) * 0.18;
        this.vy = -(0.15 + Math.random() * 0.3);
        this.radius = 16 + Math.random() * 10;
        this.alpha = 0.08 + Math.random() * 0.14;
        this.digit = Math.floor(Math.random() * 10);
        this.color = 'rgba(55, 215, 255, '; // BSC Cyan Digit Bubble
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 0.5;
            this.y -= (dy / dist) * force * 0.5;
          }
        }

        if (this.y < -40 || this.x < -40 || this.x > width + 40) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        const r = this.radius;

        // Draw bubble outer shell
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = this.color + this.alpha + ')';
        ctx.fillStyle = this.color + (this.alpha * 0.08) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fill();

        // Draw bubble sheen highlight
        ctx.beginPath();
        ctx.arc(-r * 0.3, -r * 0.3, r * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (this.alpha * 0.5) + ')';
        ctx.fill();

        // Write digit inside bubble
        ctx.fillStyle = this.color + (this.alpha * 0.85) + ')';
        ctx.font = `bold ${Math.round(r * 0.9)}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.digit, 0, 0);

        ctx.restore();
      }
    }

    // Instantiate game elements particles
    const particles = [];
    
    // Add Ludo Dice
    for (let i = 0; i < 7; i++) particles.push(new DiceParticle());
    // Add Cascade Gems
    for (let i = 0; i < 11; i++) particles.push(new GemParticle());
    // Add Prediction Core energy slots
    for (let i = 0; i < 7; i++) particles.push(new PredictionCore());
    // Add Digit Bubbles
    for (let i = 0; i < 10; i++) particles.push(new DigitBubble());

    function drawThemedConnections() {
      // Draw faint cybernetic connections between close matching particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.09;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(114, 87, 255, ${alpha})`; // Violet connection lines
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // 2. Draw connections
      drawThemedConnections();

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

  return <canvas ref={canvasRef} className="home-bg-canvas" />;
}
