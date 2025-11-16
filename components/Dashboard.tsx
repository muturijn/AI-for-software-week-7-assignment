
import React from 'react';
import type { AnalysisResult } from '../types';
import MetricCard from './MetricCard';
import BiasChart from './BiasChart';
import ReportSection from './ReportSection';

interface DashboardProps {
  result: AnalysisResult;
}

const Dashboard: React.FC<DashboardProps> = ({ result }) => {
  const { metrics, chartData, report } = result;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-200">
            Disparity in False Positive Rates
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            This chart compares the rate at which defendants who did not re-offend were incorrectly flagged as high-risk, broken down by race.
          </p>
          <BiasChart data={chartData} />
        </div>

        <div className="lg:col-span-2">
           <ReportSection report={report} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
