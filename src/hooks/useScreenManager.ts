import { useState } from 'react';

export type Screen = 'welcome' | 'scanning' | 'results' | 'confirmation';

export function useScreenManager() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  const handleStartScan = () => {
    setCurrentScreen('scanning');
  };

  const handleConfigureProtection = () => {
    setCurrentScreen('confirmation');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  const handleScanComplete = () => {
    setCurrentScreen('results');
  };

  return {
    currentScreen,
    handleStartScan,
    handleConfigureProtection,
    handleBackToWelcome,
    handleScanComplete,
  };
}
