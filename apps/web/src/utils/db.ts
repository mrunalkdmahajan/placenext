/**
 * File-based database simulation using localStorage
 */

// Database structure
interface CompanyProfile {
  id: string;
  email: string;
  company: {
    name: string;
    logo: string;
    website: string;
    industry: string;
    founded: string;
    headquarters: string;
    employees: string;
  };
  overview: {
    mission: string;
    about: string;
    values: string;
    services: string;
  };
  culture: {
    workEnvironment: string;
    benefits: string;
    diversity: string;
    workSchedule: string;
  };
  gallery: string[];
}

interface User {
  id: string;
  email: string;
  password: string;
  profileId?: string; // Reference to company profile
}

// Initialize database if it doesn't exist
export const initDB = () => {
  // Check if DB is initialized
  if (!localStorage.getItem('db_initialized')) {
    // Create tables
    localStorage.setItem('db_users', JSON.stringify([]));
    localStorage.setItem('db_company_profiles', JSON.stringify([]));
    
    // Mark as initialized
    localStorage.setItem('db_initialized', 'true');
    console.log('Database initialized');
  }
};

// User operations
export const createUser = (email: string, password: string): User => {
  const users = JSON.parse(localStorage.getItem('db_users') || '[]');
  
  // Check if user exists
  const userExists = users.some((user: User) => user.email === email);
  if (userExists) {
    throw new Error('User already exists');
  }
  
  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    email,
    password // In a real app, this would be hashed
  };
  
  // Save to "database"
  users.push(newUser);
  localStorage.setItem('db_users', JSON.stringify(users));
  
  return newUser;
};

export const authenticateUser = (email: string, password: string): User => {
  const users = JSON.parse(localStorage.getItem('db_users') || '[]');
  
  // Find user
  const user = users.find((u: User) => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Set current user
  localStorage.setItem('currentUser', JSON.stringify(user));
  
  return user;
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('currentUser');
  if (!userStr) return null;
  
  return JSON.parse(userStr);
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};

// Company profile operations
export const createCompanyProfile = (userId: string, profileData: Partial<CompanyProfile>): CompanyProfile => {
  const profiles = JSON.parse(localStorage.getItem('db_company_profiles') || '[]');
  const users = JSON.parse(localStorage.getItem('db_users') || '[]');
  
  // Create new profile
  const newProfile: CompanyProfile = {
    id: Date.now().toString(),
    email: profileData.email || '',
    company: profileData.company || {
      name: '',
      logo: '/placeholder-logo.png',
      website: '',
      industry: '',
      founded: '',
      headquarters: '',
      employees: ''
    },
    overview: profileData.overview || {
      mission: '',
      about: '',
      values: '',
      services: ''
    },
    culture: profileData.culture || {
      workEnvironment: '',
      benefits: '',
      diversity: '',
      workSchedule: ''
    },
    gallery: profileData.gallery || ['/placeholder-image.png']
  };
  
  // Save profile
  profiles.push(newProfile);
  localStorage.setItem('db_company_profiles', JSON.stringify(profiles));
  
  // Update user with profile reference
  const updatedUsers = users.map((user: User) => {
    if (user.id === userId) {
      return { ...user, profileId: newProfile.id };
    }
    return user;
  });
  
  localStorage.setItem('db_users', JSON.stringify(updatedUsers));
  
  // Update current user
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (currentUser.id === userId) {
    currentUser.profileId = newProfile.id;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
  
  return newProfile;
};

export const getCompanyProfile = (profileId: string): CompanyProfile | null => {
  const profiles = JSON.parse(localStorage.getItem('db_company_profiles') || '[]');
  
  // Find profile
  const profile = profiles.find((p: CompanyProfile) => p.id === profileId);
  return profile || null;
};

export const updateCompanyProfile = (profileId: string, profileData: Partial<CompanyProfile>): CompanyProfile => {
  const profiles = JSON.parse(localStorage.getItem('db_company_profiles') || '[]');
  
  // Find and update profile
  const updatedProfiles = profiles.map((profile: CompanyProfile) => {
    if (profile.id === profileId) {
      return {
        ...profile,
        company: { ...profile.company, ...profileData.company },
        overview: { ...profile.overview, ...profileData.overview },
        culture: { ...profile.culture, ...profileData.culture },
        gallery: profileData.gallery || profile.gallery
      };
    }
    return profile;
  });
  
  // Save to "database"
  localStorage.setItem('db_company_profiles', JSON.stringify(updatedProfiles));
  
  // Return updated profile
  return updatedProfiles.find((p: CompanyProfile) => p.id === profileId);
};

export const getCurrentUserProfile = (): CompanyProfile | null => {
  const currentUser = getCurrentUser();
  if (!currentUser || !currentUser.profileId) return null;
  
  return getCompanyProfile(currentUser.profileId);
};