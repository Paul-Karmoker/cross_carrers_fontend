import { useState, FormEvent, ChangeEvent, JSX } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  FiSettings,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
} from "react-icons/fi";
import {
  useChangePasswordMutation,
  useUpdateProfileMutation,
} from "../../redux/features/authApi";
import { User, ProfileForm, PasswordForm, ShowPassword } from "./types";

interface ProfilePanelProps {
  user: User;
}

export function ProfilePanel({ user }: ProfilePanelProps): JSX.Element {
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();

  const [profileForm, setProfileForm] = useState<ProfileForm>({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    mobileNumber: user.mobileNumber || "",
    address: user.address || "",
    photo: user.photo || "",
  });

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState<ShowPassword>({
    old: false,
    new: false,
    confirm: false,
  });

  const handleUpdateProfile = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!profileForm.firstName || !profileForm.lastName || !profileForm.email) {
      toast.error("Required fields missing");
      return;
    }
    try {
      await updateProfile({
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        email: profileForm.email,
      }).unwrap();
      toast.success("Profile synchronized successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  const handleChangePassword = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Password mismatch");
      return;
    }
    try {
      await changePassword({
        currentPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      }).unwrap();
      toast.success("Security credentials updated");
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Security update failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">


      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
            <FiUser className="text-indigo-600" /> General Information
          </h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Update your personal details and contact information.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleUpdateProfile}
          className="md:col-span-2 bg-white border-1 border-slate-200 p-8 space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                First Name
              </label>
              <input
                type="text"
                value={profileForm.firstName}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, firstName: e.target.value })
                }
                className="w-full p-2.5 border border-slate-200 focus:border-indigo-600 outline-none transition-all font-medium text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                Last Name
              </label>
              <input
                type="text"
                value={profileForm.lastName}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, lastName: e.target.value })
                }
                className="w-full p-2.5 border border-slate-200 focus:border-indigo-600 outline-none transition-all font-medium text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
              <FiMail size={10} /> Email Address
            </label>
            <input
              type="email"
              value={profileForm.email}
              className="w-full p-2.5 border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed text-sm"
              disabled
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
                <FiPhone size={10} /> Contact Number
              </label>
              <input
                type="tel"
                value={profileForm.mobileNumber}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    mobileNumber: e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 11),
                  })
                }
                className="w-full p-2.5 border border-slate-200 focus:border-indigo-600 outline-none text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
                <FiMapPin size={10} /> Location
              </label>
              <input
                type="text"
                value={profileForm.address}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, address: e.target.value })
                }
                className="w-full p-2.5 border border-slate-200 focus:border-indigo-600 outline-none text-sm"
                placeholder="City, Country"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="bg-slate-900 text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {isUpdatingProfile ? "Processing..." : "Save Changes"}
            </button>
          </div>
        </motion.form>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-100">
        <div className="md:col-span-1">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
            <FiShield className="text-red-500" /> Security Credentials
          </h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Manage your authentication security.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleChangePassword}
          className="md:col-span-2 bg-white border-1 border-slate-200 p-8 space-y-6"
        >
          {(["old", "new", "confirm"] as const).map((field) => (
            <div key={field} className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                {field === "old"
                  ? "Current Password"
                  : field === "new"
                    ? "New Password"
                    : "Confirm New Password"}
              </label>
              <div className="relative">
                <input
                  type={showPassword[field] ? "text" : "password"}
                  value={passwordForm[`${field}Password` as keyof PasswordForm]}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      [`${field}Password`]: e.target.value,
                    } as any)
                  }
                  className="w-full p-2.5 border border-slate-200 focus:border-indigo-600 outline-none text-sm font-mono pr-12"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      [field]: !showPassword[field],
                    })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                >
                  {showPassword[field] ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FiEye size={16} />
                  )}
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isChangingPassword}
              className="bg-white border border-slate-900 text-slate-900 px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all disabled:opacity-50"
            >
              {isChangingPassword ? "Updating Security..." : "Update Password"}
            </button>
          </div>
        </motion.form>
      </section>

    </div>
  );
}
