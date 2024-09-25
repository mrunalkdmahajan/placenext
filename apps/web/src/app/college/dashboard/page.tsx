import MainDashboard from "@/components/own/Dashboard/MainDashboard";
import StudentStatisticsChart from "@/components/own/Dashboard/StudentStatisticsChart";

export default function Dashboard() {
  return (
    <div>
      <h1>TPO Dashboard</h1>
      <StudentStatisticsChart />
    </div>
  );
}
