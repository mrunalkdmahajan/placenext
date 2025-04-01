"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CompanyProfileForm from '@/components/company/CompanyProfileForm';

export default function CompanyProfileSetupPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('userData');
    if (!userData) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <CompanyProfileForm isNewCompany={true} />
      </div>
    </div>
  );
}