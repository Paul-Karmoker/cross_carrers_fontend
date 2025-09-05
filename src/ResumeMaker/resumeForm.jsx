/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import {
  useCreateResumeMutation,
  useGetResumeQuery,
  useUpdateResumeMutation,
  useDeleteResumeMutation,
  useAddWorkExperienceMutation,
  useDeleteWorkExperienceMutation,
  useAddEducationMutation,
  useDeleteEducationMutation,
  useAddReferenceMutation,
  useDeleteReferenceMutation,
  useGetJobDescriptionSuggestionMutation,
  useGetSkillsSuggestionMutation,
  useGetCareerObjectiveSuggestionMutation,
  useGetCareerSummarySuggestionMutation,
} from "../context/resumeApi";
import {
  resetResume,
  updatePersonalInfo,
  updateCareerObjective,
  updateCareerSummary,
  addWorkExperience,
  updateWorkExperience,
  removeWorkExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addTraining,
  updateTraining,
  removeTraining,
  addCertification,
  updateCertification,
  removeCertification,
  addSkill,
  updateSkill,
  removeSkill,
  addReference,
  updateReference,
  removeReference,
} from "../context/resumeSlice.js";
import InputField from "../Components/InputField";
import SectionItem from "../Components/SectionItem";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../assets/ResumeForm.css";
import ResumePreview from "./resume-form-preview.jsx";

