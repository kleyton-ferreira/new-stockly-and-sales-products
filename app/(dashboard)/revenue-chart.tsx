"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <ChartContainer config={chartConfig} className="min-h-0 w-full">
        <BarChart accessibilityLayer data={data} margin={{ top: 20 }}>
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
            radius={[8, 8, 0, 0]}
            animationDuration={1200}
            animationEasing="ease-out"
            isAnimationActive={true}
          />
        </BarChart>
      </ChartContainer>
    </motion.div>
  );
};

export default RevenueChart;
