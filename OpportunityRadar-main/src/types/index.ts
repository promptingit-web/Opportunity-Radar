export type OpportunityCategory = 
  | 'internship' 
  | 'hackathon' 
  | 'scholarship' 
  | 'research' 
  | 'fellowship' 
  | 'competition' 
  | 'workshop' 
  | 'startup';

export type WorkMode = 'remote' | 'on-site' | 'hybrid';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'all';

export type CompensationType = 'paid' | 'unpaid' | 'prize' | 'funded';

export type AcademicYear = '1st' | '2nd' | '3rd' | '4th' | 'graduate' | 'all';

export type VerificationStatus = 'verified_official' | 'community_curated' | 'demo_sample';

export interface Opportunity {
  id: string;
  title: string;
  organisation: string;
  organisationLogo?: string;
  organisationWebsite?: string;
  category: OpportunityCategory;
  description: string;
  fullDescription: string;
  location: string;
  workMode: WorkMode;
  experienceLevel: ExperienceLevel;
  compensationType: CompensationType;
  
  // Specific metadata fields
  duration?: string; // e.g., "3 Months", "Summer 2027", "6 Weeks"
  stipend?: string; // e.g., "₹45,000 / month", "$3,500 / month"
  prizePool?: string; // e.g., "₹10,00,000", "$25,000"
  awardAmount?: string; // e.g., "$10,000 Tuition Grant"
  teamSize?: string; // e.g., "2 - 4 Members", "Individual or Team"
  eventDate?: string; // e.g., "2026-11-20" or "Nov 20-22, 2026"
  researchDomain?: string; // e.g., "Generative AI Systems", "Distributed Computing"
  
  // Eligibility & Matching
  eligibility: string;
  eligibleYears: AcademicYear[];
  eligibleDegrees?: string[];
  requiredSkills: string[];
  preferredSkills?: string[];
  
  // Timeline
  deadline: string; // ISO string or YYYY-MM-DD
  startDate?: string;
  dateAdded: string;
  
  // Editorial & Verification
  editorsPick?: boolean;
  featured?: boolean;
  editorialNote?: string;
  verificationStatus: VerificationStatus;
  sourceName: string;
  sourceUrl: string;
  applicationUrl: string;
  
  // Content details
  responsibilities?: string[];
  benefits?: string[];
  applicationProcess?: string[];
  selectionCriteria?: string[];
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  university: string;
  degree: string;
  branch: string;
  currentYear: AcademicYear;
  graduationYear: string;
  gpa?: string;
  bio?: string;
  skills: string[];
  interests: string[];
  preferredCategories: OpportunityCategory[];
  preferredLocations: string[];
  preferredWorkModes: WorkMode[];
}

export type ApplicationStatus = 
  | 'interested' 
  | 'applied' 
  | 'assessment' 
  | 'interview' 
  | 'shortlisted' 
  | 'selected' 
  | 'rejected';

export interface ApplicationItem {
  id: string;
  opportunityId: string;
  title: string;
  organisation: string;
  category: OpportunityCategory;
  status: ApplicationStatus;
  appliedDate: string;
  deadline: string;
  notes?: string;
  interviewDate?: string;
  nextStep?: string;
  workMode?: WorkMode;
  location?: string;
  stipendOrPrize?: string;
  sourceUrl?: string;
  applicationUrl?: string;
}

export interface InAppNotification {
  id: string;
  title: string;
  message: string;
  type: 'deadline' | 'match' | 'status' | 'system';
  read: boolean;
  timestamp: string;
  link?: string;
  opportunityId?: string;
}

export interface FilterState {
  search: string;
  category: OpportunityCategory | 'all';
  workModes: WorkMode[];
  experienceLevels: ExperienceLevel[];
  compensationTypes: CompensationType[];
  eligibleYears: AcademicYear[];
  skills: string[];
  deadlineRange: 'all' | 'today' | 'week' | 'month' | 'flexible';
  sortBy: 'recommended' | 'deadline-soon' | 'recently-added' | 'compensation';
  verifiedOnly: boolean;
}

export type EligibilityStatus = 'likely_eligible' | 'check_requirements' | 'not_eligible';

export interface EligibilityResult {
  status: EligibilityStatus;
  label: string;
  reasons: string[];
}

export interface SkillGapResult {
  matchedSkills: string[];
  missingSkills: string[];
  matchPercentage: number;
  suggestedLearning: string[];
}

