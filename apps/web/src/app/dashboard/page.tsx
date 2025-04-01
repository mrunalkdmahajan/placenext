import React from 'react';

const CompanyDashboard = () => {
  // Simulated company data, in a real application this would be fetched from a database
  const companyData = {
    name: "Example Company",
    address: "123 Example St, Example City, EX 12345",
    contact: "contact@example.com",
    phone: "+1 (555) 123-4567",
    description: "We are an example company dedicated to providing excellent services."
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Company Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold">Company Details</h2>
        <p><strong>Name:</strong> {companyData.name}</p>
        <p><strong>Address:</strong> {companyData.address}</p>
        <p><strong>Contact:</strong> {companyData.contact}</p>
        <p><strong>Phone:</strong> {companyData.phone}</p>
        <p><strong>Description:</strong> {companyData.description}</p>
      </div>
    </div>
  );
};

export default CompanyDashboard;