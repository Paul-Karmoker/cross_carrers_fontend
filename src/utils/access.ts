export const hasFullAccess = (user: any) => {
  if (!user) return false;

  const now = new Date();

  // ⭐ PREMIUM ACTIVE → FULL ACCESS
  if (
    user.subscriptionType === "premium" &&
    user.subscriptionStatus === "active" &&
    user.subscriptionExpiresAt &&
    new Date(user.subscriptionExpiresAt) > now
  ) {
    return true;
  }

  // 🆓 FREE TRIAL (first 3 days) → FULL ACCESS
  if (
    user.subscriptionType === "freeTrial" &&
    user.freeTrialExpiresAt &&
    new Date(user.freeTrialExpiresAt) > now
  ) {
    return true;
  }

  return false;
};
