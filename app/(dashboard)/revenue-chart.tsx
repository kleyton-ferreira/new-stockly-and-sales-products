"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../_components/ui/chart";
import { DayTotalRevenue } from "../_data-access/dashboard/get-dashboard";

const chartConfig = {
  totalRevenue: {
    label: "Receita",
    color: "#00A180",
  },
} satisfies ChartConfig;

interface RevenueChartProps {
  data: DayTotalRevenue[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-0 w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="totalRevenue"
          fill="var(--color-totalRevenue)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default RevenueChart;
