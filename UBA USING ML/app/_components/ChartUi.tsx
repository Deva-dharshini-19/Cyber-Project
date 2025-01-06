"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
  total: {
    label: "Total",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  status: string;
  role: string;
  column_7: string | null;
  column_8: string | null;
}

interface Activity {
  id: number;
  loginTime: string;
  logoutTime: string | null;
  ipAddress: string;
  type: string;
  column_6: string | null;
  column_7: string | null;
  column_8: string | null;
  userId: number;
  user: User;
}

export function ChartUi({ activities }: { activities: Activity[] }) {
  interface DailyLogin {
    date: string;
    totalLogins: number;
  }

  function getTotalLoginsPerDay(activities: Activity[]): DailyLogin[] {
    const loginCounts: { [key: string]: number } = {};

    activities.forEach((activity) => {
      // Extract the date from the login time (use only the date part, not the time)
      const loginDate = new Date(activity.loginTime).toLocaleDateString();

      // Increment the login count for that date
      loginCounts[loginDate] = (loginCounts[loginDate] || 0) + 1;
    });

    // Convert the object to an array of DailyLogin objects
    const dailyLogins: DailyLogin[] = Object.entries(loginCounts).map(
      ([date, totalLogins]) => ({
        date,
        totalLogins,
      })
    );

    // Return the daily logins sorted by date
    return dailyLogins.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  const dailyLogins: DailyLogin[] = getTotalLoginsPerDay(activities);

  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-[40vh] py-5 my-7 w-full shadow-sm bg-gray-50"
    >
      <LineChart
        data={dailyLogins}
        width={600}
        height={300}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="totalLogins"
          stroke="#60a5fa"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
