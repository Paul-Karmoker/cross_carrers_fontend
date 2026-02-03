// src/types/index.ts
import React from "react";

/* ───────── Common ───────── */
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

/* ───────── Job Portal ───────── */
type PortalType = "image" | "text";

export interface JobPortal {
  id: number;
  name: string;
  url: string;
  logo: string;
  type: PortalType;
  style?: string;
}

/* ───────── NAV TYPES ───────── */
export interface SubNavItem {
  label: string;
  path: string;
  restricted?: boolean;
  hidden?: boolean;
}

export type NavItem =
  | {
      type: "link";
      label: string;
      path: string;
      restricted?: boolean;
      hidden?: boolean;
    }
  | {
      type: "dropdown";
      label: string;
      key: string;
      items: SubNavItem[];
      hidden?: boolean;
    };

/* ───────── USER ───────── */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";

  subscriptionType: "freeTrial" | "premium" | "none";
  subscriptionStatus: "pending" | "active" | "expired";

  freeTrialExpiresAt?: string | null;
  subscriptionExpiresAt?: string | null;
}

/* ───────── Portal Card ───────── */
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
