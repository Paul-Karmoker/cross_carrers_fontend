export interface Advertisement {
  id: number;
  image: string;
  alt: string;
}


export interface FooterLink {
  label: string;
  path: string;
}

export interface SocialLink {
  icon: React.ReactNode;
  url: string;
  label: string;
}

export interface PaymentMethod {
  name: string;
  image: string;
  hidden?: boolean;
}

type PortalType = "image" | "text";

export interface JobPortal {
  id: number;
  name: string;
  url: string;
  logo: string;
  type: PortalType;
  style?: string; // optional because it is conditionally used
}


export interface SubNavItem {
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
  items?: SubNavItem[];
  restricted?: boolean;
  hidden?: boolean;
}
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;

  subscriptionType: string;
  subscriptionStatus: string;
  freeTrialExpiresAt: string | null;
  subscriptionExpiresAt: string | null;
}



export interface PortalSite {
  id: number;
  name: string;
  url: string;
  logo: string;
  category: string;
}

 export interface CardProps {
  site: PortalSite;
  buttonText?: string;
}