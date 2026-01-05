export interface NavSubItem {
  label: string;
  path: string;
  restricted?: boolean;
  hidden?: boolean;
}

export interface NavItem {
  label: string;
  path?: string;
  key?: string;
  type: "link" | "dropdown";
  restricted?: boolean;
  hidden?: boolean;
  items?: NavSubItem[];
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
}

export interface GetProfileResponse {
  user: UserProfile;
}