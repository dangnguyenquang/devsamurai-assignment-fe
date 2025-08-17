import type { TimePeriod } from "@/types/dashboard";
import { format } from "date-fns";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";

const DateRangePicker: React.FC<{
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}> = ({ selectedPeriod, onPeriodChange, dateRange, onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDateRange = () => {
    if (!dateRange.from) return "Pick a date";
    if (!dateRange.to) return format(dateRange.from, "MMM dd, yyyy");
    return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(
      dateRange.to,
      "MMM dd, yyyy"
    )}`;
  };

  return (
    <div className="relative flex h-12 items-center justify-between gap-2 border-b px-4 sm:px-6">
      {/* Tabs */}
      <div className="flex flex-row items-center gap-4">
        <Tabs
          value={selectedPeriod}
          onValueChange={(value) => onPeriodChange(value as TimePeriod)}
          className="hidden sm:flex -ml-2"
        >
          <TabsList className="inline-flex items-center justify-starth-12 max-h-12 min-h-12 gap-x-2 border-none bg-transparent p-0">
            {["1d", "3d", "7d", "30d", "Custom"].map((val) => (
              <TabsTrigger
                key={val}
                value={val}
                className="data-[state=active]:shadow-none text-sm rounded-none shadow-none border-transparent data-[state=active]:border-b-black data-[state=active]:font-medium"
              >
                {val}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
  
        {selectedPeriod === "Custom" && (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-8 text-sm font-normal flex items-center gap-2 border-gray-300"
              >
                <CalendarIcon className="h-4 w-4 text-gray-500" />
                {formatDateRange()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                selected={dateRange}
                onSelect={(range) => {
                  onDateRangeChange(range || { from: new Date(), to: new Date() });
                  if (range?.from && range?.to) {
                    setIsOpen(false);
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;
