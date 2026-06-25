export enum TabType {
  DASHBOARD = 'DASHBOARD',
  MODULES = 'MODULES',
  BLOGS = 'BLOGS',
  EVENTS = 'EVENTS',
  DOUBTS = 'DOUBTS',
  MEMBERS = 'MEMBERS',
}

export type CourseCategory = 'Web Development' | 'Data Structures & Algorithms' | 'AI & Machine Learning' | 'UI/UX Design' | 'Mobile Dev';
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type PublishStatus = 'Published' | 'Draft' | 'Archived';

export interface LearningModule {
  id: string;
  title: string;
  category: CourseCategory;
  level: CourseLevel;
  status: PublishStatus;
  description: string;
  content: string; // Markdown/Details
  author: string;
  duration: string; // e.g., "6 Hours", "4 Weeks"
  resources: string; // Comma separated list of links or text
  lastUpdated: string;
  enrolledStudentsCount: number;
}

export type BlogCategory = 'Opportunities' | 'Newsletter' | 'Technical' | 'Community Story' | 'Alert';

export interface Announcement {
  id: string;
  title: string;
  category: BlogCategory;
  content: string;
  author: string;
  date: string;
  status: PublishStatus;
  imageUrl?: string;
  mediaUrl?: string;
  mediaType?: 'video' | 'image' | 'none';
  history?: Array<{
    _id?: string;
    title: string;
    content: string;
    mediaUrl?: string;
    updatedAt: string;
    updatedBy: string;
  }>;
}

export type EventType = 'Workshop' | 'Hackathon' | 'Webinar' | 'Study Jam' | 'Social Meet';

export interface CommunityEvent {
  id: string;
  title: string;
  type: EventType;
  date: string;
  time: string;
  venue: string; // Online Meet Link or Offline Room
  description: string;
  speaker: string;
  registrationCount: number;
  maxSeats: number;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export type DoubtCategory = 'Coding Doubt' | 'Career Guidance' | 'Project Support' | 'Inquiry';
export type DoubtStatus = 'Pending' | 'In Progress' | 'Resolved';

export interface StudentQuery {
  id: string;
  studentName: string;
  studentEmail: string;
  queryTitle: string;
  queryDetails: string;
  category: DoubtCategory;
  status: DoubtStatus;
  assignedMentor: string;
  createdDate: string;
  resolutionNotes?: string;
}

export type MemberRole = 'Lead' | 'Mentor' | 'Core Contributor' | 'Active Student';

export interface Member {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  domain: string; // e.g., "Fullstack Dev", "ML Engineer", "Android"
  joinedDate: string;
  status: 'Active' | 'Inactive';
  avatarSeed: string; // for Dicebear avatars
}
