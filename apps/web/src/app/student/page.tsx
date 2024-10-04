import withStudentAuth from "@/config/services/Student_Auth_service";

function Student() {
  return <div></div>;
}
export default  withStudentAuth(Student);