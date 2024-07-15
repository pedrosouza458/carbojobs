"use client"

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, CartesianGrid, XAxis, Bar } from "recharts";
import { getAppointmentsByDay } from "@/http/get-appointments-by-day";

interface ChartData {
  date: string;
  appointments: number;
}

type ChartType = "appointments"; // Define the chart types here

interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

const chartConfig: ChartConfig = {
  appointments: {
    label: "Agendamentos",
    color: "hsl(var(--chart-1))",
  },
};

export default function SecondBarChartComponent() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const getLast3MonthsDates = () => {
      const today = new Date();
      const result: Date[] = [];
      for (let i = 2; i >= 0; i--) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        for (let d = 1; d <= daysInMonth; d++) {
          result.push(new Date(date.getFullYear(), date.getMonth(), d));
        }
      }
      return result;
    };

    const fetchData = async () => {
      try {
        const appointmentsData = await getAppointmentsByDay();
        const dates = getLast3MonthsDates();
        const mergedData: ChartData[] = dates.map((date) => {
          const dateKey = date.toISOString().split('T')[0];
          const matchingData = appointmentsData.find((data: any) => data.date === dateKey);
          return {
            date: dateKey,
            appointments: matchingData ? matchingData.appointments : 0,
          };
        });
        setChartData(mergedData);
      } catch (error) {
        console.error("Error fetching appointments data:", error);
      }
    };

    fetchData();
  }, []);

  const [activeChart, setActiveChart] = useState<ChartType>("appointments");

  const total = React.useMemo(
    () => ({
      appointments: chartData.reduce((acc, curr) => acc + curr.appointments, 0),
    }),
    [chartData]
  );

  return (
    <Card className="h-[27.2rem]">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Total de agendamentos por dia</CardTitle>
          <CardDescription>Agendamentos dos últimos 3 meses</CardDescription>
        </div>
        <div className="flex">
          {Object.keys(chartConfig).map((key) => {
            const chart = key as ChartType;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[chart].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="appointments"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
