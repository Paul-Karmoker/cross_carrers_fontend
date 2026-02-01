// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useGetProfileQuery } from "@/redux/features/authApi";
import { JSX } from "react/jsx-runtime";

type Props = {
  children: JSX.Element;
  requireFullAccess?: boolean;
};

export default function ProtectedRoute({
  children,
  requireFullAccess = false,
}: Props) {
  const token = localStorage.getItem("token");
  const { data, isLoading } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const user = data?.user;

  const now = new Date();

  const hasFullAccess =
    (user?.subscriptionType === "premium" &&
      user?.subscriptionStatus === "active" &&
      user?.subscriptionExpiresAt &&
      new Date(user.subscriptionExpiresAt) > now) ||
    (user?.subscriptionType === "freeTrial" &&
      user?.freeTrialExpiresAt &&
      new Date(user.freeTrialExpiresAt) > now);

  if (requireFullAccess && !hasFullAccess) {
    return <Navigate to="/seepricing" replace />;
  }

  return children;
}
