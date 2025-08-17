import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { ChartDataPoint } from '@/types/dashboard';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

// Chart Component
const LeadGenerationChart: React.FC<{
  data: ChartDataPoint[];
}> = ({ data }) => {
  const chartConfig = {
    value: {
      label: "Contacts",
      color: "#ea5545",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="displayDate" 
            axisLine={false}
            tickLine={false}
            className="text-xs text-gray-500"
          />
          <YAxis hide />
          <ChartTooltip
            content={<ChartTooltipContent />}
            cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
          />
          <Bar 
            dataKey="value" 
            radius={[2, 2, 0, 0]}
            className="animate-in slide-in-from-bottom duration-700"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#ea5545" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default LeadGenerationChart;