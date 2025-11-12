import { useState, useEffect } from 'react';

export interface PermissionStatus {
  camera: PermissionState | 'unknown';
  microphone: PermissionState | 'unknown';
  geolocation: PermissionState | 'unknown';
}

export function usePermissions() {
  const [permissions, setPermissions] = useState<PermissionStatus>({
    camera: 'prompt',
    microphone: 'prompt',
    geolocation: 'prompt',
  });
  const [isRequesting, setIsRequesting] = useState(false);
  const [allGranted, setAllGranted] = useState(false);

  // Verificar estado inicial de permisos
  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      // Verificar permiso de cámara
      const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
      
      // Verificar permiso de micrófono
      const microphonePermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      
      // Verificar permiso de ubicación
      const geolocationPermission = await navigator.permissions.query({ name: 'geolocation' as PermissionName });

      const newPermissions = {
        camera: cameraPermission.state,
        microphone: microphonePermission.state,
        geolocation: geolocationPermission.state,
      };

      setPermissions(newPermissions);
      
      // Verificar si todos están concedidos
      const granted = 
        newPermissions.camera === 'granted' &&
        newPermissions.microphone === 'granted' &&
        newPermissions.geolocation === 'granted';
      
      setAllGranted(granted);
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  const requestPermissions = async (): Promise<boolean> => {
    setIsRequesting(true);
    
    try {
      // Solicitar acceso a la cámara
      let cameraGranted = false;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        cameraGranted = true;
      } catch (error) {
        console.error('Camera permission denied:', error);
      }

      // Solicitar acceso al micrófono
      let microphoneGranted = false;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        microphoneGranted = true;
      } catch (error) {
        console.error('Microphone permission denied:', error);
      }

      // Solicitar acceso a la ubicación
      let geolocationGranted = false;
      try {
        await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        geolocationGranted = true;
      } catch (error) {
        console.error('Geolocation permission denied:', error);
      }

      // Actualizar estado de permisos
      await checkPermissions();

      const allGranted = cameraGranted && microphoneGranted && geolocationGranted;
      setAllGranted(allGranted);
      
      return allGranted;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    } finally {
      setIsRequesting(false);
    }
  };

  return {
    permissions,
    isRequesting,
    allGranted,
    requestPermissions,
    checkPermissions,
  };
}
