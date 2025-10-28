import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight, Banknote } from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";

const metrics = [
  {
    title: "Total Sales",
    value: "R45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: Banknote,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Total Spent",
    value: "R12,234.50",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "-4.3%",
    trend: "down",
    icon: ShoppingCart,
    color: "from-purple-500 to-purple-600",
  },
];

const salesData = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 78 },
  { month: "Mar", value: 52 },
  { month: "Apr", value: 85 },
  { month: "May", value: 72 },
  { month: "Jun", value: 90 },
];

const recentActivity = [
  {
    id: 1,
    invoice: "INV-001",
    amount: "R1,234.56",
    status: "Paid",
    date: "2024-01-15",
  },
  {
    id: 2,
    invoice: "INV-002",
    amount: "R987.65",
    status: "Pending",
    date: "2024-01-14",
  },
  {
    id: 3,
    invoice: "INV-003",
    amount: "R2,345.67",
    status: "Paid",
    date: "2024-01-13",
  },
  {
    id: 4,
    invoice: "INV-004",
    amount: "R567.89",
    status: "Overdue",
    date: "2024-01-12",
  },
];

export default function Dashboard() {
  const maxValue = Math.max(...salesData.map((d) => d.value));

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8 bg-slate-950">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Welcome back!</h1>
          <p className="text-slate-400 text-lg">
            Here's what's happening with your invoices today.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {metrics.map((metric) => (
            <Card
              key={metric.title}
              className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">
                  {metric.title}
                </CardTitle>
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg`}
                >
                  <metric.icon className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{metric.value}</div>
                <div className="flex items-center gap-1 mt-2">
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      metric.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {metric.change}
                  </span>
                  <span className="text-sm text-slate-400 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Sales Analytics Chart */}
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Sales Analytics</CardTitle>
              <p className="text-sm text-slate-400">
                Monthly sales performance
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesData.map((data) => (
                  <div key={data.month} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400 font-medium">
                        {data.month}
                      </span>
                      <span className="text-white font-semibold">
                        {data.value}%
                      </span>
                    </div>
                    <Progress
                      value={data.value}
                      className="h-2 bg-slate-700"
                      indicatorClassName="bg-gradient-to-r from-blue-500 to-blue-600"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <p className="text-sm text-slate-400">
                Latest invoice transactions
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white">
                        {activity.invoice}
                      </p>
                      <p className="text-xs text-slate-400">{activity.date}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-semibold text-white">
                        {activity.amount}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          activity.status === "Paid"
                            ? "bg-green-500/20 text-green-400"
                            : activity.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-slate-400">Pending Invoices</p>
                <p className="text-3xl font-bold text-white">23</p>
                <Progress value={65} className="h-1 bg-slate-700" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-slate-400">Paid This Month</p>
                <p className="text-3xl font-bold text-white">156</p>
                <Progress value={85} className="h-1 bg-slate-700" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-slate-400">Overdue</p>
                <p className="text-3xl font-bold text-white">8</p>
                <Progress value={25} className="h-1 bg-slate-700" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-slate-400">Total Clients</p>
                <p className="text-3xl font-bold text-white">342</p>
                <Progress value={95} className="h-1 bg-slate-700" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}