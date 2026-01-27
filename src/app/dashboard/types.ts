export type TabKey = "dashboard" | "profile" | "withdraw" | "history";
export type PaymentProvider = "bkash" | "nagad" | "rocket";
export type WithdrawStatus = "pending" | "completed" | "rejected";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address?: string;
  photo?: string;
  points: number;
  subscriptionType: string;
  subscriptionPlan: string;
}

export interface PasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ShowPassword {
  old: boolean;
  new: boolean;
  confirm: boolean;
}

export interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  photo: string;
}

export interface WithdrawForm {
  points: string;
  paymentProvider: PaymentProvider;
  paymentNumber: string;
}

export interface Withdrawal {
  _id: string;
  points: number;
  paymentProvider: PaymentProvider;
  paymentNumber: string;
  status: WithdrawStatus;
  createdAt: string;
}

export interface WithdrawHistoryResponse {
  withdrawals: Withdrawal[];
}
