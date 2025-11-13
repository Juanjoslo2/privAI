import { Shield, Lock, Eye, Smartphone, Camera, Mic, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { usePermissions } from '../hooks/usePermissions';
import { Alert, AlertDescription } from './ui/alert';
import { PrototypeDisclaimer } from './PrototypeDisclaimer';

interface WelcomeScreenProps {
  onStartScan: () => void;
}

export function WelcomeScreen({ onStartScan }: WelcomeScreenProps) {
  const { permissions, isRequesting, allGranted, requestPermissions } = usePermissions();

  const handleStartScan = async () => {
    if (!allGranted) {
      const granted = await requestPermissions();
      if (granted) {
        onStartScan();
      }
    } else {
      onStartScan();
    }
  };

  const getPermissionIcon = (state: string) => {
    if (state === 'granted') return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    return <AlertCircle className="w-4 h-4 text-amber-600" />;
  };

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

        {/* Permissions Required */}
        {!allGranted && (
          <Alert className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-sm text-slate-700">
              <p className="font-semibold mb-2">Permisos necesarios para el análisis:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {getPermissionIcon(permissions.camera)}
                  <Camera className="w-4 h-4 text-slate-600" />
                  <span className="text-xs">Cámara</span>
                </div>
                <div className="flex items-center gap-2">
                  {getPermissionIcon(permissions.microphone)}
                  <Mic className="w-4 h-4 text-slate-600" />
                  <span className="text-xs">Micrófono</span>
                </div>
                <div className="flex items-center gap-2">
                  {getPermissionIcon(permissions.geolocation)}
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <span className="text-xs">Ubicación</span>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {allGranted && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-sm text-green-800">
              ¡Todos los permisos concedidos! Ya puedes iniciar el análisis.
            </AlertDescription>
          </Alert>
        )}

        {/* Main CTA */}
        <div className="space-y-4">
          <Button 
            onClick={handleStartScan}
            disabled={isRequesting}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            <Shield className="w-5 h-5 mr-2" />
            {isRequesting ? 'Solicitando permisos...' : allGranted ? 'Escanear mi dispositivo' : 'Dar permisos y escanear'}
          </Button>
          
          <p className="text-center text-sm text-slate-500">
            {allGranted 
              ? 'Analiza tu dispositivo en segundos y descubre tu nivel de protección'
              : 'Necesitamos algunos permisos para analizar la seguridad de tu dispositivo'
            }
          </p>
        </div>

        {/* Disclaimer Legal */}
        <PrototypeDisclaimer />
      </div>
    </div>
  );
}
