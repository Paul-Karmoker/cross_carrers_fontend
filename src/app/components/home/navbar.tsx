import { useGetProfileQuery } from "@/redux/features/authApi";
import { NAV_CONFIG } from "./Navbar/nav.config";
import DesktopNav from "./Navbar/DesktopNav";
import MobileMenu from "./Navbar/MobileMenu";
import AvatarWithPlan from "./Navbar/AvatarWithPlan";
import GetPlusButton from "./Navbar/GetPlusButton";
import HelpMenu from "./Navbar/HelpMenu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";

export default function Navbar() {
  const { data } = useGetProfileQuery();
  const user = data?.user as any;

  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const now = new Date();

  // ✅ Access check (Premium OR Active Trial)
  const hasAccess =
    (user?.subscriptionType === "premium" &&
      user?.subscriptionStatus === "active" &&
      user?.subscriptionExpiresAt &&
      new Date(user.subscriptionExpiresAt) > now) ||
    (user?.subscriptionType === "freeTrial" &&
      user?.freeTrialExpiresAt &&
      new Date(user.freeTrialExpiresAt) > now);

  // ✅ FINAL restriction handler
  const handleRestrictedClick = (
    e: React.MouseEvent,
    restricted?: boolean
  ) => {
    // 🔓 Public item → allow
    if (!restricted) return;

    // 🔐 Restricted + not logged in
    if (!user) {
      e.preventDefault();
      navigate("/signin");
      return;
    }

    // 🔒 Logged in but no access
    if (!hasAccess) {
      e.preventDefault();
      navigate("/seepricing");
    }
  };

  return (
    <>
      {/* ───────── NAVBAR ───────── */}
      <nav className="fixed top-0 inset-x-0 bg-white z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-800"
              aria-label="Open menu"
            >
              <RiMenu3Line size={26} />
            </button>

            <Link to="/">
              <img
                src="https://i.ibb.co/Y75Y5NSb/banner.gif"
                alt="Cross Careers"
                className="h-9 sm:h-10 object-contain"
              />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <DesktopNav
            items={NAV_CONFIG}
            user={user}
            onRestrictedClick={handleRestrictedClick}
          />

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {!user && (
              <>
                <button
                  onClick={() => navigate("/signin")}
                  className="font-medium hidden sm:block"
                >
                  Log in
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-1.5 border rounded-full font-medium hidden sm:block"
                >
                  Sign up for free
                </button>

                <HelpMenu />
              </>
            )}

            {user && (
              <>
                {!hasAccess && <GetPlusButton />}

                <AvatarWithPlan
                  user={user}
                  isPremium={hasAccess}
                  remainingTime={getRemainingTime(user)}
                />
              </>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <MobileMenu
          items={NAV_CONFIG}
          user={user}
          onRestrictedClick={handleRestrictedClick}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

/* ───────── Remaining time helper ───────── */
function getRemainingTime(user: any): string {
  const target =
    user?.subscriptionType === "premium"
      ? user?.subscriptionExpiresAt
      : user?.freeTrialExpiresAt;

  if (!target) return "—";

  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return "Expired";

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);

  return `${d}d ${h}h ${m}m`;
}
