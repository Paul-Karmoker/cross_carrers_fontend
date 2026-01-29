import { useState } from "react";
import { User } from "@/types";
import UserDropdown from "./UserDropdown";

interface Props {
  user: User;
  isPremium: boolean;
  remainingTime: string;
}

export default function AvatarWithPlan({
  user,
  isPremium,
  remainingTime,
}: Props) {
  const [open, setOpen] = useState(false);

  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="relative z-[60]">
      {/* Avatar */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="relative w-10 h-10 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center"
      >
        {initials}

        {/* Plan badge */}
        <span
          className={`absolute -bottom-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
            isPremium
              ? "bg-amber-400 text-black"
              : "bg-slate-200 text-slate-800"
          }`}
        >
          {isPremium ? "Premium" : "Free"}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <UserDropdown
          user={user}
          isPremium={isPremium}
          remainingTime={remainingTime}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
