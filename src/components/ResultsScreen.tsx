import { Shield, AlertTriangle, Lock, Eye, Wifi, CheckCircle2, Zap, TrendingUp, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { SecurityRadar } from './SecurityRadar';
import { usePrivacyAnalyzer } from '../hooks/usePrivacyAnalyzer';
import { useEffect, useState } from 'react';

interface ResultsScreenProps {
  onConfigure: () => void;
}

export function ResultsScreen({ onConfigure }: ResultsScreenProps) {
  const { analysis, startAnalysis } = usePrivacyAnalyzer();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    startAnalysis();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return { text: 'Excelente', emoji: '🛡️' };
    if (score >= 60) return { text: 'Mejorable', emoji: '⚠️' };
    return { text: 'Crítico', emoji: '🚨' };
  };

  const scoreLabel = getScoreLabel(analysis.score);
  const criticalThreats = analysis.threats.filter(t => t.type === 'critical').length;
  const warningThreats = analysis.threats.filter(t => t.type === 'warning').length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 py-12 relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 opacity-60"></div>
      
      <div className="max-w-2xl w-full space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
            <span className="text-blue-900 text-xl font-bold">PrivAl</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Análisis Completado</h1>
          <p className="text-slate-600">Hemos detectado {analysis.threats.length} vulnerabilidades en tu dispositivo</p>
        </div>

        {/* Score Card principal con glassmorphism */}
        <Card className="p-8 bg-white/70 backdrop-blur-xl border-0 shadow-2xl relative overflow-hidden">
          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-green-500/10"></div>
          
          <div className="relative z-10 space-y-6">
            {/* Privacy Score Circle */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex flex-col items-center space-y-4">
                <h2 className="text-slate-800 font-bold text-lg">Índice de Privacidad</h2>
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="#e2e8f0"
                      strokeWidth="16"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="url(#gradient)"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${analysis.score * 5.53} 553`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" className={`stop-${getScoreColor(analysis.score)}`} stopColor={analysis.score >= 80 ? '#10b981' : analysis.score >= 60 ? '#f59e0b' : '#ef4444'} />
                        <stop offset="100%" className={`stop-${getScoreColor(analysis.score)}`} stopColor={analysis.score >= 80 ? '#059669' : analysis.score >= 60 ? '#d97706' : '#dc2626'} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-6xl font-bold bg-gradient-to-r ${getScoreColor(analysis.score)} bg-clip-text text-transparent`}>
                      {Math.round(analysis.score)}
                    </span>
                    <span className="text-slate-600 text-sm font-semibold mt-1">{scoreLabel.text} {scoreLabel.emoji}</span>
                  </div>
                </div>
              </div>

              {/* Radar de Seguridad */}
              <div className="flex-1 flex flex-col items-center">
                <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Radar de Amenazas
                </h3>
                <SecurityRadar threats={analysis.threats.length} className="rounded-2xl bg-slate-900/5" />
                <p className="text-xs text-slate-500 mt-2">
                  {analysis.threats.length} amenazas detectadas en tiempo real
                </p>
              </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 rounded-xl bg-red-50 border border-red-100">
                <div className="text-2xl font-bold text-red-600">{criticalThreats}</div>
                <div className="text-xs text-red-700 font-medium">Críticas</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-yellow-50 border border-yellow-100">
                <div className="text-2xl font-bold text-yellow-600">{warningThreats}</div>
                <div className="text-xs text-yellow-700 font-medium">Advertencias</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-blue-50 border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">{analysis.deviceInfo.permissions}</div>
                <div className="text-xs text-blue-700 font-medium">Permisos</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Amenazas detectadas */}
        <Card className="p-6 space-y-4 bg-white/70 backdrop-blur-xl border-0 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="text-slate-800 font-bold text-lg">Vulnerabilidades Detectadas</span>
            </div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {showDetails ? 'Ocultar' : 'Ver todas'}
            </button>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {analysis.threats.slice(0, showDetails ? undefined : 3).map((threat, index) => (
              <div
                key={threat.id}
                className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                  threat.type === 'critical' 
                    ? 'bg-red-50 border-red-200 hover:border-red-300' 
                    : threat.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-200 hover:border-yellow-300'
                    : 'bg-blue-50 border-blue-200 hover:border-blue-300'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  threat.type === 'critical' ? 'bg-red-100' : threat.type === 'warning' ? 'bg-amber-100' : 'bg-blue-100'
                }`}>
                  {threat.type === 'critical' ? (
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  ) : (
                    <Eye className="w-6 h-6 text-amber-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-slate-800 font-bold text-sm">{threat.title}</h4>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      threat.type === 'critical' ? 'bg-red-200 text-red-800' : 'bg-amber-200 text-amber-800'
                    }`}>
                      {threat.risk}% riesgo
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mb-2">{threat.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-slate-500">
                      📱 {threat.affectedApps} app{threat.affectedApps > 1 ? 's' : ''}
                    </span>
                    <span className="text-slate-500">🏷️ {threat.category}</span>
                  </div>
                  {showDetails && (
                    <div className="mt-3 p-3 bg-white/60 rounded-lg border border-slate-200">
                      <p className="text-xs text-slate-700">
                        <strong className="text-green-700">💡 Recomendación:</strong> {threat.recommendation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA Button */}
        <div className="space-y-4 pt-2">
          <Button 
            onClick={onConfigure}
            className="w-full h-16 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg font-bold relative overflow-hidden group"
            size="lg"
          >
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <Zap className="w-6 h-6 mr-2 relative z-10" />
            <span className="relative z-10">Proteger con un Clic ⚡</span>
          </Button>
          
          <p className="text-center text-sm text-slate-600 bg-white/60 backdrop-blur rounded-full px-4 py-2">
            <TrendingUp className="w-4 h-4 inline mr-1" />
            Mejora tu privacidad hasta <strong className="text-green-600">95%</strong> automáticamente
          </p>
        </div>
      </div>
    </div>
  );
}
