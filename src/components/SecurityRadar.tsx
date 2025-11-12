import { useEffect, useRef } from 'react';

interface RadarProps {
  threats: number;
  className?: string;
}

export function SecurityRadar({ threats, className = '' }: RadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let rotation = 0;
    const particles: Array<{ x: number; y: number; angle: number; distance: number; speed: number }> = [];

    // Crear partículas de amenazas
    for (let i = 0; i < threats; i++) {
      particles.push({
        x: 0,
        y: 0,
        angle: Math.random() * Math.PI * 2,
        distance: 50 + Math.random() * 80,
        speed: 0.01 + Math.random() * 0.02,
      });
    }

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Limpiar canvas
      ctx.clearRect(0, 0, width, height);

      // Dibujar círculos concéntricos
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (width / 2) * (i / 3), 0, Math.PI * 2);
        ctx.stroke();
      }

      // Dibujar líneas radiales
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * (width / 2),
          centerY + Math.sin(angle) * (height / 2)
        );
        ctx.stroke();
      }

      // Dibujar rayo del radar
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      
      const gradient = ctx.createLinearGradient(0, 0, width / 2, 0);
      gradient.addColorStop(0, 'rgba(34, 197, 94, 0.8)');
      gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.3)');
      gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, width / 2, 0, Math.PI / 4);
      ctx.lineTo(0, 0);
      ctx.fill();
      ctx.restore();

      // Dibujar partículas de amenazas
      particles.forEach((particle) => {
        particle.angle += particle.speed;
        
        const x = centerX + Math.cos(particle.angle) * particle.distance;
        const y = centerY + Math.sin(particle.angle) * particle.distance;
        
        // Pulso de amenaza
        const pulseSize = 3 + Math.sin(Date.now() * 0.005 + particle.angle) * 1;
        
        // Punto principal
        ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
        ctx.beginPath();
        ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Aura de amenaza
        const auraGradient = ctx.createRadialGradient(x, y, 0, x, y, pulseSize * 3);
        auraGradient.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
        auraGradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = auraGradient;
        ctx.beginPath();
        ctx.arc(x, y, pulseSize * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      rotation += 0.02;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [threats]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      className={className}
    />
  );
}
