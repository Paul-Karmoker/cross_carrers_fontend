import { NavItem } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  RiCloseLine,
  RiArrowDownSLine,
  RiShieldStarLine,
} from "react-icons/ri";

interface Props {
  items?: NavItem[];
  user?: any;
  onClose: () => void;
}

export default function MobileMenu({ items = [], user, onClose }: Props) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100"
          >
            <RiCloseLine size={26} />
          </button>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto px-2 py-4">
          {items.map((item, index) =>
            item.type === "link" ? (
              <Link
                key={item.path ?? index}
                to={item.path!}
                onClick={onClose}
                className="block px-5 py-4 text-base font-medium rounded-xl hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ) : (
              <div key={item.key ?? index} className="mb-2">
                <button
                  type="button"
                  onClick={() =>
                    setOpenKey(
                      openKey === (item.key ?? String(index))
                        ? null
                        : (item.key ?? String(index)),
                    )
                  }
                  className="w-full flex items-center justify-between px-5 py-4 text-base font-medium rounded-xl hover:bg-slate-100"
                >
                  {item.label}
                  <RiArrowDownSLine
                    size={22}
                    className={`transition-transform ${
                      openKey === (item.key ?? String(index))
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {openKey === (item.key ?? String(index)) &&
                  item.items &&
                  item.items.length > 0 && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          onClick={onClose}
                          className="flex items-center justify-between px-4 py-3 text-sm rounded-lg hover:bg-slate-100"
                        >
                          {sub.label}
                          {sub.restricted && !user && (
                            <RiShieldStarLine className="text-amber-500" />
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            ),
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-5">
          {!user ? (
            <div className="space-y-3">
              <button
                onClick={() => {
                  onClose();
                  navigate("/signin");
                }}
                className="w-full py-3 rounded-xl border font-semibold"
              >
                Log in
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate("/signup");
                }}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold"
              >
                Sign up for free
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold">
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </div>
                <div>
                  <div className="font-semibold">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-xs text-slate-500">
                    {user.subscriptionType === "premium"
                      ? "Premium Plan"
                      : "Free Trial"}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  navigate("/logout");
                }}
                className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-semibold"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
