import { Shield, AlertTriangle, Lock, Eye, Wifi, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ResultsScreenProps {
  onConfigure: () => void;
}

export function ResultsScreen({ onConfigure }: ResultsScreenProps) {
  const privacyScore = 65;

  const issues = [
    { icon: Eye, title: 'Permisos de cámara', status: 'warning', apps: 8 },
    { icon: Wifi, title: 'Red pública detectada', status: 'danger', apps: 1 },
    { icon: Lock, title: 'Apps sin cifrado', status: 'warning', apps: 3 },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 py-12">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <span className="text-blue-900">PrivAl</span>
          </div>
        </div>

        {/* Privacy Score Circle */}
        <div className="flex flex-col items-center space-y-4 py-6">
          <h2 className="text-slate-800">Índice de Privacidad</h2>
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#e2e8f0"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${privacyScore * 5.53} 553`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-amber-600">{privacyScore}%</span>
              <span className="text-slate-600 text-sm">Mejorable</span>
            </div>
          </div>
        </div>

        {/* Issues Found */}
        <Card className="p-5 space-y-4 bg-white/80 backdrop-blur shadow-lg border-0">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span className="text-slate-800">Problemas detectados</span>
          </div>
          
          <div className="space-y-3">
            {issues.map((issue, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  issue.status === 'danger' ? 'bg-red-100' : 'bg-amber-100'
                }`}>
                  <issue.icon className={`w-5 h-5 ${
                    issue.status === 'danger' ? 'text-red-600' : 'text-amber-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-slate-800 text-sm">{issue.title}</p>
                  <p className="text-slate-500 text-xs">{issue.apps} app{issue.apps > 1 ? 's' : ''} afectada{issue.apps > 1 ? 's' : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA Button */}
        <div className="space-y-4 pt-2">
          <Button 
            onClick={onConfigure}
            className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Configurar Protección en "Un Clic"
          </Button>
          
          <p className="text-center text-sm text-slate-500">
            Mejora tu privacidad automáticamente con configuraciones recomendadas
          </p>
        </div>
      </div>
    </div>
  );
}
