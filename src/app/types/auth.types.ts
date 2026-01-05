export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  role: "admin" | "user";
  isVerified: boolean;
  subscriptionType: "freeTrial" | "paid";
  subscriptionStatus: "pending" | "active" | "expired";
  freeTrialExpiresAt?: string;
}

export interface AuthResponse {
  message?: string;
  user: User;
  accessToken: string;
  refreshToken: string;
  token?: string; // backend compatibility
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
