import z from "zod";

export const StudentApplicationFormValidations = z.object({
  firstName: z.string().min(2, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name is required"),
  gender: z.string().min(2, "Gender is required"),
  fatherName: z.string().min(2, "Father's name is required"),
  motherName: z.string().min(2, "Mother's name is required"),
  rollNumber: z.string().min(2, "Roll number is required"),
  division: z.string().min(2, "Division is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"), // Can be adjusted to date type if needed
  email: z.string().email("Invalid email format"),
  alternateEmail: z.string().email("Invalid alternate email format").optional(),
  aadharNumber: z.string().length(12, "Aadhar number must be 12 digits"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits"),
  alternatePhoneNo: z.string().optional(),
  panNumber: z.string().optional(),
  address: z.string().min(2, "Address is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
  pincode: z.string().length(6, "Pincode must be 6 digits"),
  courseType: z.string().optional(),
  admissionYear: z.string().length(4, "Admission year must be 4 digits"),
  departmentName: z.string().optional(),
  tenthPercentage: z
    .string()
    .min(0, "Tenth percentage must be between 0 and 100")
    .max(100, "Tenth percentage must be between 0 and 100"),
  hscBoard: z.string().optional(),
  twelfthPercentage: z
    .string()
    .min(0, "Twelfth percentage must be between 0 and 100")
    .max(100, "Twelfth percentage must be between 0 and 100"),
  sscBoard: z.string().optional(),
  cet: z.string().optional(),

  // Semester grades
  sem1: z.string().optional(),
  sem1Marksheet: z.instanceof(File).optional(),
  sem2: z.string().optional(),
  sem2Marksheet: z.instanceof(File).optional(),
  sem3: z.string().optional(),
  sem3Marksheet: z.instanceof(File).optional(),
  sem4: z.string().optional(),
  sem4Marksheet: z.instanceof(File).optional(),
  sem5: z.string().optional(),
  sem5Marksheet: z.instanceof(File).optional(),
  sem6: z.string().optional(),
  sem6Marksheet: z.instanceof(File).optional(),
  sem7: z.string().optional(),
  sem7Marksheet: z.instanceof(File).optional(),
  sem8: z.string().optional(),
  sem8Marksheet: z.instanceof(File).optional(),
});