const ResumeForm = ({ resumeId }) => {
  const resume = useSelector((state) => state.resume);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const firstErrorRef = useRef(null);
  const [activeSection, setActiveSection] = useState("personal");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const previewRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload a valid image file (JPEG, PNG, or GIF)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
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

  // API hooks (unchanged from your original code)
  const {
    data: resumeData,
    isLoading: isFetching,
    error: fetchError,
  } = useGetResumeQuery(resumeId, { skip: !resumeId });
  const [createResume, { isLoading: isCreating }] = useCreateResumeMutation();
  const [updateResume, { isLoading: isUpdating }] = useUpdateResumeMutation();
  const [deleteResume, { isLoading: isDeleting }] = useDeleteResumeMutation();
  const [addWorkExperienceApi] = useAddWorkExperienceMutation();
  const [deleteWorkExperienceApi] = useDeleteWorkExperienceMutation();
  const [addEducationApi] = useAddEducationMutation();
  const [deleteEducationApi] = useDeleteEducationMutation();
  const [addReferenceApi] = useAddReferenceMutation();
  const [deleteReferenceApi] = useDeleteReferenceMutation();
  const [getJobDescriptionSuggestion] =
    useGetJobDescriptionSuggestionMutation();
  const [getSkillsSuggestion] = useGetSkillsSuggestionMutation();
  const [getCareerObjectiveSuggestion] =
    useGetCareerObjectiveSuggestionMutation();
  const [getCareerSummarySuggestion] = useGetCareerSummarySuggestionMutation();

  // Sync API data with Redux store (fixed indexing bugs)
  useEffect(() => {
    if (resumeData) {
      dispatch(resetResume());
      dispatch(updatePersonalInfo(resumeData.personalInfo || {}));
      dispatch(updateCareerObjective(resumeData.careerObjective || ""));
      dispatch(updateCareerSummary(resumeData.careerSummary || ""));
      
      // Work Experience
      let workCount = resume.workExperience.length;
      resumeData.workExperience?.forEach((exp, i) => {
        dispatch(addWorkExperience());
        dispatch(updateWorkExperience({ index: workCount + i, data: exp }));
      });
      
      // Education
      let eduCount = resume.education.length;
      resumeData.education?.forEach((edu, i) => {
        dispatch(addEducation());
        dispatch(updateEducation({ index: eduCount + i, data: edu }));
      });
      
      // Trainings
      let trainCount = resume.trainings.length;
      resumeData.trainings?.forEach((train, i) => {
        dispatch(addTraining());
        dispatch(updateTraining({ index: trainCount + i, data: train }));
      });
      
      // Certifications
      let certCount = resume.certifications.length;
      resumeData.certifications?.forEach((cert, i) => {
        dispatch(addCertification());
        dispatch(updateCertification({ index: certCount + i, data: cert }));
      });
      
      // Skills
      let skillCount = resume.skills.length;
      resumeData.skills?.forEach((skill, i) => {
        dispatch(addSkill());
        dispatch(updateSkill({ index: skillCount + i, data: skill }));
      });
      
      // References
      let refCount = resume.references.length;
      resumeData.references?.forEach((ref, i) => {
        dispatch(addReference());
        dispatch(updateReference({ index: refCount + i, data: ref }));
      });
    }
  }, [resumeData, dispatch]);

  // Focus on first error
  useEffect(() => {
    if (Object.keys(errors).length > 0 && firstErrorRef.current) {
      firstErrorRef.current.focus();
    }
  }, [errors]);

  // Strong Validation (fixed education validation logic and messages)
  const validateForm = useCallback(() => {
    const newErrors = {};
    // Personal Info
    if (!resume.personalInfo.firstName)
      newErrors.firstName = "First Name is required";
    if (!resume.personalInfo.lastName)
      newErrors.lastName = "Last Name is required";
    if (!resume.personalInfo.emailAddress)
      newErrors.emailAddress = "Email Address is required";
    else if (!/\S+@\S+\.\S+/.test(resume.personalInfo.emailAddress))
      newErrors.emailAddress = "Invalid email format";
    if (
      resume.personalInfo.phoneNumber &&
      !/^\+?[\d\s-]{10,}$/.test(resume.personalInfo.phoneNumber)
    )
      newErrors.phoneNumber = "Invalid phone number format";

    // Work Experience
    resume.workExperience.forEach((exp, index) => {
      if (!exp.companyName)
        newErrors[`workExperience[${index}].companyName`] =
          "Company Name is required";
      if (!exp.position)
        newErrors[`workExperience[${index}].position`] = "Position is required";
      if (!exp.from)
        newErrors[`workExperience[${index}].from`] = "Start date is required";
      if (exp.from && exp.to && new Date(exp.from) > new Date(exp.to))
        newErrors[`workExperience[${index}].dates`] =
          "Start date cannot be after end date";
      if (!Array.isArray(exp.description))
        newErrors[`workExperience[${index}].description`] =
          "Description must be an array";
    });

    // Education
    resume.education.forEach((edu, index) => {
      if (!edu.institutionName)
        newErrors[`education[${index}].institutionName`] =
          "Institution Name is required";
      if (!edu.fieldOfStudy)
        newErrors[`education[${index}].fieldOfStudy`] =
          "Field of Study is required";
      if (!edu.degree)
        newErrors[`education[${index}].degree`] = "Degree is required";
      if (!edu.city)
        newErrors[`education[${index}].city`] = "City is required";
      if (!edu.country)
        newErrors[`education[${index}].country`] = "Country is required";
      if (!edu.passingYear)
        newErrors[`education[${index}].passingYear`] =
          "Passing Year is required";
      if (edu.gpa) {
        const gpaValue = parseFloat(edu.gpa);
        if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
          newErrors[`education[${index}].gpa`] =
            "GPA must be a number between 0 and 4";
        }
      }
    });

    // Trainings
    resume.trainings.forEach((train, index) => {
      if (!train.name)
        newErrors[`trainings[${index}].name`] = "Training Name is required";
      if (!train.institution)
        newErrors[`trainings[${index}].institution`] =
          "Institution is required";
      if (!train.from)
        newErrors[`trainings[${index}].from`] = "Start date is required";
      if (train.from && train.to && new Date(train.from) > new Date(train.to))
        newErrors[`trainings[${index}].dates`] =
          "Start date cannot be after end date";
      if (!Array.isArray(train.description))
        newErrors[`trainings[${index}].description`] =
          "Description must be an array";
    });

    // Certifications
    resume.certifications.forEach((cert, index) => {
      if (!cert.name)
        newErrors[`certifications[${index}].name`] =
          "Certification Name is required";
      if (!cert.authority)
        newErrors[`certifications[${index}].authority`] =
          "Authority is required";
      if (!cert.date)
        newErrors[`certifications[${index}].date`] = "Date is required";
      if (!Array.isArray(cert.description))
        newErrors[`certifications[${index}].description`] =
          "Description must be an array";
    });

    // Skills (flat array)
    resume.skills.forEach((skill, index) => {
      if (!skill.name)
        newErrors[`skills[${index}].name`] = "Skill Name is required";
      if (
        skill.level &&
        !["Beginner", "Intermediate", "Advanced", "Expert"].includes(
          skill.level
        )
      ) {
        newErrors[`skills[${index}].level`] =
          "Skill Level must be Beginner, Intermediate, Advanced, or Expert";
      }
    });

    // References
    resume.references.forEach((ref, index) => {
      if (!ref.name)
        newErrors[`references[${index}].name`] = "Name is required";
      if (!ref.position)
        newErrors[`references[${index}].position`] = "Position is required";
      if (!ref.company)
        newErrors[`references[${index}].company`] = "Company is required";
      if (ref.email && !/\S+@\S+\.\S+/.test(ref.email))
        newErrors[`references[${index}].email`] = "Invalid email format";
      if (ref.phone && !/^\+?[\d\s-]{10,}$/.test(ref.phone))
        newErrors[`references[${index}].phone`] = "Invalid phone number format";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [resume]);

  // Handlers (unchanged from your original code)
  const handlePersonalChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(updatePersonalInfo({ [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    [dispatch]
  );

  const handleAddressChange = useCallback(
    (e, addrType) => {
      const { name, value } = e.target;
      dispatch(
        updatePersonalInfo({
          [addrType]: { ...resume.personalInfo[addrType], [name]: value },
        })
      );
    },
    [dispatch, resume.personalInfo]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
      try {
        let response;
        if (resumeId) {
          response = await updateResume({
            id: resumeId,
            data: resume,
          }).unwrap();
        } else {
          response = await createResume(resume).unwrap();
        }
        setErrors({});
        generatePDF();
      } catch (err) {
        console.error("Submission error:", err);
        setErrors({
          form: `Error submitting resume: ${JSON.stringify(err, null, 2)}`,
        });
      }
    },
    [createResume, updateResume, resumeId, resume, validateForm]
  );

  const handleDelete = useCallback(async () => {
    if (
      resumeId &&
      window.confirm("Are you sure you want to delete this resume?")
    ) {
      try {
        await deleteResume(resumeId).unwrap();
        setErrors({});
        alert("Resume deleted successfully!");
        dispatch(resetResume());
        navigate("/dashboard");
      } catch (err) {
        setErrors({
          form: "Error deleting resume: " + (err.data?.message || err.message),
        });
      }
    }
  }, [deleteResume, resumeId, dispatch, navigate]);

  const handleSaveSectionItem = useCallback(
    async (type, index) => {
      setLoadingStates((prev) => ({ ...prev, [`${type}-${index}`]: true }));
      try {
        if (type === "workExperience") {
          await addWorkExperienceApi({
            id: resumeId,
            workExp: resume.workExperience[index],
          }).unwrap();
        } else if (type === "education") {
          await addEducationApi({
            id: resumeId,
            education: resume.education[index],
          }).unwrap();
        } else if (type === "reference") {
          await addReferenceApi({
            id: resumeId,
            reference: resume.references[index],
          }).unwrap();
        }
        setErrors({});
        alert(`${type} saved successfully!`);
      } catch (err) {
        setErrors({
          [`${type}-${index}`]: `Error saving ${type}: ${
            err.data?.message || err.message
          }`,
        });
      } finally {
        setLoadingStates((prev) => ({ ...prev, [`${type}-${index}`]: false }));
      }
    },
    [addWorkExperienceApi, addEducationApi, addReferenceApi, resumeId, resume]
  );

  const handleDeleteSectionItem = useCallback(
    async (type, index) => {
      setLoadingStates((prev) => ({
        ...prev,
        [`${type}-${index}-delete`]: true,
      }));
      try {
        if (type === "workExperience") {
          await deleteWorkExperienceApi({ id: resumeId, index }).unwrap();
          dispatch(removeWorkExperience(index));
        } else if (type === "education") {
          await deleteEducationApi({ id: resumeId, index }).unwrap();
          dispatch(removeEducation(index));
        } else if (type === "reference") {
          await deleteReferenceApi({ id: resumeId, index }).unwrap();
          dispatch(removeReference(index));
        }
        setErrors({});
        alert(`${type} deleted successfully!`);
      } catch (err) {
        setErrors({
          [`${type}-${index}`]: `Error deleting ${type}: ${
            err.data?.message || err.message
          }`,
        });
      } finally {
        setLoadingStates((prev) => ({
          ...prev,
          [`${type}-${index}-delete`]: false,
        }));
      }
    },
    [
      deleteWorkExperienceApi,
      deleteEducationApi,
      deleteReferenceApi,
      resumeId,
      dispatch,
    ]
  );

  const handleGetJobDescription = useCallback(
    async (index) => {
      setLoadingStates((prev) => ({
        ...prev,
        [`workExperience-${index}-desc`]: true,
      }));
      try {
        const workExp = resume.workExperience[index];
        const response = await getJobDescriptionSuggestion(workExp).unwrap();
        response.data.suggestions.forEach((desc) => {
          const updatedWorkExp = {
            ...workExp,
            description: [...workExp.description, desc]
          };
          dispatch(updateWorkExperience({ index, data: updatedWorkExp }));
        });
        setErrors({});
      } catch (err) {
        setErrors({
          [`workExperience-${index}`]:
            "Error getting job description: " +
            (err.data?.message || err.message),
        });
      } finally {
        setLoadingStates((prev) => ({
          ...prev,
          [`workExperience-${index}-desc`]: false,
        }));
      }
    },
    [getJobDescriptionSuggestion, resume.workExperience, dispatch]
  );

  const handleGetSkillsSuggestion = useCallback(async () => {
    setLoadingStates((prev) => ({ ...prev, skills: true }));
    try {
      const response = await getSkillsSuggestion(
        resume.workExperience
      ).unwrap();
      
      // Clear existing skills by removing from the end to avoid index issues
      for (let i = resume.skills.length - 1; i >= 0; i--) {
        dispatch(removeSkill(i));
      }
      
      response.data.suggestions.technical.forEach((skill) => {
        dispatch(addSkill());
        dispatch(
          updateSkill({
            index: resume.skills.length,
            data: { name: skill, level: "Advanced" },
          })
        );
      });
      
      response.data.suggestions.soft.forEach((skill) => {
        dispatch(addSkill());
        dispatch(
          updateSkill({
            index: resume.skills.length,
            data: { name: skill, level: "Advanced" },
          })
        );
      });
      
      setErrors({});
    } catch (err) {
      setErrors({
        skills:
          "Error getting skills suggestion: " +
          (err.data?.message || err.message),
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, skills: false }));
    }
  }, [getSkillsSuggestion, resume.workExperience, dispatch]);

  const handleGetCareerObjective = useCallback(async () => {
    setLoadingStates((prev) => ({ ...prev, careerObjective: true }));
    try {
      const response = await getCareerObjectiveSuggestion({
        workExperiences: resume.workExperience,
        education: resume.education,
      }).unwrap();
      dispatch(updateCareerObjective(response.data.suggestion));
      setErrors({});
    } catch (err) {
      setErrors({
        careerObjective:
          "Error getting career objective: " +
          (err.data?.message || err.message),
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, careerObjective: false }));
    }
  }, [
    getCareerObjectiveSuggestion,
    resume.workExperience,
    resume.education,
    dispatch,
  ]);

  const handleGetCareerSummary = useCallback(async () => {
    setLoadingStates((prev) => ({ ...prev, careerSummary: true }));
    try {
      const response = await getCareerSummarySuggestion({
        workExperiences: resume.workExperience,
        education: resume.education,
      }).unwrap();
      dispatch(updateCareerSummary(response.data.suggestion));
      setErrors({});
    } catch (err) {
      setErrors({
        careerSummary:
          "Error getting career summary: " + (err.data?.message || err.message),
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, careerSummary: false }));
    }
  }, [
    getCareerSummarySuggestion,
    resume.workExperience,
    resume.education,
    dispatch,
  ]);

  const generatePDF = useCallback(async () => {
    if (!previewRef.current) return;
    
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      
      pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(
        `${resume.personalInfo.firstName || "resume"}_${
          resume.personalInfo.lastName || ""
        }_resume.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }, [resume]);

  if (isFetching)
    return <div className="text-center p-6 text-gray-600">Loading...</div>;
  if (fetchError)
    return (
      <div className="text-center p-6 text-red-500" role="alert">
        Error: {fetchError.data?.message || fetchError.message}
      </div>
    );

  // Navigation items for the sidebar
  const navItems = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "objective", label: "Career Objective", icon: "🎯" },
    { id: "experience", label: "Work Experience", icon: "💼" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "trainings", label: "Trainings", icon: "📚" },
    { id: "certifications", label: "Certifications", icon: "📜" },
    { id: "skills", label: "Skills", icon: "🛠️" },
    { id: "references", label: "References", icon: "🤝" },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-full p-6 flex flex-col lg:flex-row gap-6 mt-[90px]">
        {/* Sidebar Navigation */}
        <div className="lg:w-1/6 mb-6 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
              Resume Sections
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection(item.id);
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center transition-colors ${
                      activeSection === item.id
                        ? "bg-indigo-100 text-indigo-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form Section */}
        <div className="lg:w-2/6 h-[130vh] overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md p-6"
            aria-labelledby="resume-form-title"
          >
            <h2
              id="resume-form-title"
              className="text-2xl font-bold mb-6 text-center text-gray-800"
            >
              Professional Resume Builder
            </h2>
            <div role="alert" aria-live="assertive" className="mb-4">
              {errors.form && (
                <div className="text-red-500 text-center p-3 bg-red-50 rounded-md border border-red-200">
                  {errors.form}
                </div>
              )}
            </div>

            {/* Personal Information */}
            <section id="personal" className="mb-8 scroll-mt-20">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="mr-2">👤</span> Personal Information
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
                  placeholder="e.g. Senior Software Engineer"
                />
                <InputField
                  label="Phone Number"
                  name="phoneNumber"
                  value={resume.personalInfo.phoneNumber}
                  onChange={handlePersonalChange}
                  type="tel"
                  error={errors.phoneNumber}
                  placeholder="+1 (555) 123-4567"
                />
                <InputField
                  label="Email Address"
                  name="emailAddress"
                  value={resume.personalInfo.emailAddress}
                  onChange={handlePersonalChange}
                  type="email"
                  required
                  error={errors.emailAddress}
                  placeholder="your.email@example.com"
                />
                <InputField
                  label="Skype"
                  name="skype"
                  value={resume.personalInfo.skype}
                  onChange={handlePersonalChange}
                  placeholder="live:yourusername"
                />
                <InputField
                  label="LinkedIn"
                  name="linkedIn"
                  value={resume.personalInfo.linkedIn}
                  onChange={handlePersonalChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
                <InputField
                  label="Portfolio"
                  name="portfolio"
                  value={resume.personalInfo.portfolio}
                  onChange={handlePersonalChange}
                  placeholder="https://yourportfolio.com"
                />
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <div className="flex items-center space-x-4">
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
                    {resume.personalInfo.profilePicture && (
                      <div className="flex-shrink-0">
                        <img
                          src={resume.personalInfo.profilePicture}
                          alt="Profile Preview"
                          className="w-16 h-16 object-cover rounded-full border-2 border-indigo-200"
                        />
                      </div>
                    )}
                  </div>
                  {isUploading && (
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-indigo-600"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Uploading...
                    </div>
                  )}
                  {uploadError && (
                    <div className="text-red-500 text-sm mt-1 bg-red-50 p-2 rounded-md">
                      {uploadError}
                    </div>
                  )}
                </div>
              </div>
              <h4 className="text-md font-medium mt-6 mb-3 text-gray-700 border-b pb-1">
                Current Address
              </h4>
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
                  label="Postal Code"
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
              <h4 className="text-md font-medium mt-6 mb-3 text-gray-700 border-b pb-1">
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
                  label="Postal Code"
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

            {/* Career Objective and Summary */}
            <section id="objective" className="mb-8 scroll-mt-20">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="mr-2">🎯</span> Career Objective & Summary
              </h3>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <InputField
                    label="Career Objective"
                    type="textarea"
                    value={resume.careerObjective}
                    onChange={(e) =>
                      dispatch(updateCareerObjective(e.target.value))
                    }
                    error={errors.careerObjective}
                    placeholder="A concise statement about your career goals and what you can bring to the organization..."
                  />
                  <button
                    type="button"
                    className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center text-sm"
                    onClick={handleGetCareerObjective}
                    disabled={loadingStates.careerObjective}
                    aria-label="Get AI-generated career objective"
                  >
                    {loadingStates.careerObjective ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 mr-2"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Generating...
                      </>
                    ) : (
                      "Get AI Career Objective"
                    )}
                  </button>
                  {errors.careerObjective && (
                    <div className="text-red-500 text-sm mt-1 bg-red-50 p-2 rounded-md">
                      {errors.careerObjective}
                    </div>
                  )}
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <InputField
                    label="Career Summary"
                    type="textarea"
                    value={resume.careerSummary}
                    onChange={(e) =>
                      dispatch(updateCareerSummary(e.target.value))
                    }
                    error={errors.careerSummary}
                    placeholder="A brief overview of your professional background, skills, and accomplishments..."
                  />
                  <button
                    type="button"
                    className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center text-sm"
                    onClick={handleGetCareerSummary}
                    disabled={loadingStates.careerSummary}
                    aria-label="Get AI-generated career summary"
                  >
                    {loadingStates.careerSummary ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 mr-2"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Generating...
                      </>
                    ) : (
                      "Get AI Career Summary"
                    )}
                  </button>
                  {errors.careerSummary && (
                    <div className="text-red-500 text-sm mt-1 bg-red-50 p-2 rounded-md">
                      {errors.careerSummary}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Work Experience */}
            <section id="experience" className="mb-8 scroll-mt-20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <span className="mr-2">💼</span> Work Experience
                </h3>
                <button
                  type="button"
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center text-sm bg-indigo-50 px-3 py-1 rounded-md"
                  onClick={() => dispatch(addWorkExperience())}
                  aria-label="Add Work Experience"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Experience
                </button>
              </div>
              
              {resume.workExperience.length === 0 ? (
                <div className="bg-gray-50 p-6 rounded-lg text-center border border-dashed border-gray-300">
                  <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-gray-600">No work experience added yet.</p>
                  <button
                    type="button"
                    className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium"
                    onClick={() => dispatch(addWorkExperience())}
                  >
                    Add your first work experience
                  </button>
                </div>
              ) : (
                resume.workExperience.map((exp, index) => (
                  <div key={index} className="mb-6 border rounded-lg p-4 bg-white shadow-sm">
                    <SectionItem
                      item={exp}
                      index={index}
                      fields={[
                        {
                          label: "Company Name",
                          name: "companyName",
                          required: true,
                        },
                        { label: "Position", name: "position", required: true },
                        { label: "City", name: "city" },
                        { label: "Country", name: "country" },
                        {
                          label: "From",
                          name: "from",
                          type: "date",
                          required: true,
                        },
                        { label: "To", name: "to", type: "date" },
                      ]}
                      updateAction={updateWorkExperience}
                      removeAction={removeWorkExperience}
                      checkboxField={{
                        name: "currentlyWorking",
                        label: "Currently Working",
                      }}
                      onSave={
                        resumeId
                          ? handleSaveSectionItem.bind(null, "workExperience")
                          : null
                      }
                      onDelete={
                        resumeId
                          ? handleDeleteSectionItem.bind(null, "workExperience")
                          : null
                      }
                      onGetDescription={handleGetJobDescription}
                      isSaving={loadingStates[`workExperience-${index}`]}
                      isDeleting={loadingStates[`workExperience-${index}-delete`]}
                      isSuggestingDesc={
                        loadingStates[`workExperience-${index}-desc`]
                      }
                      sectionName="Work Experience"
                      dispatch={dispatch}
                    />
                    {errors[`workExperience-${index}`] && (
                      <div className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-md">
                        {errors[`workExperience-${index}`]}
                      </div>
                    )}
                  </div>
                ))
              )}
            </section>

            {/* Education Section */}
            <section id="education" className="mb-8 scroll-mt-20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <span className="mr-2">🎓</span> Education
                </h3>
                <button
                  type="button"
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center text-sm bg-indigo-50 px-3 py-1 rounded-md"
                  onClick={() => dispatch(addEducation())}
                  aria-label="Add Education"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Education
                </button>
              </div>

              {(() => {
                const educationList = Array.isArray(resume?.education) ? resume.education : [];

                if (educationList.length === 0) {
                  return (
                    <div className="bg-gray-50 p-6 rounded-lg text-center border border-dashed border-gray-300">
                      <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                      <p className="mt-2 text-gray-600">No education history added yet.</p>
                      <button
                        type="button"
                        className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium"
                        onClick={() => dispatch(addEducation())}
                      >
                        Add your first education
                      </button>
                    </div>
                  );
                }

                return educationList.map((edu, index) => (
                  <div key={index} className="mb-6 border rounded-lg p-4 bg-white shadow-sm">
                    <SectionItem
                      item={edu}
                      index={index}
                      fields={[
                        { label: "Institution Name", name: "institutionName", required: true },
                        { label: "Field of Study", name: "fieldOfStudy", required: true },
                        { label: "Degree", name: "degree", required: true },
                        { label: "City", name: "city", required: true },
                        { label: "Country", name: "country", required: true },
                        { label: "Passing Year", name: "passingYear", required: true },
                        {
                          label: "GPA",
                          name: "gpa",
                          type: "number",
                          min: 0,
                          max: 4,
                          step: "0.01",
                        },
                        { label: "Honors", name: "honors" }
                      ]}
                      updateAction={updateEducation}
                      removeAction={removeEducation}
                      checkboxField={{
                        name: "currentlyStudying",
                        label: "Currently Studying",
                      }}
                      onSave={ resumeId ? handleSaveSectionItem.bind(null, "education") : null }
                      onDelete={ resumeId ? handleDeleteSectionItem.bind(null, "education") : null }
                      isSaving={loadingStates[`education-${index}`]}
                      isDeleting={loadingStates[`education-${index}-delete`]}
                      sectionName="Education"
                      dispatch={dispatch}
                    />

                    {errors?.[`education-${index}`] && (
                      <div className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-md">
                        {errors[`education-${index}`]}
                      </div>
                    )}
                  </div>
                ));
              })()}
            </section>

            {/* Trainings */}
            <section id="trainings" className="mb-8 scroll-mt-20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <span className="mr-2">📚</span> Trainings
                </h3>
                <button
                  type="button"
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center text-sm bg-indigo-50 px-3 py-1 rounded-md"
                  onClick={() => dispatch(addTraining())}
                  aria-label="Add Training"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Training
                </button>
              </div>
              
              {resume.trainings.length === 0 ? (
                <div className="bg-gray-50 p-6 rounded-lg text-center border border-dashed border-gray-300">
                  <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="mt-2 text-gray-600">No trainings added yet.</p>
                  <button
                    type="button"
                    className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium"
                    onClick={() => dispatch(addTraining())}
                  >
                    Add your first training
                  </button>
                </div>
              ) : (
                resume.trainings.map((train, index) => (
                  <div key={index} className="mb-6 border rounded-lg p-4 bg-white shadow-sm">
                    <SectionItem
                      item={train}
                      index={index}
                      fields={[
                        { label: "Name", name: "name", required: true },
                        {
                          label: "Institution",
                          name: "institution",
                          required: true,
                        },
                        { label: "Duration", name: "duration" },
                        {
                          label: "From",
                          name: "from",
                          type: "date",
                          required: true,
                        },
                        { label: "To", name: "to", type: "date" },
                      ]}
                      updateAction={updateTraining}
                      removeAction={removeTraining}
                      sectionName="Training"
                      dispatch={dispatch}
                    />
                    {errors[`training-${index}`] && (
                      <div className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-md">
                        {errors[`training-${index}`]}
                      </div>
                    )}
                  </div>
                ))
              )}
            </section>

            {/* Certifications */}
            <section id="certifications" className="mb-8 scroll-mt-20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <span className="mr-2">📜</span> Certifications
                </h3>
                <button
                  type="button"
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center text-sm bg-indigo-50 px-3 py-1 rounded-md"
                  onClick={() => dispatch(addCertification())}
                  aria-label="Add Certification"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Certification
                </button>
              </div>
              
              {resume.certifications.length === 0 ? (
                <div className="bg-gray-50 p-6 rounded-lg text-center border border-dashed border-gray-300">
                  <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p className="mt-2 text-gray-600">No certifications added yet.</p>
                  <button
                    type="button"
                    className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium"
                    onClick={() => dispatch(addCertification())}
                  >
                    Add your first certification
                  </button>
                </div>
              ) : (
                resume.certifications.map((cert, index) => (
                  <div key={index} className="mb-6 border rounded-lg p-4 bg-white shadow-sm">
                    <SectionItem
                      item={cert}
                      index={index}
                      fields={[
                        { label: "Name", name: "name", required: true },
                        { label: "Authority", name: "authority", required: true },
                        { label: "URL/Code", name: "urlCode" },
                        {
                          label: "Date",
                          name: "date",
                          type: "date",
                          required: true,
                        },
                      ]}
                      updateAction={updateCertification}
                      removeAction={removeCertification}
                      sectionName="Certification"
                      dispatch={dispatch}
                    />
                    {errors[`certification-${index}`] && (
                      <div className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-md">
                        {errors[`certification-${index}`]}
                      </div>
                    )}
                  </div>
                ))
              )}
            </section>

            {/* Skills */}
            <section id="skills" className="mb-8 scroll-mt-20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <span className="mr-2">🛠️</span> Skills
                </h3>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center text-sm bg-indigo-50 px-3 py-1 rounded-md"
                    onClick={() => dispatch(addSkill())}
                    aria-label="Add Skill"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Skill
                  </button>
                  <button
                    type="button"
                    className="bg-indigo-600 text-white py-1 px-3 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center text-sm"
                    onClick={handleGetSkillsSuggestion}
                    disabled={loadingStates.skills}
                    aria-label="Get AI-generated skills suggestion"
                  >
                    {loadingStates.skills ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 mr-1"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        AI...
                      </>
                    ) : (
                      "AI Suggest"
                    )}
                  </button>
                </div>
              </div>
              
              {errors.skills && (
                <div className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded-md">{errors.skills}</div>
              )}
              
              {resume.skills.length === 0 ? (
                <div className="bg-gray-50 p-6 rounded-lg text-center border border-dashed border-gray-300">
                  <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="mt-2 text-gray-600">No skills added yet.</p>
                  <button
                    type="button"
                    className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium"
                    onClick={() => dispatch(addSkill())}
                  >
                    Add your first skill
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resume.skills.map((skill, index) => (
                    <div key={index} className="border p-4 rounded-lg bg-white shadow-sm">
                      <div className="flex gap-4 mb-2 items-start">
                        <InputField
                          label="Skill Name"
                          name="name"
                          value={skill.name}
                          onChange={(e) =>
                            dispatch(
                              updateSkill({
                                index,
                                data: { ...skill, name: e.target.value },
                              })
                            )
                          }
                          className="flex-1"
                          required
                          error={errors[`skills[${index}].name`]}
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={`skill-level-${index}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Level
                          </label>
                          <select
                            id={`skill-level-${index}`}
                            name="level"
                            value={skill.level || ""}
                            onChange={(e) =>
                              dispatch(
                                updateSkill({
                                  index,
                                  data: { ...skill, level: e.target.value },
                                })
                              )
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="">Select Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </select>
                          {errors[`skills[${index}].level`] && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors[`skills[${index}].level`]}
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700 text-sm mt-6"
                          onClick={() => dispatch(removeSkill(index))}
                          aria-label={`Remove skill ${index + 1}`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* References */}
            <section id="references" className="mb-8 scroll-mt-20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <span className="mr-2">🤝</span> References
                </h3>
                <button
                  type="button"
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center text-sm bg-indigo-50 px-3 py-1 rounded-md"
                  onClick={() => dispatch(addReference())}
                  aria-label="Add Reference"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Reference
                </button>
              </div>
              
              {resume.references.length === 0 ? (
                <div className="bg-gray-50 p-6 rounded-lg text-center border border-dashed border-gray-300">
                  <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="mt-2 text-gray-600">No references added yet.</p>
                  <button
                    type="button"
                    className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium"
                    onClick={() => dispatch(addReference())}
                  >
                    Add your first reference
                  </button>
                </div>
              ) : (
                resume.references.map((ref, index) => (
                  <div key={index} className="mb-6 border rounded-lg p-4 bg-white shadow-sm">
                    <SectionItem
                      item={ref}
                      index={index}
                      fields={[
                        { label: "Name", name: "name", required: true },
                        { label: "Position", name: "position", required: true },
                        { label: "Company", name: "company", required: true },
                        { label: "Phone", name: "phone", type: "tel" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Relationship", name: "relationship" },
                      ]}
                      updateAction={updateReference}
                      removeAction={removeReference}
                      onSave={
                        resumeId
                          ? handleSaveSectionItem.bind(null, "reference")
                          : null
                      }
                      onDelete={
                        resumeId
                          ? handleDeleteSectionItem.bind(null, "reference")
                          : null
                      }
                      isSaving={loadingStates[`reference-${index}`]}
                      isDeleting={loadingStates[`reference-${index}-delete`]}
                      sectionName="Reference"
                      dispatch={dispatch}
                    />
                    {errors[`reference-${index}`] && (
                      <div className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-md">
                        {errors[`reference-${index}`]}
                      </div>
                    )}
                  </div>
                ))
              )}
            </section>

            {/* Form Actions */}
            <div className="flex gap-4 justify-center mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center shadow-md"
                disabled={isCreating || isUpdating}
                aria-label="Save and Generate Resume"
              >
                {isCreating || isUpdating ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Save & Generate Resume
                  </>
                )}
              </button>
              {resumeId && (
                <button
                  type="button"
                  className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 disabled:bg-red-400 flex items-center shadow-md"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  aria-label="Delete Resume"
                >
                  {isDeleting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Resume
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="lg:w-2/3 h-[130vh] overflow-y-auto">
          <div className=" flex justify-center items-center">
            <h3>Temp1</h3>
            <h3>Temp2</h3>
          </div>
          <button>
            <div ref={previewRef}>
            <ResumePreview resume={resume} />
            </div>
            
          </button>
          <button>
            <div>
              Hello
            </div>
          </button>
          
        </div>

      </div>
      <Footer />
    </>
  );
};

export default ResumeForm;