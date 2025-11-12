import { Shield, Loader2, Lock, Eye, Wifi, MapPin, Smartphone, Database } from 'lucide-react';
import { Progress } from './ui/progress';
import { useEffect, useState } from 'react';

interface ScanningScreenProps {
  onScanComplete: () => void;
}

export function ScanningScreen({ onScanComplete }: ScanningScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentCheck, setCurrentCheck] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  const checks = [
    { text: 'Verificando permisos de aplicaciones...', icon: Lock },
    { text: 'Analizando configuración de privacidad...', icon: Eye },
    { text: 'Escaneando vulnerabilidades de red...', icon: Wifi },
    { text: 'Evaluando rastreo de ubicación...', icon: MapPin },
    { text: 'Detectando accesos sospechosos...', icon: Smartphone },
    { text: 'Calculando índice de privacidad...', icon: Database },
  ];

  useEffect(() => {
    // Generar partículas aleatorias
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1.5;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onScanComplete(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 80);

    const checkInterval = setInterval(() => {
      setCurrentCheck((prev) => {
        if (prev >= checks.length - 1) return checks.length - 1;
        return prev + 1;
      });
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(checkInterval);
    };
  }, [onScanComplete]);

  const CurrentIcon = checks[currentCheck].icon;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Partículas de fondo animadas */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <span className="text-blue-900">PrivAl</span>
          </div>
        </div>

        {/* Scanning Animation */}
        <div className="flex flex-col items-center space-y-6 py-12">
          <div className="relative">
            {/* Círculo principal con glassmorphism */}
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 flex items-center justify-center shadow-2xl relative overflow-hidden">
              {/* Efecto de brillo giratorio */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
              <div className="w-36 h-36 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center">
                <Shield className="w-16 h-16 text-white animate-pulse" />
              </div>
            </div>
            
            {/* Anillos orbitales */}
            <div className="absolute inset-0 rounded-full border-4 border-blue-400/30 border-t-blue-600 animate-spin"></div>
            <div className="absolute -inset-3 rounded-full border-2 border-purple-400/20 border-t-purple-500 animate-[spin_3s_linear_infinite]"></div>
            <div className="absolute -inset-6 rounded-full border border-green-400/10 border-t-green-500 animate-[spin_4s_linear_infinite]"></div>
            
            {/* Pulso exterior */}
            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>
          </div>

          <div className="text-center space-y-3">
            <h2 className="text-slate-800 font-bold text-xl">Escaneando dispositivo</h2>
            <div className="flex items-center justify-center gap-3 bg-white/60 backdrop-blur-lg rounded-full px-5 py-3 shadow-lg border border-white/40">
              <CurrentIcon className="w-5 h-5 text-blue-600 animate-pulse" />
              <p className="text-slate-700 font-medium text-sm">{checks[currentCheck].text}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar con efecto glassmorphism */}
        <div className="space-y-3 bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/40">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-700 font-semibold">Progreso del análisis</span>
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span className="text-blue-600 font-bold tabular-nums">{Math.round(progress)}%</span>
            </div>
          </div>
          <div className="relative h-3 bg-slate-200/50 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.5s_infinite]"></div>
            </div>
          </div>
          
          {/* Mini estadísticas */}
          <div className="grid grid-cols-3 gap-3 pt-3">
            <div className="text-center">
              <div className="text-xs text-slate-500">Apps</div>
              <div className="text-lg font-bold text-slate-800">{Math.round(progress * 0.5)}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-500">Permisos</div>
              <div className="text-lg font-bold text-slate-800">{Math.round(progress * 0.3)}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-500">Amenazas</div>
              <div className="text-lg font-bold text-red-600">{Math.min(7, Math.round(progress * 0.07))}</div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-slate-600 bg-white/40 backdrop-blur rounded-full px-4 py-2">
          ✨ Análisis avanzado con IA en progreso...
        </p>
      </div>
      
      {/* CSS personalizado para animaciones */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
