import { Shield, Lock, Eye, Smartphone } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeScreenProps {
  onStartScan: () => void;
}

export function WelcomeScreen({ onStartScan }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Brand */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-green-500 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-blue-900">PrivAl</h1>
          <p className="text-slate-600 max-w-sm mx-auto">
            Tu asistente personal de ciberseguridad. Protege tu privacidad con un solo clic.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-4 py-6">
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/60 backdrop-blur shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Lock className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-slate-700 text-center text-sm">Seguro</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/60 backdrop-blur shadow-sm">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-slate-700 text-center text-sm">Privado</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/60 backdrop-blur shadow-sm">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-teal-600" />
            </div>
            <span className="text-slate-700 text-center text-sm">Fácil</span>
          </div>
        </div>

        {/* Main CTA */}
        <div className="space-y-4">
          <Button 
            onClick={onStartScan}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            <Shield className="w-5 h-5 mr-2" />
            Escanear mi dispositivo
          </Button>
          
          <p className="text-center text-sm text-slate-500">
            Analiza tu dispositivo en segundos y descubre tu nivel de protección
          </p>
        </div>
      </div>
    </div>
  );
}
