import React, { useState } from 'react';
import ProfileForm from '@/components/company/ProfileForm';

const CompanyProfile = () => {
  const [companyDetails, setCompanyDetails] = useState({
    name: '',
    address: '',
    contact: '',
    website: '',
  });

  const handleSubmit = (details) => {
    setCompanyDetails(details);
    // Here you can add logic to save the company details to a database or file
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Company Profile</h1>
      <ProfileForm onSubmit={handleSubmit} />
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Company Details</h2>
        <p><strong>Name:</strong> {companyDetails.name}</p>
        <p><strong>Address:</strong> {companyDetails.address}</p>
        <p><strong>Contact:</strong> {companyDetails.contact}</p>
        <p><strong>Website:</strong> {companyDetails.website}</p>
      </div>
    </div>
  );
};

export default CompanyProfile;