import { Shield, CheckCircle2, Lock, Eye, Wifi, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ConfirmationScreenProps {
  onBackToWelcome: () => void;
}

export function ConfirmationScreen({ onBackToWelcome }: ConfirmationScreenProps) {
  const improvements = [
    { icon: Eye, title: 'Permisos optimizados', description: '12 permisos innecesarios removidos' },
    { icon: Wifi, title: 'VPN activada', description: 'Protección en redes públicas' },
    { icon: Lock, title: 'Cifrado mejorado', description: 'Apps actualizadas con seguridad' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-blue-600" />
            <span className="text-blue-900">PrivAl</span>
          </div>
        </div>

        {/* Success Animation */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-2xl">
              <CheckCircle2 className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-slate-800">¡Protección Activada!</h2>
            <p className="text-slate-600 max-w-sm">
              Tu dispositivo ahora está más seguro. Hemos mejorado tu índice de privacidad.
            </p>
          </div>
        </div>

        {/* New Privacy Score */}
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Nuevo Índice de Privacidad</p>
              <div className="flex items-baseline gap-2">
                <span className="text-green-600">92%</span>
                <span className="text-green-600 text-sm">+27%</span>
              </div>
            </div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
              <span className="text-white">92%</span>
            </div>
          </div>
        </Card>

        {/* Improvements Made */}
        <div className="space-y-3">
          <p className="text-slate-700">Mejoras aplicadas:</p>
          {improvements.map((improvement, index) => (
            <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-white/60 backdrop-blur shadow-sm">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <improvement.icon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 pt-1">
                <p className="text-slate-800 text-sm">{improvement.title}</p>
                <p className="text-slate-500 text-xs">{improvement.description}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button 
            onClick={onBackToWelcome}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Volver al inicio
          </Button>
          
          <p className="text-center text-xs text-slate-500">
            Te recomendamos escanear tu dispositivo semanalmente
          </p>
        </div>
      </div>
    </div>
  );
}
