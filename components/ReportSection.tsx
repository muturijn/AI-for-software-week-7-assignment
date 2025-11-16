
import React from 'react';

interface ReportSectionProps {
  report: string;
}

const ReportSection: React.FC<ReportSectionProps> = ({ report }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg h-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
        Audit Report & Recommendations
      </h3>
      <div className="prose prose-invert prose-sm text-gray-300 max-w-none space-y-4">
        {report.split('\\n\\n').map((paragraph, index) => (
            <p key={index}>{paragraph.replace(/\\n/g, ' ')}</p>
        ))}
      </div>
    </div>
  );
};

export default ReportSection;
