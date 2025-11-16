
export enum AnalysisState {
    Idle = 'IDLE',
    Loading = 'LOADING',
    Success = 'SUCCESS',
    Error = 'ERROR',
}

export interface Metric {
    label: string;
    value: string;
    description: string;
    group: string;
}
  
export interface ChartDataPoint {
    group: string;
    'False Positive Rate (%)': number;
}
  
export interface AnalysisResult {
    metrics: Metric[];
    chartData: ChartDataPoint[];
    report: string;
}
