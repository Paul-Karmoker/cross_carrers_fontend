export type BillingCycle = "monthly" | "quarterly" | "semiannual" | "yearly";
export type PlanType = "free" | "paid";


export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  referralCode: string;
}


export interface PaymentDetails {
  userId: string;
  subscriptionPlan: BillingCycle;
  amount: number;
}