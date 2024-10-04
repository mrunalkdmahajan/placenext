import MainDashboard from "@/components/own/Dashboard/MainDashboard";
import JobCreationForm from "@/components/own/Form/JobCreationForm";
import withStudentAuth from "@/config/services/Student_Auth_service";

function Dashboard() {
  return (
    <div>
      <MainDashboard />
      <JobCreationForm />
    </div>
  );
}

export default withStudentAuth(Dashboard);
