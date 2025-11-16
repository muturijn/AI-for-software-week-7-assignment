
import React, { useState, useCallback } from 'react';
import type { AnalysisResult } from './types';
import { AnalysisState } from './types';
import { analyzeBias } from './services/geminiService';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [analysisState, setAnalysisState] = useState<AnalysisState>(AnalysisState.Idle);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartAnalysis = useCallback(async () => {
    setAnalysisState(AnalysisState.Loading);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await analyzeBias();
      setAnalysisResult(result);
      setAnalysisState(AnalysisState.Success);
    } catch (err) {
      setError('Failed to analyze the dataset. Please try again.');
      setAnalysisState(AnalysisState.Error);
      console.error(err);
    }
  }, []);

  const renderContent = () => {
    switch (analysisState) {
      case AnalysisState.Loading:
        return (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-400"></div>
            <p className="mt-4 text-lg text-gray-300">
              Analyzing COMPAS dataset for racial bias...
            </p>
            <p className="text-sm text-gray-500">
              Calculating fairness metrics and generating visualizations.
            </p>
          </div>
        );
      case AnalysisState.Success:
        return analysisResult ? <Dashboard result={analysisResult} /> : null;
      case AnalysisState.Error:
        return (
          <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg">
            <h3 className="text-xl font-bold text-red-400">Analysis Failed</h3>
            <p className="mt-2 text-red-300">{error}</p>
            <button
              onClick={handleStartAnalysis}
              className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              Retry Analysis
            </button>
          </div>
        );
      case AnalysisState.Idle:
      default:
        return (
          <div className="text-center p-8 md:p-12 bg-gray-800/50 rounded-2xl shadow-2xl border border-gray-700">
            <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
              Uncover Bias in AI
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-300">
              This tool uses a generative AI model to simulate a bias audit of the COMPAS recidivism dataset. It identifies disparities in risk scores across different racial groups, generates key fairness metrics, and provides a detailed report with visualizations.
            </p>
            <div className="mt-8">
              <button
                onClick={handleStartAnalysis}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Begin Fairness Audit
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        {renderContent()}
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by Google Gemini. For educational purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
