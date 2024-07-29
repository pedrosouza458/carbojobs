"use client"

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Label } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { getAppointmentsByService } from "@/http/get-appointments-by-service";

interface ChartData {
  service: string;
  appointments: number;
  fill: string;
}

const chartConfig = {
  services: {
    label: "Services",
  }
} satisfies ChartConfig;

export function PieChartComponent() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAppointmentsByService();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching appointments data:", error);
      }
    };

    fetchData();
  }, []);

  const totalAppointments = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.appointments, 0);
  }, [chartData]);

  return (
    <Card className="h-[25rem]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Agendamentos por serviço</CardTitle>
        <CardDescription>Janeiro - Dezembro 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex justify-center items-center pb-0">
        <div className="w-full h-full flex justify-center items-center">
          <ChartContainer
            config={chartConfig}
            className="aspect-square max-h-[270px] w-full h-full flex justify-center items-center"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="appointments"
                nameKey="service"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalAppointments.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Agendamentos
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent labelKey="Appointments" nameKey="service" />
                }
              />
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
