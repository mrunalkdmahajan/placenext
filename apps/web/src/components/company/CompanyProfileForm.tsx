"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, Upload, Clock, Users, Building, LogOut } from 'lucide-react';
import { toast } from "react-toastify";
import { 
  updateCompanyProfile, 
  getCurrentUser, 
  createCompanyProfile, 
  logoutUser,
  getCurrentUserProfile
} from '@/utils/db';

interface CompanyProfileFormProps {
  initialData?: any;
  isNewCompany?: boolean;
}

const CompanyProfileForm: React.FC<CompanyProfileFormProps> = ({ 
  initialData = {}, 
  isNewCompany = false 
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(isNewCompany);
  const [activeTab, setActiveTab] = useState("overview");
  
  const [profile, setProfile] = useState({
    company: {
      name: initialData.company?.name || '',
      logo: initialData.company?.logo || '/placeholder-logo.png',
      website: initialData.company?.website || '',
      industry: initialData.company?.industry || '',
      founded: initialData.company?.founded || '',
      headquarters: initialData.company?.headquarters || '',
      employees: initialData.company?.employees || ''
    },
    overview: {
      mission: initialData.overview?.mission || '',
      about: initialData.overview?.about || '',
      values: initialData.overview?.values || '',
      services: initialData.overview?.services || ''
    },
    culture: {
      workEnvironment: initialData.culture?.workEnvironment || '',
      benefits: initialData.culture?.benefits || '',
      diversity: initialData.culture?.diversity || '',
      workSchedule: initialData.culture?.workSchedule || ''
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
  
  const handleSave = async () => {
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        toast.error("You must be logged in to save changes");
        router.push('/login');
        return;
      }
      
      // Check if user has an existing profile
      const userProfile = getCurrentUserProfile();
      
      if (userProfile && !isNewCompany) {
        // Update existing profile
        updateCompanyProfile(userProfile.id, {
          company: profile.company,
          overview: profile.overview,
          culture: profile.culture,
          gallery: profile.gallery
        });
        toast.success("Company profile updated successfully!");
      } else {
        // Create new profile
        createCompanyProfile(currentUser.id, {
          email: currentUser.email,
          company: profile.company,
          overview: profile.overview,
          culture: profile.culture,
          gallery: profile.gallery
        });
        toast.success("Company profile created successfully!");
        
        // Redirect to dashboard if this is a new company
        if (isNewCompany) {
          router.push('/company/dashboard');
        }
      }
      
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to save profile");
      console.error(error);
    }
  };
  
  const handleLogout = () => {
    logoutUser();
    router.push('/login');
    toast.info("Logged out successfully");
  };
  
  return (
    <div className="space-y-6 animate-fade-in p-4 md:p-6">
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
            <CardTitle className="text-center">{profile.company.name || 'Your Company'}</CardTitle>
            {profile.company.website && (
              <CardDescription className="text-center">
                <a href={profile.company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {profile.company.website}
                </a>
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input 
                    id="company-name"
                    value={profile.company.name}
                    onChange={(e) => handleInputChange('company', 'name', e.target.value)}
                  />
                </div>
                
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
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {profile.company.industry && (
                  <>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Industry:</span>
                    </div>
                    <div className="text-sm">{profile.company.industry}</div>
                  </>
                )}
                
                {profile.company.founded && (
                  <>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Founded:</span>
                    </div>
                    <div className="text-sm">{profile.company.founded}</div>
                  </>
                )}
                
                {profile.company.headquarters && (
                  <>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">HQ:</span>
                    </div>
                    <div className="text-sm">{profile.company.headquarters}</div>
                  </>
                )}
                
                {profile.company.employees && (
                  <>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Employees:</span>
                    </div>
                    <div className="text-sm">{profile.company.employees}</div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Main Content */}
        <Card className="col-span-1 lg:col-span-2">
          <CardContent className="pt-6">
            {/* Custom tabs implementation */}
            <div className="border-b mb-6">
              <div className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`py-2 px-4 text-center font-medium text-sm ${
                    activeTab === "overview"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("culture")}
                  className={`py-2 px-4 text-center font-medium text-sm ${
                    activeTab === "culture"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Work Culture
                </button>
                <button
                  onClick={() => setActiveTab("gallery")}
                  className={`py-2 px-4 text-center font-medium text-sm ${
                    activeTab === "gallery"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Gallery
                </button>
              </div>
            </div>
              
            {/* Overview Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-6">
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
                    {profile.overview.mission && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Mission</h3>
                        <p className="text-gray-700">{profile.overview.mission}</p>
                      </div>
                    )}
                    
                    {profile.overview.about && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">About Us</h3>
                        <p className="text-gray-700">{profile.overview.about}</p>
                      </div>
                    )}
                    
                    {profile.overview.values && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Our Values</h3>
                        <p className="text-gray-700">{profile.overview.values}</p>
                      </div>
                    )}
                    
                    {profile.overview.services && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Services</h3>
                        <p className="text-gray-700">{profile.overview.services}</p>
                      </div>
                    )}
                    
                    {!profile.overview.mission && !profile.overview.about && 
                     !profile.overview.values && !profile.overview.services && (
                      <p className="text-gray-500 italic">No overview information added yet.</p>
                    )}
                  </div>
                )}
              </div>
            )}
              
            {/* Culture Tab Content */}
            {activeTab === "culture" && (
              <div className="space-y-6">
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
                    {profile.culture.workEnvironment && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Work Environment</h3>
                        <p className="text-gray-700">{profile.culture.workEnvironment}</p>
                      </div>
                    )}
                    
                    {profile.culture.benefits && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Employee Benefits</h3>
                        <p className="text-gray-700">{profile.culture.benefits}</p>
                      </div>
                    )}
                    
                    {profile.culture.diversity && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Diversity & Inclusion</h3>
                        <p className="text-gray-700">{profile.culture.diversity}</p>
                      </div>
                    )}
                    
                    {profile.culture.workSchedule && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Work Schedule</h3>
                        <p className="text-gray-700">{profile.culture.workSchedule}</p>
                      </div>
                    )}
                    
                    {!profile.culture.workEnvironment && !profile.culture.benefits && 
                     !profile.culture.diversity && !profile.culture.workSchedule && (
                      <p className="text-gray-500 italic">No work culture information added yet.</p>
                    )}
                  </div>
                )}
              </div>
            )}
              
            {/* Gallery Tab Content */}
            {activeTab === "gallery" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.gallery.map((image:any, index:any) => (
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyProfileForm;