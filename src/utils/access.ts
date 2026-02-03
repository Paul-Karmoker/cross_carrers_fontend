// src/utils/access.ts
export const hasFullAccess = (user: any) => {
  if (!user) return false;

  const now = new Date();

  return (
    user.subscriptionType === "premium" &&
    user.subscriptionStatus === "active" &&
    user.subscriptionExpiresAt &&
    new Date(user.subscriptionExpiresAt) > now
  );
};
