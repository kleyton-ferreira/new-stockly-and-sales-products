"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../_components/ui/chart";
import { DayTotalRevenue } from "../_data-access/dashboard/get-dashboard";
import { useEffect, useState } from "react";

const chartConfig = {
  totalRevenue: {
    label: "Receita",
    color: "#00A180",
  },
} satisfies ChartConfig;

interface RevenueChartProps {
  data: DayTotalRevenue[];
}

// Função para formatar valores como moeda
const formatCurrency = (value: number) => {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}k`;
  }
  return `$${value}`;
};

const RevenueChart = ({ data }: RevenueChartProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Configurações responsivas
  const getChartHeight = () => {
    if (isMobile) return 300;
    if (isTablet) return 350;
    return 400;
  };

  const getMargin = () => {
    if (isMobile) {
      return { top: 16, right: 8, left: 45, bottom: 0 };
    }
    if (isTablet) {
      return { top: 20, right: 12, left: 60, bottom: 0 };
    }
    return { top: 20, right: 20, left: 70, bottom: 0 };
  };

  const getTickFontSize = () => {
    if (isMobile) return 11;
    if (isTablet) return 12;
    return 13;
  };

  const getBarRadius = (): [number, number, number, number] => {
    if (isMobile) return [6, 6, 0, 0];
    return [8, 8, 0, 0];
  };

  const getYAxisWidth = () => {
    if (isMobile) return 45;
    if (isTablet) return 60;
    return 70;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full"
    >
      <div className="w-full overflow-x-auto">
        <div
          style={{
            minWidth: isMobile ? "100%" : "auto",
            width: "100%",
          }}
        >
          <ChartContainer
            config={chartConfig}
            className="w-full"
            style={{
              height: `${getChartHeight()}px`,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart accessibilityLayer data={data} margin={getMargin()}>
                <CartesianGrid vertical={false} stroke="rgba(0, 0, 0, 0.08)" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={isMobile ? 6 : 10}
                  tick={{ fontSize: getTickFontSize() }}
                  angle={isMobile ? -45 : 0}
                  height={isMobile ? 60 : 40}
                  textAnchor={isMobile ? "end" : "middle"}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: getTickFontSize() }}
                  width={getYAxisWidth()}
                  tickFormatter={formatCurrency}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={{ fill: "rgba(0, 161, 128, 0.08)" }}
                />
                <Bar
                  dataKey="totalRevenue"
                  fill="var(--color-totalRevenue)"
                  radius={getBarRadius()}
                  animationDuration={1200}
                  animationEasing="ease-out"
                  isAnimationActive={true}
                  maxBarSize={isMobile ? 32 : 60}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default RevenueChart;
