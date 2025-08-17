// lib/chart-config.ts
import { type DataType } from '../types/dashboard';

export const chartConfigs = {
  people: {
    value: {
      label: "People",
      color: "#ea5545",
    },
  },
  companies: {
    value: {
      label: "Companies", 
      color: "#27aedb",
    },
  },
};

export const chartAnimationConfig = {
  animationBegin: 0,
  animationDuration: 800,
  animationEasing: 'ease-out',
};

export const getChartConfig = (dataType: DataType) => {
  return chartConfigs[dataType];
};

export const chartMargins = {
  top: 20,
  right: 30,
  left: 20,
  bottom: 5,
};

export const barChartProps = {
  radius: [2, 2, 0, 0] as [number, number, number, number],
  className: "animate-in slide-in-from-bottom duration-700",
};

export const tooltipConfig = {
  cursor: { fill: 'rgba(0, 0, 0, 0.1)' },
  contentStyle: {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
};