
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../types';

interface BiasChartProps {
  data: ChartDataPoint[];
}

const BiasChart: React.FC<BiasChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis dataKey="group" tick={{ fill: '#A0AEC0' }} />
          <YAxis tick={{ fill: '#A0AEC0' }} unit="%" />
          <Tooltip
            cursor={{ fill: 'rgba(147, 197, 253, 0.1)' }}
            contentStyle={{
              backgroundColor: '#1F2937',
              borderColor: '#4B5563',
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#E5E7EB' }}
          />
          <Legend wrapperStyle={{ color: '#E5E7EB' }} />
          <Bar dataKey="False Positive Rate (%)" fill="#EF4444" name="African-American" />
          <Bar dataKey="False Positive Rate (%)" fill="#3B82F6" name="Caucasian" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BiasChart;
