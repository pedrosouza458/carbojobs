"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { title: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { title: "safari", visitors: 200, fill: "var(--color-safari)" },
  { title: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { title: "edge", visitors: 173, fill: "var(--color-edge)" },
  { title: "teste", visitors: 90, fill: "var(--color-teste)" },
  { title: "teste2", visitors: 90, fill: "var(--color-teste2)" },
  { title: "teste2", visitors: 90, fill: "var(--color-teste3)" },
  
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Whatsapp",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Instagram",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Twitter",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Twitch",
    color: "hsl(var(--chart-4))",
  },
  teste: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
  teste2: {
    label: "Teste",
    color: "hsl(var(--chart-1))",
  },
  teste3: {
    label: "Teste2",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function HorizontalBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Links mais acessados</CardTitle>
        <CardDescription>Desde a criação do link</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="title"
              type="category"
              tickLine={false}
              tickMargin={-4}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
