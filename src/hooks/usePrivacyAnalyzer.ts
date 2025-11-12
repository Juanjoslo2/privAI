import { useEffect, useState } from 'react';

export interface ThreatData {
  id: string;
  type: 'critical' | 'warning' | 'info';
  category: string;
  title: string;
  description: string;
  affectedApps: number;
  risk: number;
  recommendation: string;
}

export interface PrivacyAnalysis {
  score: number;
  threats: ThreatData[];
  deviceInfo: {
    platform: string;
    permissions: number;
    location: string;
  };
  scanning: boolean;
}

export function usePrivacyAnalyzer() {
  const [analysis, setAnalysis] = useState<PrivacyAnalysis>({
    score: 0,
    threats: [],
    deviceInfo: {
      platform: '',
      permissions: 0,
      location: 'Desconocida',
    },
    scanning: false,
  });

  const generateThreats = (): ThreatData[] => {
    const possibleThreats: ThreatData[] = [
      {
        id: '1',
        type: 'critical',
        category: 'Ubicación',
        title: 'Rastreo de ubicación continuo',
        description: 'Múltiples apps tienen acceso permanente a tu ubicación',
        affectedApps: Math.floor(Math.random() * 15) + 5,
        risk: 95,
        recommendation: 'Cambiar permisos de ubicación a "Solo cuando se usa la app"',
      },
      {
        id: '2',
        type: 'critical',
        category: 'Cámara',
        title: 'Acceso no restringido a cámara',
        description: 'Apps pueden activar tu cámara sin notificación',
        affectedApps: Math.floor(Math.random() * 10) + 3,
        risk: 88,
        recommendation: 'Restringir acceso a cámara en segundo plano',
      },
      {
        id: '3',
        type: 'warning',
        category: 'Micrófono',
        title: 'Permisos de micrófono sospechosos',
        description: 'Apps con acceso al micrófono que no lo necesitan',
        affectedApps: Math.floor(Math.random() * 8) + 2,
        risk: 72,
        recommendation: 'Revisar y revocar permisos innecesarios de micrófono',
      },
      {
        id: '4',
        type: 'warning',
        category: 'Red',
        title: 'Conexión a red pública sin VPN',
        description: 'Tu dispositivo está expuesto en redes públicas',
        affectedApps: 1,
        risk: 65,
        recommendation: 'Usar VPN cuando te conectes a redes WiFi públicas',
      },
      {
        id: '5',
        type: 'warning',
        category: 'Datos',
        title: 'Apps recopilando datos en segundo plano',
        description: 'Detección de transferencia de datos sospechosa',
        affectedApps: Math.floor(Math.random() * 12) + 4,
        risk: 70,
        recommendation: 'Desactivar datos en segundo plano para apps no esenciales',
      },
      {
        id: '6',
        type: 'info',
        category: 'Cookies',
        title: 'Rastreadores de terceros activos',
        description: 'Cookies de rastreo detectadas en el navegador',
        affectedApps: Math.floor(Math.random() * 20) + 10,
        risk: 45,
        recommendation: 'Activar bloqueo de cookies de terceros',
      },
      {
        id: '7',
        type: 'critical',
        category: 'Contactos',
        title: 'Acceso completo a contactos',
        description: 'Apps tienen acceso ilimitado a tu lista de contactos',
        affectedApps: Math.floor(Math.random() * 7) + 3,
        risk: 80,
        recommendation: 'Limitar acceso a contactos solo cuando sea necesario',
      },
      {
        id: '8',
        type: 'warning',
        category: 'Calendario',
        title: 'Sincronización de calendario sin cifrar',
        description: 'Tu información de calendario se sincroniza sin encriptación',
        affectedApps: Math.floor(Math.random() * 5) + 2,
        risk: 58,
        recommendation: 'Usar servicios con encriptación end-to-end',
      },
    ];

    // Seleccionar amenazas aleatorias
    const numThreats = Math.floor(Math.random() * 4) + 4; // 4-7 amenazas
    const selectedThreats = possibleThreats
      .sort(() => Math.random() - 0.5)
      .slice(0, numThreats);

    return selectedThreats;
  };

  const calculateScore = (threats: ThreatData[]): number => {
    if (threats.length === 0) return 100;
    
    const totalRisk = threats.reduce((sum, threat) => sum + threat.risk, 0);
    const avgRisk = totalRisk / threats.length;
    
    // Score inverso al riesgo promedio
    return Math.max(0, Math.min(100, 100 - avgRisk));
  };

  const detectDeviceInfo = () => {
    const platform = navigator.platform || 'Desconocido';
    const permissions = Math.floor(Math.random() * 30) + 15;
    
    // Intentar obtener ubicación aproximada (ciudad)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setAnalysis(prev => ({
            ...prev,
            deviceInfo: {
              ...prev.deviceInfo,
              location: 'Ubicación detectada',
            },
          }));
        },
        () => {
          setAnalysis(prev => ({
            ...prev,
            deviceInfo: {
              ...prev.deviceInfo,
              location: 'Ubicación no disponible',
            },
          }));
        }
      );
    }

    return { platform, permissions, location: 'Detectando...' };
  };

  const startAnalysis = () => {
    setAnalysis(prev => ({ ...prev, scanning: true }));
    
    const deviceInfo = detectDeviceInfo();
    
    // Simular análisis progresivo
    setTimeout(() => {
      const threats = generateThreats();
      const score = calculateScore(threats);
      
      setAnalysis({
        score,
        threats,
        deviceInfo,
        scanning: false,
      });
    }, 3000);
  };

  return {
    analysis,
    startAnalysis,
  };
}
