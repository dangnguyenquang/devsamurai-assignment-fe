import type {
  ChartDataPoint,
  Contact,
  DataType,
  Req_DashboardData,
  TimePeriod,
} from "@/types/dashboard";
import { useEffect, useMemo, useState } from "react";
import { format, subDays } from "date-fns";
import DateRangePicker from "../components/DateRangePicker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LeadGenerationChart from "../components/LeadGenerationChart";
import ContactsList from "../components/ContactsList";
import type { DateRange } from "react-day-picker";
import httpClient from "@/lib/http/httpClient";
import useApi from "@/hooks/useApi";
import type { ApiResponse } from "@/types/response";

const DashboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("7d");
  const [dataType, setDataType] = useState<DataType>("people");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const fetchDashboardData = (): Promise<ApiResponse<Req_DashboardData>> => {
    const params = new URLSearchParams();
    
    if (selectedPeriod === "Custom" && dateRange.from && dateRange.to) {
      params.append('startDate', format(dateRange.from, 'yyyy-MM-dd'));
      params.append('endDate', format(dateRange.to, 'yyyy-MM-dd'));
    } else {
      const today = new Date();
      let startDate: Date;
      
      switch (selectedPeriod) {
        case "1d":
          startDate = subDays(today, 0);
          break;
        case "3d":
          startDate = subDays(today, 2);
          break;
        case "7d":
          startDate = subDays(today, 6);
          break;
        case "30d":
          startDate = subDays(today, 29);
          break;
        default:
          startDate = subDays(today, 6); 
      }
      
      params.append('startDate', format(startDate, 'yyyy-MM-dd'));
      params.append('endDate', format(today, 'yyyy-MM-dd'));
    }
    
    const queryString = params.toString();
    const url = queryString ? `/dashboard?${queryString}` : '/dashboard';
    
    return httpClient.get<Req_DashboardData>(url);
  };

  const { data: dashboardData, loading, error, execute } = useApi<Req_DashboardData>(fetchDashboardData);

  useEffect(() => {
    execute();
  }, [selectedPeriod, dateRange]);

  const chartData = useMemo(() => {
    if (!dashboardData?.newContactsByDay) return [];

    return dashboardData.newContactsByDay.map((item) => ({
      date: item.date,
      value: dataType === "people" ? item.people : item.companies,
      displayDate: format(new Date(item.date), "MMM d"),
    }));
  }, [dashboardData, dataType]);

  const mostVisitedContacts: Contact[] = useMemo(() => {
    if (!dashboardData?.mostVisitedContacts) return [];

    return dashboardData.mostVisitedContacts.map((contact, index) => ({
      id: `most-${index + 1}`,
      name: contact.name,
      visits: contact.visitCount,
      type: contact.name.includes(" ") ? "person" : "company", 
      avatar: contact.avatarUrl,
    }));
  }, [dashboardData]);

  const leastVisitedContacts: Contact[] = useMemo(() => {
    if (!dashboardData?.leastVisitedContacts) return [];

    return dashboardData.leastVisitedContacts.map((contact, index) => ({
      id: `least-${index + 1}`,
      name: contact.name,
      visits: contact.visitCount,
      type: contact.name.includes(" ") ? "person" : "company",
      avatar: contact.avatarUrl,
    }));
  }, [dashboardData]);

  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Failed to load dashboard data</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DateRangePicker
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      <div className="mx-auto max-w-6xl space-y-2 p-2 sm:space-y-8 sm:p-6">
        {/* Main Chart Area */}
        <div className="rounded-xl bg-card">
          <Card className="py-0">
            <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
              <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
                <CardTitle className="text-base">Lead generation</CardTitle>
                <CardDescription>
                  New contacts added to the pool.
                </CardDescription>
              </div>
              <div className="flex">
                {["people", "companies"].map((key) => {
                  const isActive = dataType === key;

                  const value = dashboardData?.newContactsByDay.reduce(
                    (sum, item) => sum + (key === "people" ? item.people : item.companies),
                    0
                  ) || 0;

                  return (
                    <div
                      key={key}
                      className={`relative z-10 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6 cursor-pointer ${
                        isActive ? "bg-muted/50" : ""
                      }`}
                      onClick={() =>
                        setDataType(key === "people" ? "people" : "companies")
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                          <p className={`text-xs text-muted-foreground`}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </p>
                          <p
                            className={`text-lg font-bold leading-none sm:text-2xl`}
                          >
                            {value.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardHeader>
            <CardContent>
              <LeadGenerationChart data={chartData} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactsList
            title="Most visited contacts"
            contacts={mostVisitedContacts}
          />
          <ContactsList
            title="Least visited contacts"
            contacts={leastVisitedContacts}
          />
        </div>
      </div>
    </div>
  );
};


export default DashboardPage;
