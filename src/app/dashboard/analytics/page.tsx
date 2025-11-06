"use client";

import { useState } from "react";
import { Button } from "@/components/ui-elements/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui-elements/select";
import { Download } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { toast } from "@/hooks/use-toast";
import { ChartCard } from "@/components/dashboard/chart-card";
import { PageHeader } from "@/components/dashboard/page-header";

export default function AnalyticsPage() {
  const [days, setDays] = useState(30);
  const [channel, setChannel] = useState("all");
  const [status, setStatus] = useState("all");

  const data = [];

  const handleExportCSV = () => {
    const headers = [
      "Dátum",
      "Üzenetek",
      "Címzettek",
      "Kézbesítési arány",
      "Válaszadási arány",
    ];
    const rows = data.map((row) => [
      row.date,
      row.messages,
      row.recipients,
      row.deliveryRate.toFixed(2),
      row.replyRate.toFixed(2),
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wavib-analytics-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();

    toast({
      title: "CSV exportálva",
      description: "Az analitika sikeresen letöltve.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        <PageHeader
          title="Analitika"
          subtitle="Részletes betekintés a teljesítményedbe."
          actions={
            <Button onClick={handleExportCSV} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              CSV exportálás
            </Button>
          }
        />

        <div className="flex flex-wrap gap-4 mb-8">
          <Select value={days.toString()} onValueChange={(v) => setDays(parseInt(v))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Időszak" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Utolsó 7 nap</SelectItem>
              <SelectItem value="30">Utolsó 30 nap</SelectItem>
              <SelectItem value="90">Utolsó 90 nap</SelectItem>
            </SelectContent>
          </Select>

          <Select value={channel} onValueChange={setChannel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Csatorna" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Összes csatorna</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="viber">Viber</SelectItem>
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Állapot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Összes állapot</SelectItem>
              <SelectItem value="delivered">Kézbesítve</SelectItem>
              <SelectItem value="sent">Elküldve</SelectItem>
              <SelectItem value="failed">Sikertelen</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          <ChartCard title="Üzenetek időbeli alakulása" description="Napi bontásban">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data}>
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="messages"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Üzenetek"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Egyedi címzettek" description="Napi aktív felhasználók">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data}>
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="recipients"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  name="Címzettek"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Teljesítmény mutatók" description="Kézbesítési és válaszadási arány">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data}>
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="deliveryRate"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  name="Kézbesítési arány (%)"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="replyRate"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Válaszadási arány (%)"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
