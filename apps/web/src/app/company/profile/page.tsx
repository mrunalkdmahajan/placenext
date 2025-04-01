"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, getCurrentUserProfile, initDB } from "@/utils/db";
import CompanyProfileForm from "@/components/company/CompanyProfileForm";

export default function CompanyProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  
  useEffect(() => {
    // Initialize our simulated database
    initDB();
    
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    // Get user's company profile
    const userProfile = getCurrentUserProfile();
    if (userProfile) {
      setProfileData(userProfile);
    } else {
      // Redirect to profile setup if no profile exists
      router.push('/company/profile/setup');
    }
    
    setLoading(false);
  }, [router]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        {profileData && <CompanyProfileForm initialData={profileData} />}
      </div>
    </div>
  );
}