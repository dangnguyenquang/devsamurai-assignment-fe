export interface ChartDataPoint {
  date: string;
  value: number;
  displayDate: string;
}

export interface Contact {
  id: string;
  name: string;
  company?: string;
  avatar?: string;
  visits: number;
  type: 'person' | 'company';
}

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export type TimePeriod = '1d' | '3d' | '7d' | '30d' | 'Custom';
export type DataType = 'people' | 'companies';

export interface ChartDataPoint {
  date: string;
  value: number;
  displayDate: string;
}

export interface Contact {
  id: string;
  name: string;
  company?: string;
  avatar?: string;
  visits: number;
  type: 'person' | 'company';
}

export type DateRange = {
  from?: Date
  to?: Date
}

export type TimePeriod = '1d' | '3d' | '7d' | '30d' | 'Custom';
export type DataType = 'people' | 'companies';

export interface DashboardState {
  selectedPeriod: TimePeriod;
  dataType: DataType;
  dateRange: DateRange;
}

export interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export interface ContactsListProps {
  title: string;
  contacts: Contact[];
}

export interface ChartProps {
  data: ChartDataPoint[];
  animate?: boolean;
}

export interface DateRangePickerProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export interface Req_DashboardData {

  newContactsByDay: Array<{
    date: string;
    people: number;
    companies: number;
  }>;
  mostVisitedContacts: Array<{
    name: string;
    visitCount: number;
    avatarUrl: string;
  }>;
  leastVisitedContacts: Array<{
    name: string;
    visitCount: number;
    avatarUrl: string;
  }>;

}