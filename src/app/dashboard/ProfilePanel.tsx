import { useState, FormEvent, ChangeEvent, JSX } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  FiSettings,
  FiLock,
  FiEye,
  FiEyeOff,
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
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (
      !profileForm.firstName ||
      !profileForm.lastName ||
      !profileForm.email ||
      !profileForm.mobileNumber
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (profileForm.mobileNumber.length !== 11) {
      toast.error("Mobile number must be 11 digits");
      return;
    }

    try {
      
      await updateProfile({
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        email: profileForm.email,
      }).unwrap();

      toast.success("Profile updated successfully");
    } catch (err: unknown) {
      toast.error(
        (err as { data?: { message?: string } })?.data?.message ||
          "Failed to update profile"
      );
    }
  };

  const handleChangePassword = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      
      await changePassword({
        currentPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      }).unwrap();

      toast.success("Password updated successfully");
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: unknown) {
      toast.error(
        (err as { data?: { message?: string } })?.data?.message ||
          "Failed to change password"
      );
    }
  };

  

  return (
    <div className="space-y-6">
     
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleUpdateProfile}
        className="bg-white p-8 rounded-xl shadow-lg space-y-6"
      >
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <FiSettings className="mr-2" /> Update Profile
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={profileForm.firstName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setProfileForm({ ...profileForm, firstName: e.target.value })
            }
            className="w-full p-3 border rounded-lg"
            placeholder="First Name"
          />

          <input
            type="text"
            value={profileForm.lastName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setProfileForm({ ...profileForm, lastName: e.target.value })
            }
            className="w-full p-3 border rounded-lg"
            placeholder="Last Name"
          />
        </div>

        <input
          type="email"
          value={profileForm.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setProfileForm({ ...profileForm, email: e.target.value })
          }
          className="w-full p-3 border rounded-lg"
          placeholder="Email"
        />

        <input
          type="tel"
          value={profileForm.mobileNumber}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setProfileForm({
              ...profileForm,
              mobileNumber: e.target.value.replace(/\D/g, "").slice(0, 11),
            })
          }
          className="w-full p-3 border rounded-lg"
          placeholder="Mobile Number"
        />

        <textarea
          value={profileForm.address}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setProfileForm({ ...profileForm, address: e.target.value })
          }
          rows={4}
          className="w-full p-3 border rounded-lg"
          placeholder="Address"
        />

        <motion.button
          type="submit"
          disabled={isUpdatingProfile}
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg"
        >
          {isUpdatingProfile ? "Updating..." : "Update Profile"}
        </motion.button>
      </motion.form>

      
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleChangePassword}
        className="bg-white p-8 rounded-xl shadow-lg space-y-6"
      >
        <h3 className="text-xl font-semibold flex items-center">
          <FiLock className="mr-2" /> Change Password
        </h3>

        {(["old", "new", "confirm"] as const).map((field) => (
          <div key={field} className="relative">
            <input
              type={showPassword[field] ? "text" : "password"}
              value={passwordForm[`${field}Password` as keyof PasswordForm]}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPasswordForm({
                  ...passwordForm,
                  [`${field}Password`]: e.target.value,
                } as PasswordForm)
              }
              className="w-full p-3 border rounded-lg pr-10"
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  [field]: !showPassword[field],
                })
              }
              className="absolute right-3 top-3"
            >
              {showPassword[field] ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        ))}

        <motion.button
          type="submit"
          disabled={isChangingPassword}
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg"
        >
          {isChangingPassword ? "Changing..." : "Change Password"}
        </motion.button>
      </motion.form>
    </div>
  );
}
