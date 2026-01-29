import { useState } from "react";
import { Link } from "react-router-dom";
import { FiHelpCircle, FiSettings, FiFileText, FiTag } from "react-icons/fi";
import { MdOutlineNewReleases } from "react-icons/md";

export default function HelpMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Question Mark Button */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
        aria-label="Help menu"
      >
        ?
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 rounded-xl bg-[#1f1f1f] text-white shadow-2xl overflow-hidden z-50">
          <ul className="py-2 text-sm">
            <MenuItem to="/seepricing" icon={<FiTag />}>
              See plans and pricing
            </MenuItem>

            <MenuItem to="/seitting" icon={<FiSettings />}>
              Settings
            </MenuItem>

            <Divider />

            <MenuItem to="/help" icon={<FiHelpCircle />}>
              Help center
            </MenuItem>

            <MenuItem to="/release" icon={<MdOutlineNewReleases />}>
              Release notes
                      </MenuItem>
            <MenuItem to="/terms" icon={<FiFileText />}>
              Terms of service
            </MenuItem>
          </ul>
        </div>
      )}
    </div>
  );
}

/* ───────── helpers ───────── */

function MenuItem({
  to,
  icon,
  children,
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center gap-3 px-5 py-3 hover:bg-white/10 transition"
      >
        <span className="text-lg">{icon}</span>
        <span>{children}</span>
      </Link>
    </li>
  );
}

function Divider() {
  return <li className="my-2 h-px bg-white/10" />;
}
