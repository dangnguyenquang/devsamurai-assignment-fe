import type { DataType, DateRange, TimePeriod } from "@/types/dashboard";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDaysFromPeriod(period: TimePeriod, dateRange?: DateRange): number {
  if (period === 'Custom' && dateRange?.from && dateRange?.to) {
    const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }
  
  switch (period) {
    case '1d': return 1;
    case '3d': return 3;
    case '7d': return 7;
    case '30d': return 30;
    default: return 7;
  }
}

export function formatDateRange(dateRange: DateRange): string {
  if (!dateRange.from) return 'Pick a date';
  if (!dateRange.to) return dateRange.from.toLocaleDateString();
  return `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`;
}

export function calculateTotalValue(data: { value: number }[]): number {
  return data.reduce((sum, item) => sum + item.value, 0);
}

export function getChartColor(dataType: DataType): string {
  return dataType === 'people' ? '#ea5545' : '#27aedb';
}

export function animateValue(
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void
): void {
  const startTime = performance.now();
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = Math.round(start + (end - start) * easeOutQuart);
    
    callback(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
}