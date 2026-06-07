"use client";

import { useMemo } from "react";
import { formatPrice } from "@/lib/utils";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { DollarSign } from "lucide-react";

interface RevenueChartProps {
  data: {
    date: string;
    revenue: number;
  }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  // If no data or all 0, provide dummy data for preview (or just show 0)
  const hasData = data && data.length > 0 && data.some(d => d.revenue > 0);

  // Jika belum ada data sama sekali dari database
  const chartData = hasData ? data : [
    { date: "Sen", revenue: 0 },
    { date: "Sel", revenue: 0 },
    { date: "Rab", revenue: 0 },
    { date: "Kam", revenue: 0 },
    { date: "Jum", revenue: 0 },
    { date: "Sab", revenue: 0 },
    { date: "Min", revenue: 0 },
  ];

  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="bg-white p-6 rounded-xl border border-surface-200 shadow-sm col-span-1 lg:col-span-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-surface-900 flex items-center gap-2">
            <DollarSign className="size-5 text-green-600" />
            Grafik Pendapatan
          </h2>
          <p className="text-sm text-surface-500 mt-1">7 Hari Terakhir</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <p className="text-2xl font-bold text-surface-900">
            {formatPrice(totalRevenue)}
          </p>
          <p className="text-sm text-green-600 font-medium">Total periode ini</p>
        </div>
      </div>

      <div className="h-[300px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickFormatter={(value) => `Rp ${value / 1000}k`}
              dx={-10}
            />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: any) => [formatPrice(Number(value) || 0), "Pendapatan"]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
