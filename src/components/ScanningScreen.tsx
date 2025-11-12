import { Shield, Loader2 } from 'lucide-react';
import { Progress } from './ui/progress';
import { useEffect, useState } from 'react';

interface ScanningScreenProps {
  onScanComplete: () => void;
}

export function ScanningScreen({ onScanComplete }: ScanningScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentCheck, setCurrentCheck] = useState(0);

  const checks = [
    'Verificando permisos de aplicaciones...',
    'Analizando configuración de privacidad...',
    'Escaneando vulnerabilidades...',
    'Evaluando seguridad de red...',
    'Calculando índice de privacidad...'
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          onScanComplete();
          return 100;
        }
        return newProgress;
      });
    }, 60);

    const checkInterval = setInterval(() => {
      setCurrentCheck((prev) => {
        if (prev >= checks.length - 1) return checks.length - 1;
        return prev + 1;
      });
    }, 600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(checkInterval);
    };
  }, [onScanComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
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
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center animate-pulse shadow-2xl">
              <Shield className="w-16 h-16 text-white" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-300 border-t-transparent animate-spin"></div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-slate-800">Escaneando dispositivo</h2>
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <p className="text-slate-600">{checks[currentCheck]}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3 bg-white/60 backdrop-blur rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Progreso</span>
            <span className="text-blue-600">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <p className="text-center text-sm text-slate-500">
          Esto solo tomará unos segundos...
        </p>
      </div>
    </div>
  );
}
