import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MetricCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ title, value, icon, isActive, onClick }) => (
  <Card 
    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
      isActive ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
    }`}
    onClick={onClick}
  >
    <CardContent className="flex items-center justify-between p-4">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="h-8 w-8 text-gray-500">
        {icon}
      </div>
    </CardContent>
  </Card>
);

export default MetricCard;