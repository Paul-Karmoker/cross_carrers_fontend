import { NavItem, User } from "@/types";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowDownSLine, RiShieldStarLine } from "react-icons/ri";
import { useState } from "react";

interface Props {
  items?: NavItem[];
  user?: User;
  onRestrictedClick: (e: React.MouseEvent, path?: string) => void;
}

export default function DesktopNav({
  items = [],
  user,
  onRestrictedClick,
}: Props) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="hidden lg:flex items-center gap-10">
      {items.map((item, index) =>
        item.type === "link" ? (
          <Link
            key={item.path ?? index}
            to={item.path!}
            className="text-sm font-bold uppercase tracking-wider text-slate-700 hover:text-indigo-600"
          >
            {item.label}
          </Link>
        ) : (
          <div
            key={item.key ?? index}
            className="relative"
            onMouseEnter={() => setActive(item.key ?? String(index))}
            onMouseLeave={() => setActive(null)}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-bold uppercase text-slate-700 hover:text-indigo-600"
            >
              {item.label}
              <RiArrowDownSLine />
            </button>

            <AnimatePresence>
              {active === (item.key ?? String(index)) &&
                item.items &&
                item.items.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute left-0 top-full mt-2 bg-white border rounded-xl shadow-xl min-w-[220px] z-50"
                  >
                    {item.items.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path!}
                        onClick={(e) => {
                          onRestrictedClick(e, sub.path);
                          setActive(null); // ✅ close dropdown
                        }}
                        className="flex items-center justify-between px-5 py-3 text-sm text-slate-700 hover:bg-indigo-50"
                      >
                        {sub.label}
                        {sub.restricted && !user && (
                          <RiShieldStarLine className="text-amber-500" />
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
            </AnimatePresence>
          </div>
        ),
      )}
    </div>
  );
}
