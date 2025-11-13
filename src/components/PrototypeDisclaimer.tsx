import { Info, Shield } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function PrototypeDisclaimer() {
  return (
    <Alert className="bg-blue-50/80 backdrop-blur border-blue-200 shadow-sm">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-xs text-slate-700">
        <div className="space-y-1">
          <p className="font-semibold text-blue-800">🔒 Prototipo de Demostración</p>
          <p>
            Esta aplicación es un prototipo educativo. <strong>No recopilamos, almacenamos ni procesamos datos personales reales.</strong> 
            Los análisis y amenazas mostrados son simulaciones con fines demostrativos únicamente.
          </p>
          <p className="text-[10px] text-slate-600 mt-2">
            Los permisos solicitados son únicamente para demostrar la funcionalidad del prototipo y se liberan inmediatamente.
          </p>
        </div>
      </AlertDescription>
    </Alert>
  );
}
