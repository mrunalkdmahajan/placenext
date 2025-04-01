import { Toaster } from "@/components/ui/company/sonner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Profile Management",
  description: "Create and manage your company profile",
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="company-layout">
      {children}
      {/* <Toaster /> */}
    </div>
  );
}