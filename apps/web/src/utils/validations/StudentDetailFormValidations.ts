import z from "zod";

export const StudentDetailFormValidations = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  rollNumber: z.string().min(2, "Roll number is required"),
  division: z.string().min(2, "Division is required"),
  fatherName: z.string().min(2, "Father's name is required"),
  motherName: z.string().min(2, "Mother's name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be less than 15 digits"),
  alternatePhoneNumber: z.string().min(10, "Alternate phone number must be at least 10 digits").max(15, "Alternate phone number must be less than 15 digits"),
  alternateEmailId: z.string().email("Invalid alternate email address"),
  pincode: z.string().min(6, "Pincode must be 6 digits").max(6, "Pincode must be 6 digits"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
  admissionYear: z.string().min(4, "Admission year is required").max(4, "Admission year must be 4 digits"),
  religion: z.string().min(2, "Religion is required"),
  caste: z.string().min(2, "Caste is required"),
  gapInEducation: z.number().min(0).max(4),
  sem1Sgpi: z.number().min(0).max(10),
  sem1LiveKt: z.number().min(0).max(6),
  sem1DeadKt: z.number().min(0).max(6),
  sem2Sgpi: z.number().min(0).max(10),
  sem2LiveKt: z.number().min(0).max(6),
  sem2DeadKt: z.number().min(0).max(6),
  sem3Sgpi: z.number().min(0).max(10),
  sem3LiveKt: z.number().min(0).max(6),
  sem3DeadKt: z.number().min(0).max(6),
  sem4Sgpi: z.number().min(0).max(10),
  sem4LiveKt: z.number().min(0).max(6),
  sem4DeadKt: z.number().min(0).max(6),
  aggregateCgpiUptoSem4: z.number().min(0).max(10),
  tenthPercentage: z.number().min(0).max(100),
  twelfthPercentage: z.number().min(0).max(100),
  cetPercentile: z.number().min(0).max(100),
});