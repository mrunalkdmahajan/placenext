"use client";

import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

import TabsContent from "@/components/ui/TabsContent"; // Ensure TabsContent is imported correctly
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Edit, Save, Upload, Clock, Users, Building, LogOut } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Toast from '../ui/toast';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Textarea } from '../ui/textarea';
interface CompanyProfileFormProps {
  initialData: any;
}

const CompanyProfileForm: React.FC<CompanyProfileFormProps> = ({ initialData }) => {
  // const { toast } = useToast();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    id: initialData.id,
    email: initialData.email,
    password: initialData.password,
    company: initialData.company || {
      name: '',
      logo: '/placeholder-logo.png',
      website: '',
      industry: '',
      founded: '',
      headquarters: '',
      employees: ''
    },
    overview: initialData.overview || {
      mission: '',
      about: '',
      values: '',
      services: ''
    },
    culture: initialData.culture || {
      workEnvironment: '',
      benefits: '',
      diversity: '',
      workSchedule: ''
    },
    gallery: initialData.gallery || ['/placeholder-image.png']
  });
  
  const handleInputChange = (section: string, field: string, value: string) => {
    setProfile({
      ...profile,
      [section]: {
        ...profile[section as keyof typeof profile],
        [field]: value
      }
    });
  };
  
  const handleSave = () => {
    // Update current user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(profile));
    
    // Update user in users array
    const usersStr = localStorage.getItem('users');
    if (usersStr) {
      try {
        const users = JSON.parse(usersStr);
        const updatedUsers = users.map((user: any) => 
          user.id === profile.id ? profile : user
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
    
    setIsEditing(false);
    Toast({
      title: "Profile Updated",
      description: "Your company profile has been updated successfully."
    });
  };
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    Toast({
      title: "Logged Out",
      description: "You have been logged out successfully."
    });
    router.push('/login');
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Company Profile</h1>
        <div className="flex gap-2">
          <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Card */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="h-32 w-32 rounded-full overflow-hidden bg-white p-2 border">
                <img src={profile.company.logo} alt="Company Logo" className="h-full w-full object-contain" />
              </div>
            </div>
            <CardTitle className="text-center">{profile.company.name || "Your Company Name"}</CardTitle>
            <CardDescription className="text-center">
              {profile.company.website ? (
                <a href={profile.company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {profile.company.website}
                </a>
              ) : "Your company website"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {isEditing ? (
                <>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input 
                    id="company-name"
                    value={profile.company.name}
                    onChange={(e) => handleInputChange('company', 'name', e.target.value)}
                  />
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Industry:</span>
                  </div>
                  <div className="text-sm">{profile.company.industry || "Not specified"}</div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Founded:</span>
                  </div>
                  <div className="text-sm">{profile.company.founded || "Not specified"}</div>
                  
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">HQ:</span>
                  </div>
                  <div className="text-sm">{profile.company.headquarters || "Not specified"}</div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Employees:</span>
                  </div>
                  <div className="text-sm">{profile.company.employees || "Not specified"}</div>
                </div>
              )}
            </div>
            
            {isEditing && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company-website">Website</Label>
                  <Input 
                    id="company-website"
                    value={profile.company.website}
                    onChange={(e) => handleInputChange('company', 'website', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-industry">Industry</Label>
                  <Input 
                    id="company-industry"
                    value={profile.company.industry}
                    onChange={(e) => handleInputChange('company', 'industry', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-founded">Founded</Label>
                  <Input 
                    id="company-founded"
                    value={profile.company.founded}
                    onChange={(e) => handleInputChange('company', 'founded', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-headquarters">Headquarters</Label>
                  <Input 
                    id="company-headquarters"
                    value={profile.company.headquarters}
                    onChange={(e) => handleInputChange('company', 'headquarters', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-employees">Employees</Label>
                  <Input 
                    id="company-employees"
                    value={profile.company.employees}
                    onChange={(e) => handleInputChange('company', 'employees', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-logo">Logo URL</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="company-logo"
                      value={profile.company.logo}
                      onChange={(e) => handleInputChange('company', 'logo', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Main Content */}
        <Card className="col-span-1 lg:col-span-2">
          <CardContent className="pt-6">
            <Tabs defaultValue="overview">
              <TabsList className="w-full">
                <TabsTrigger value="overview" className="flex-grow">Overview</TabsTrigger>
                <TabsTrigger value="culture" className="flex-grow">Work Culture</TabsTrigger>
                <TabsTrigger value="gallery" className="flex-grow">Gallery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="pt-6 space-y-6">
                {isEditing ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="mission">Mission</Label>
                      <Textarea 
                        id="mission"
                        value={profile.overview.mission}
                        onChange={(e) => handleInputChange('overview', 'mission', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="about">About</Label>
                      <Textarea 
                        id="about"
                        value={profile.overview.about}
                        onChange={(e) => handleInputChange('overview', 'about', e.target.value)}
                        className="min-h-[150px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="values">Values</Label>
                      <Textarea 
                        id="values"
                        value={profile.overview.values}
                        onChange={(e) => handleInputChange('overview', 'values', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="services">Services</Label>
                      <Textarea 
                        id="services"
                        value={profile.overview.services}
                        onChange={(e) => handleInputChange('overview', 'services', e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Mission</h3>
                      <p className="text-gray-700">{profile.overview.mission || "No mission statement provided."}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">About Us</h3>
                      <p className="text-gray-700">{profile.overview.about || "No company description provided."}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Our Values</h3>
                      <p className="text-gray-700">{profile.overview.values || "No values defined."}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Services</h3>
                      <p className="text-gray-700">{profile.overview.services || "No services listed."}</p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="culture" className="pt-6 space-y-6">
                {isEditing ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="work-environment">Work Environment</Label>
                      <Textarea 
                        id="work-environment"
                        value={profile.culture.workEnvironment}
                        onChange={(e) => handleInputChange('culture', 'workEnvironment', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="benefits">Benefits</Label>
                      <Textarea 
                        id="benefits"
                        value={profile.culture.benefits}
                        onChange={(e) => handleInputChange('culture', 'benefits', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="diversity">Diversity & Inclusion</Label>
                      <Textarea 
                        id="diversity"
                        value={profile.culture.diversity}
                        onChange={(e) => handleInputChange('culture', 'diversity', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="work-schedule">Work Schedule</Label>
                      <Textarea 
                        id="work-schedule"
                        value={profile.culture.workSchedule}
                        onChange={(e) => handleInputChange('culture', 'workSchedule', e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Work Environment</h3>
                      <p className="text-gray-700">{profile.culture.workEnvironment || "No information provided."}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Employee Benefits</h3>
                      <p className="text-gray-700">{profile.culture.benefits || "No benefits information provided."}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Diversity & Inclusion</h3>
                      <p className="text-gray-700">{profile.culture.diversity || "No diversity information provided."}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Work Schedule</h3>
                      <p className="text-gray-700">{profile.culture.workSchedule || "No schedule information provided."}</p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="gallery" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.gallery.map((image: string, index: number) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <img src={image} alt={`Gallery Image ${index + 1}`} className="w-full h-48 object-cover" />
                    </div>
                  ))}
                  {isEditing && (
                    <div className="border rounded-lg border-dashed flex items-center justify-center h-48 bg-gray-50">
                      <Button variant="ghost" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Add Image URL
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyProfileForm;