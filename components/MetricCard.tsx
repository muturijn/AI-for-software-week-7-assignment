
import React from 'react';
import type { Metric } from '../types';

interface MetricCardProps {
  metric: Metric;
}

const getGroupColor = (group: string) => {
    switch (group.toLowerCase()) {
        case 'african-american':
            return 'border-t-red-400';
        case 'caucasian':
            return 'border-t-blue-400';
        case 'disparity':
            return 'border-t-yellow-400';
        default:
            return 'border-t-gray-500';
    }
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const borderColorClass = getGroupColor(metric.group);
  return (
    <div className={`bg-gray-800 p-5 rounded-lg shadow-md border-t-4 ${borderColorClass} transition-transform transform hover:scale-105 duration-300`}>
      <div className="flex justify-between items-start">
        <h4 className="text-sm font-medium text-gray-400">{metric.label}</h4>
        <span className="text-xs font-mono px-2 py-1 bg-gray-700 rounded-full">{metric.group}</span>
      </div>
      <p className="text-3xl font-bold mt-2 text-white">{metric.value}</p>
      <p className="text-xs text-gray-500 mt-2">{metric.description}</p>
    </div>
  );
};

export default MetricCard;
