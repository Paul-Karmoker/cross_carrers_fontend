/* eslint-disable react/prop-types */
import { useState } from 'react';
import InputField from "../../Components/InputField";

function ResumePersonalInformation({
  resume,
  handlePersonalChange,
  handleAddressChange,
  errors,
  firstErrorRef,
  dispatch,
  updatePersonalInfo,
  setErrors
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload a valid image file (JPEG, PNG, or GIF)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setUploadError('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=98c15ce37344bd04f421234ddd585978', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        dispatch(updatePersonalInfo({ profilePicture: data.data.url }));
        setErrors((prev) => ({ ...prev, profilePicture: '' }));
      } else {
        throw new Error(data.error.message || 'Failed to upload image');
      }
    } catch (err) {
      setUploadError(`Error uploading image: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="First Name"
          name="firstName"
          value={resume.personalInfo.firstName}
          onChange={handlePersonalChange}
          required
          error={errors.firstName}
          ref={errors.firstName ? firstErrorRef : null}
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={resume.personalInfo.lastName}
          onChange={handlePersonalChange}
          required
          error={errors.lastName}
        />
        <InputField
          label="Professional Title"
          name="professionalTitle"
          value={resume.personalInfo.professionalTitle}
          onChange={handlePersonalChange}
        />
        <InputField
          label="Phone Number"
          name="phoneNumber"
          value={resume.personalInfo.phoneNumber}
          onChange={handlePersonalChange}
          type="tel"
          error={errors.phoneNumber}
        />
        <InputField
          label="Email Address"
          name="emailAddress"
          value={resume.personalInfo.emailAddress}
          onChange={handlePersonalChange}
          type="email"
          required
          error={errors.emailAddress}
        />
        <InputField
          label="Skype"
          name="skype"
          value={resume.personalInfo.skype}
          onChange={handlePersonalChange}
        />
        <InputField
          label="LinkedIn"
          name="linkedIn"
          value={resume.personalInfo.linkedIn}
          onChange={handlePersonalChange}
        />
        <InputField
          label="Portfolio"
          name="portfolio"
          value={resume.personalInfo.portfolio}
          onChange={handlePersonalChange}
        />
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100
              disabled:opacity-50"
          />
          {isUploading && (
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Uploading...
            </div>
          )}
          {uploadError && (
            <div className="text-red-500 text-sm mt-1">{uploadError}</div>
          )}
          {resume.personalInfo.profilePicture && (
            <div className="mt-2">
              <img
                src={resume.personalInfo.profilePicture}
                alt="Profile Preview"
                className="w-24 h-24 object-cover rounded-full border border-gray-300"
              />
            </div>
          )}
        </div>
        <InputField
          label="Father's Name"
          name="fatherName"
          value={resume.personalInfo.fatherName}
          onChange={handlePersonalChange}
        />
        <InputField
          label="Mother's Name"
          name="motherName"
          value={resume.personalInfo.motherName}
          onChange={handlePersonalChange}
        />
        <InputField
          label="Spouse's Name"
          name="spouseName"
          value={resume.personalInfo.spouseName}
          onChange={handlePersonalChange}
        />
        <InputField
          label="NID"
          name="nid"
          value={resume.personalInfo.nid}
          onChange={handlePersonalChange}
        />
        <InputField
          label="Passport"
          name="passport"
          value={resume.personalInfo.passport}
          onChange={handlePersonalChange}
        />
      </div>
      <h4 className="text-md font-medium mt-4 mb-2 text-gray-700">Address</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Street"
          name="street"
          value={resume.personalInfo.address.street}
          onChange={(e) => handleAddressChange(e, "address")}
        />
        <InputField
          label="City"
          name="city"
          value={resume.personalInfo.address.city}
          onChange={(e) => handleAddressChange(e, "address")}
        />
        <InputField
          label="Postal"
          name="postal"
          value={resume.personalInfo.address.postal}
          onChange={(e) => handleAddressChange(e, "address")}
        />
        <InputField
          label="Country"
          name="country"
          value={resume.personalInfo.address.country}
          onChange={(e) => handleAddressChange(e, "address")}
        />
      </div>
      <h4 className="text-md font-medium mt-4 mb-2 text-gray-700">
        Permanent Address
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Street"
          name="street"
          value={resume.personalInfo.permanentAddress.street}
          onChange={(e) => handleAddressChange(e, "permanentAddress")}
        />
        <InputField
          label="City"
          name="city"
          value={resume.personalInfo.permanentAddress.city}
          onChange={(e) => handleAddressChange(e, "permanentAddress")}
        />
        <InputField
          label="Postal"
          name="postal"
          value={resume.personalInfo.permanentAddress.postal}
          onChange={(e) => handleAddressChange(e, "permanentAddress")}
        />
        <InputField
          label="Country"
          name="country"
          value={resume.personalInfo.permanentAddress.country}
          onChange={(e) => handleAddressChange(e, "permanentAddress")}
        />
      </div>
    </section>
  );
}

export default ResumePersonalInformation;