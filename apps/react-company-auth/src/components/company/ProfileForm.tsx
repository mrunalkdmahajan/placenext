import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/toast';

const ProfileForm = () => {
  const { toast } = useToast();
  const [companyDetails, setCompanyDetails] = useState({
    name: '',
    address: '',
    contact: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompanyDetails({
      ...companyDetails,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving to a database
    console.log('Company Details Submitted:', companyDetails);
    toast({
      title: "Success",
      description: "Company details have been saved.",
    });
    setCompanyDetails({
      name: '',
      address: '',
      contact: '',
      description: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Company Name</Label>
        <Input
          id="name"
          name="name"
          value={companyDetails.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={companyDetails.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="contact">Contact Number</Label>
        <Input
          id="contact"
          name="contact"
          value={companyDetails.contact}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Company Description</Label>
        <Textarea
          id="description"
          name="description"
          value={companyDetails.description}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Save Company Details</Button>
    </form>
  );
};

export default ProfileForm;