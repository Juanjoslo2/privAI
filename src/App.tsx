import { WelcomeScreen } from './components/WelcomeScreen';
import { ScanningScreen } from './components/ScanningScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { useScreenManager } from './hooks/useScreenManager';

export default function App() {
  const { 
    currentScreen, 
    handleStartScan, 
    handleConfigureProtection, 
    handleBackToWelcome,
    handleScanComplete,
  } = useScreenManager();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {currentScreen === 'welcome' && <WelcomeScreen onStartScan={handleStartScan} />}
      {currentScreen === 'scanning' && <ScanningScreen onScanComplete={handleScanComplete} />}
      {currentScreen === 'results' && <ResultsScreen onConfigure={handleConfigureProtection} />}
      {currentScreen === 'confirmation' && <ConfirmationScreen onBackToWelcome={handleBackToWelcome} />}
    </div>
  );
}
