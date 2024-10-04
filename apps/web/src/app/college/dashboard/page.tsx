import MainDashboard from "@/components/own/Dashboard/MainDashboard";
import StudentStatisticsChart from "@/components/own/Dashboard/StudentStatisticsChart";
import withCollegeAuth from "@/config/services/College_Auth_service";

function Dashboard() {
  return (
    <div>
      <StudentStatisticsChart />
    </div>
  );
}
export default withCollegeAuth(Dashboard);