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
  updatePersonalInfo,
  updateCareerObjective,
  updateCareerSummary,
  addWorkExperience,
  updateWorkExperience,
  removeWorkExperience,
  addDescriptionToWork,
  updateDescriptionToWork,
  removeDescriptionFromWork,
  addEducation,
  updateEducation,
  removeEducation,
  addDescriptionToEducation,
  updateDescriptionToEducation,
  removeDescriptionFromEducation,
  addTraining,
  updateTraining,
  removeTraining,
  addDescriptionToTraining,
  updateDescriptionToTraining,
  removeDescriptionFromTraining,
  addCertification,
  updateCertification,
  removeCertification,
  addDescriptionToCertification,
  updateDescriptionToCertification,
  removeDescriptionFromCertification,
  addSkillCategory,
  updateSkillCategory,
  removeSkillCategory,
  addSkillToCategory,
  updateSkillInCategory,
  removeSkillFromCategory,
  addReference,
  updateReference,
  removeReference,
  resetResume,
} from "../context/resumeSlice";
import InputField from "../Components/InputField";
import SectionItem from "../Components/SectionItem";
import jsPDF from "jspdf";
import "../assets/ResumeForm.css";

// ResumePreview Component
const ResumePreview = ({ resume }) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full overflow-auto">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {resume.personalInfo.firstName || "First Name"}{" "}
          {resume.personalInfo.lastName || "Last Name"}
        </h1>
        {resume.personalInfo.professionalTitle && (
          <p className="text-md text-gray-600">
            {resume.personalInfo.professionalTitle}
          </p>
        )}
        <div className="flex justify-center gap-4 text-sm text-gray-500 mt-2">
          {resume.personalInfo.emailAddress && (
            <p>{resume.personalInfo.emailAddress}</p>
          )}
          {resume.personalInfo.phoneNumber && (
            <p>{resume.personalInfo.phoneNumber}</p>
          )}
        </div>
        {resume.personalInfo.address && (
          <p className="text-sm text-gray-500">
            {resume.personalInfo.address.street &&
              `${resume.personalInfo.address.street}, `}
            {resume.personalInfo.address.city &&
              `${resume.personalInfo.address.city}, `}
            {resume.personalInfo.address.postal &&
              `${resume.personalInfo.address.postal}, `}
            {resume.personalInfo.address.country}
          </p>
        )}
        <div className="flex justify-center gap-4 text-sm text-blue-600 mt-1">
          {resume.personalInfo.linkedIn && (
            <a
              href={resume.personalInfo.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          )}
          {resume.personalInfo.portfolio && (
            <a
              href={resume.personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Career Objective */}
      {resume.careerObjective && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-1">
            Career Objective
          </h2>
          <p className="text-sm text-gray-600 mt-2">{resume.careerObjective}</p>
        </section>
      )}

      {/* Career Summary */}
      {resume.careerSummary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-1">
            Career Summary
          </h2>
          <p className="text-sm text-gray-600 mt-2">{resume.careerSummary}</p>
        </section>
      )}

      {/* Work Experience */}
      {resume.workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-1">
            Work Experience
          </h2>
          {resume.workExperience.map((exp, index) => (
            <div key={index} className="mt-3">
              <h3 className="text-md font-medium text-gray-800">
                {exp.position || "Position"} at {exp.companyName || "Company"}
              </h3>
              <p className="text-sm text-gray-500">
                {exp.city && `${exp.city}, `}
                {exp.country} | {exp.from || "Start Date"} -{" "}
                {exp.to || "Present"}
              </p>
              {exp.description.length > 0 && (
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                  {exp.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-1">
            Education
          </h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mt-3">
              <h3 className="text-md font-medium text-gray-800">
                {edu.degree || "Degree"} in{" "}
                {edu.fieldOfStudy || "Field of Study"}
              </h3>
              <p className="text-sm text-gray-500">
                {edu.institutionName || "Institution"},{" "}
                {edu.city && `${edu.city}, `}
                {edu.country} | {edu.from || "Start Date"} -{" "}
                {edu.to || "Present"}
              </p>
              {edu.gpa && (
                <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
              )}
              {edu.honors && (
                <p className="text-sm text-gray-600">Honors: {edu.honors}</p>
              )}
              {edu.description.length > 0 && (
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                  {edu.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Trainings */}
      {resume.trainings.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-1">
            Trainings
          </h2>
          {resume.trainings.map((train, index) => (
            <div key={index} className="mt-3">
              <h3 className="text-md font-medium text-gray-800">
                {train.name || "Training Name"},{" "}
                {train.institution || "Institution"}
              </h3>
              <p className="text-sm text-gray-500">
                Duration: {train.duration || "Duration"} |{" "}
                {train.from || "Start Date"} - {train.to || "End Date"}
              </p>
              {train.description.length > 0 && (
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                  {train.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {resume.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-1">
            Certifications
          </h2>
          {resume.certifications.map((cert, index) => (
            <div key={index} className="mt-3">
              <h3 className="text-md font-medium text-gray-800">
                {cert.name || "Certification Name"},{" "}
                {cert.authority || "Authority"}
              </h3>
              <p className="text-sm text-gray-500">
                Date: {cert.date || "Date"}
              </p>
              {cert.urlCode && (
                <p className="text-sm text-blue-600">
                  <a
                    href={cert.urlCode}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    URL/Code
                  </a>
                </p>
              )}
              {cert.description.length > 0 && (
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                  {cert.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-1">
            Skills
          </h2>
          {resume.skills.map((cat, index) => (
            <div key={index} className="mt-3">
              <h3 className="text-md font-medium text-gray-800">
                {cat.category || "Category"}
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                {cat.skills.map((skill, idx) => (
                  <li key={idx}>
                    {skill.name || "Skill"} - {skill.level || "Level"}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* References */}
      {resume.references.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-1">
            References
          </h2>
          {resume.references.map((ref, index) => (
            <div key={index} className="mt-3">
              <h3 className="text-md font-medium text-gray-800">
                {ref.name || "Name"}, {ref.position || "Position"} at{" "}
                {ref.company || "Company"}
              </h3>
              <p className="text-sm text-gray-500">
                {ref.phone && `Phone: ${ref.phone}, `}
                {ref.email && `Email: ${ref.email}`}
              </p>
              {ref.relationship && (
                <p className="text-sm text-gray-600">
                  Relationship: {ref.relationship}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

// ResumeForm Component
const ResumeForm = ({ resumeId }) => {
  const resume = useSelector((state) => state.resume);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const firstErrorRef = useRef(null);

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

  
  // API hooks
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

  // Sync API data with Redux store
  useEffect(() => {
    if (resumeData) {
      dispatch(resetResume());
      dispatch(updatePersonalInfo(resumeData.personalInfo || {}));
      dispatch(updateCareerObjective(resumeData.careerObjective || ""));
      dispatch(updateCareerSummary(resumeData.careerSummary || ""));
      resumeData.workExperience?.forEach((exp) => {
        dispatch(addWorkExperience());
        dispatch(
          updateWorkExperience({
            index: resume.workExperience.length - 1,
            data: exp,
          })
        );
      });
      resumeData.education?.forEach((edu) => {
        dispatch(addEducation());
        dispatch(
          updateEducation({ index: resume.education.length - 1, data: edu })
        );
      });
      resumeData.trainings?.forEach((train) => {
        dispatch(addTraining());
        dispatch(
          updateTraining({ index: resume.trainings.length - 1, data: train })
        );
      });
      resumeData.certifications?.forEach((cert) => {
        dispatch(addCertification());
        dispatch(
          updateCertification({
            index: resume.certifications.length - 1,
            data: cert,
          })
        );
      });
      resumeData.skills?.forEach((cat) => {
        dispatch(addSkillCategory());
        dispatch(
          updateSkillCategory({
            index: resume.skills.length - 1,
            category: cat.category,
          })
        );
        cat.skills.forEach((skill) => {
          dispatch(addSkillToCategory({ index: resume.skills.length - 1 }));
          dispatch(
            updateSkillInCategory({
              catIndex: resume.skills.length - 1,
              skillIndex:
                resume.skills[resume.skills.length - 1].skills.length - 1,
              data: skill,
            })
          );
        });
      });
      resumeData.references?.forEach((ref) => {
        dispatch(addReference());
        dispatch(
          updateReference({ index: resume.references.length - 1, data: ref })
        );
      });
    }
  }, [resumeData, dispatch, resume]);

  // Focus on first error
  useEffect(() => {
    if (Object.keys(errors).length > 0 && firstErrorRef.current) {
      firstErrorRef.current.focus();
    }
  }, [errors]);

  // Strong Validation
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

    // Ensure address is properly initialized
    if (
      !resume.personalInfo.address ||
      typeof resume.personalInfo.address !== "object"
    )
      newErrors.address = "Address object is missing or invalid";
    if (
      !resume.personalInfo.permanentAddress ||
      typeof resume.personalInfo.permanentAddress !== "object"
    )
      newErrors.permanentAddress =
        "Permanent Address object is missing or invalid";

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
      if (!edu.from)
        newErrors[`education[${index}].from`] = "Start date is required";
      if (edu.from && edu.to && new Date(edu.from) > new Date(edu.to))
        newErrors[`education[${index}].dates`] =
          "Start date cannot be after end date";
      if (!Array.isArray(edu.description))
        newErrors[`education[${index}].description`] =
          "Description must be an array";
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

    // Skills
    resume.skills.forEach((cat, catIndex) => {
      if (!cat.category)
        newErrors[`skills[${catIndex}].category`] =
          "Skill Category is required";
      if (!Array.isArray(cat.skills))
        newErrors[`skills[${catIndex}].skills`] = "Skills must be an array";
      cat.skills.forEach((skill, skillIndex) => {
        if (!skill.name)
          newErrors[`skills[${catIndex}][${skillIndex}].name`] =
            "Skill Name is required";
        if (
          skill.level &&
          !["Beginner", "Intermediate", "Advanced", "Expert"].includes(
            skill.level
          )
        ) {
          newErrors[`skills[${catIndex}][${skillIndex}].level`] =
            "Skill Level must be Beginner, Intermediate, Advanced, or Expert";
        }
      });
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

  // Handlers
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
      console.log("Submitting resume:", resume); // Log the resume object
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
        generatePDF(resume);
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
          dispatch(addDescriptionToWork({ index }));
          dispatch(
            updateDescriptionToWork({
              workIndex: index,
              descIndex: resume.workExperience[index].description.length - 1,
              value: desc,
            })
          );
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
      dispatch(addSkillCategory());
      dispatch(
        updateSkillCategory({
          index: resume.skills.length - 1,
          category: "Technical Skills",
        })
      );
      response.data.suggestions.technical.forEach((skill) => {
        dispatch(addSkillToCategory({ index: resume.skills.length - 1 }));
        dispatch(
          updateSkillInCategory({
            catIndex: resume.skills.length - 1,
            skillIndex:
              resume.skills[resume.skills.length - 1].skills.length - 1,
            data: { name: skill, level: "Advanced" },
          })
        );
      });
      dispatch(addSkillCategory());
      dispatch(
        updateSkillCategory({
          index: resume.skills.length - 1,
          category: "Soft Skills",
        })
      );
      response.data.suggestions.soft.forEach((skill) => {
        dispatch(addSkillToCategory({ index: resume.skills.length - 1 }));
        dispatch(
          updateSkillInCategory({
            catIndex: resume.skills.length - 1,
            skillIndex:
              resume.skills[resume.skills.length - 1].skills.length - 1,
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
  }, [getSkillsSuggestion, resume.workExperience, resume.skills, dispatch]);

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

  const generatePDF = useCallback(
    (data) => {
      const doc = new jsPDF();
      let yPos = 20;

      const addText = (text, x, y, options = {}) => {
        if (!text || text === "undefined") return y;
        const lines = doc.splitTextToSize(text, options.maxWidth || 170);
        doc.text(lines, x, y, options);
        return y + (options.lineHeight || 7) * lines.length;
      };

      const checkPage = () => {
        if (yPos > 280) {
          doc.addPage();
          yPos = 20;
        }
      };

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      yPos = addText(
        `${data.personalInfo.firstName || ""} ${
          data.personalInfo.lastName || ""
        }`,
        20,
        yPos,
        { lineHeight: 12 }
      );
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      yPos = addText(data.personalInfo.professionalTitle || "", 20, yPos);
      yPos = addText(
        `${data.personalInfo.emailAddress || ""} | ${
          data.personalInfo.phoneNumber || ""
        }`,
        20,
        yPos
      );
      yPos = addText(
        `${data.personalInfo.address.street || ""}, ${
          data.personalInfo.address.city || ""
        }, ${data.personalInfo.address.postal || ""}, ${
          data.personalInfo.address.country || ""
        }`,
        20,
        yPos
      );
      if (data.personalInfo.linkedIn)
        yPos = addText(`LinkedIn: ${data.personalInfo.linkedIn}`, 20, yPos);
      if (data.personalInfo.portfolio)
        yPos = addText(`Portfolio: ${data.personalInfo.portfolio}`, 20, yPos);
      yPos += 5;
      checkPage();

      if (data.careerObjective) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        yPos = addText("Career Objective", 20, yPos, { lineHeight: 10 });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        yPos = addText(data.careerObjective, 20, yPos, {
          maxWidth: 170,
          lineHeight: 7,
        });
        checkPage();
      }

      if (data.careerSummary) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        yPos = addText("Career Summary", 20, yPos, { lineHeight: 10 });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        yPos = addText(data.careerSummary, 20, yPos, {
          maxWidth: 170,
          lineHeight: 7,
        });
        checkPage();
      }

      if (data.workExperience.length) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        yPos = addText("Work Experience", 20, yPos, { lineHeight: 10 });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        data.workExperience.forEach((exp) => {
          checkPage();
          yPos = addText(
            `${exp.position || ""} at ${exp.companyName || ""}, ${
              exp.city || ""
            }, ${exp.country || ""}`,
            20,
            yPos
          );
          yPos = addText(
            `${exp.from || ""} - ${exp.to || "Present"}`,
            20,
            yPos
          );
          exp.description.forEach((desc) => {
            yPos = addText(`• ${desc || ""}`, 25, yPos, { maxWidth: 160 });
            checkPage();
          });
          yPos += 5;
        });
        checkPage();
      }

      if (data.education.length) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        yPos = addText("Education", 20, yPos, { lineHeight: 10 });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        data.education.forEach((edu) => {
          checkPage();
          yPos = addText(
            `${edu.degree || ""} in ${edu.fieldOfStudy || ""}, ${
              edu.institutionName || ""
            }, ${edu.city || ""}, ${edu.country || ""}`,
            20,
            yPos
          );
          yPos = addText(
            `${edu.from || ""} - ${edu.to || "Present"}`,
            20,
            yPos
          );
          if (edu.gpa) yPos = addText(`GPA: ${edu.gpa}`, 20, yPos);
          if (edu.honors) yPos = addText(`Honors: ${edu.honors}`, 20, yPos);
          edu.description.forEach((desc) => {
            yPos = addText(`• ${desc || ""}`, 25, yPos, { maxWidth: 160 });
            checkPage();
          });
          yPos += 5;
        });
        checkPage();
      }

      if (data.trainings.length) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        yPos = addText("Trainings", 20, yPos, { lineHeight: 10 });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        data.trainings.forEach((train) => {
          checkPage();
          yPos = addText(
            `${train.name || ""}, ${train.institution || ""}`,
            20,
            yPos
          );
          yPos = addText(
            `Duration: ${train.duration || ""}, ${train.from || ""} - ${
              train.to || ""
            }`,
            20,
            yPos
          );
          train.description.forEach((desc) => {
            yPos = addText(`• ${desc || ""}`, 25, yPos, { maxWidth: 160 });
            checkPage();
          });
          yPos += 5;
        });
        checkPage();
      }

      if (data.certifications.length) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        yPos = addText("Certifications", 20, yPos, { lineHeight: 10 });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        data.certifications.forEach((cert) => {
          checkPage();
          yPos = addText(
            `${cert.name || ""}, ${cert.authority || ""}`,
            20,
            yPos
          );
          yPos = addText(`Date: ${cert.date || ""}`, 20, yPos);
          if (cert.urlCode) yPos = addText(`URL: ${cert.urlCode}`, 20, yPos);
          cert.description.forEach((desc) => {
            yPos = addText(`• ${desc || ""}`, 25, yPos, { maxWidth: 160 });
            checkPage();
          });
          yPos += 5;
        });
        checkPage();
      }

      if (data.skills.length) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        yPos = addText("Skills", 20, yPos, { lineHeight: 10 });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        data.skills.forEach((cat) => {
          checkPage();
          yPos = addText(cat.category || "", 20, yPos);
          cat.skills.forEach((skill) => {
            yPos = addText(
              `• ${skill.name || ""} - ${skill.level || ""}`,
              25,
              yPos
            );
            checkPage();
          });
          yPos += 5;
        });
        checkPage();
      }

      if (data.references.length) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        yPos = addText("References", 20, yPos, { lineHeight: 10 });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        data.references.forEach((ref) => {
          checkPage();
          yPos = addText(
            `${ref.name || ""}, ${ref.position || ""} at ${ref.company || ""}`,
            20,
            yPos
          );
          yPos = addText(
            `Phone: ${ref.phone || ""}, Email: ${ref.email || ""}`,
            20,
            yPos
          );
          yPos = addText(`Relationship: ${ref.relationship || ""}`, 20, yPos);
          yPos += 5;
        });
      }

      doc.save(
        `${data.personalInfo.firstName || "resume"}_${
          data.personalInfo.lastName || ""
        }_resume.pdf`
      );
    },
    [resume]
  );

  if (isFetching)
    return <div className="text-center p-6 text-gray-600">Loading...</div>;
  if (fetchError)
    return (
      <div className="text-center p-6 text-red-500" role="alert">
        Error: {fetchError.data?.message || fetchError.message}
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-6 mt-12">
        {/* Form Section */}
        <div className="lg:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md p-6"
            aria-labelledby="resume-form-title"
          >
            <h2
              id="resume-form-title"
              className="text-2xl font-bold mb-6 text-center text-gray-800"
            >
              Resume Builder
            </h2>
            <div role="alert" aria-live="assertive" className="mb-4">
              {errors.form && (
                <div className="text-red-500 text-center">{errors.form}</div>
              )}
            </div>

            {/* Personal Information */}
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
                      Uploading...
                    </div>
                  )}
                  {uploadError && (
                    <div className="text-red-500 text-sm mt-1">
                      {uploadError}
                    </div>
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
              <h4 className="text-md font-medium mt-4 mb-2 text-gray-700">
                Address
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

            {/* Career Objective and Summary */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Career Objective & Summary
              </h3>
              <div className="space-y-4">
                <div>
                  <InputField
                    label="Career Objective"
                    type="textarea"
                    value={resume.careerObjective}
                    onChange={(e) =>
                      dispatch(updateCareerObjective(e.target.value))
                    }
                    error={errors.careerObjective}
                  />
                  <button
                    type="button"
                    className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center"
                    onClick={handleGetCareerObjective}
                    disabled={loadingStates.careerObjective}
                    aria-label="Get AI-generated career objective"
                  >
                    {loadingStates.careerObjective ? (
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
                        Generating...
                      </>
                    ) : (
                      "Get AI Career Objective"
                    )}
                  </button>
                  {errors.careerObjective && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.careerObjective}
                    </div>
                  )}
                </div>
                <div>
                  <InputField
                    label="Career Summary"
                    type="textarea"
                    value={resume.careerSummary}
                    onChange={(e) =>
                      dispatch(updateCareerSummary(e.target.value))
                    }
                    error={errors.careerSummary}
                  />
                  <button
                    type="button"
                    className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center"
                    onClick={handleGetCareerSummary}
                    disabled={loadingStates.careerSummary}
                    aria-label="Get AI-generated career summary"
                  >
                    {loadingStates.careerSummary ? (
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
                        Generating...
                      </>
                    ) : (
                      "Get AI Career Summary"
                    )}
                  </button>
                  {errors.careerSummary && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.careerSummary}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Work Experience */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Work Experience
              </h3>
              {resume.workExperience.map((exp, index) => (
                <div key={index}>
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
                    addDescAction={addDescriptionToWork}
                    updateDescAction={updateDescriptionToWork}
                    removeDescAction={removeDescriptionFromWork}
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
                    <div className="text-red-500 text-sm mt-1">
                      {errors[`workExperience-${index}`]}
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => dispatch(addWorkExperience())}
                aria-label="Add Work Experience"
              >
                Add Work Experience
              </button>
            </section>

            {/* Education */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Education
              </h3>
              {resume.education.map((edu, index) => (
                <div key={index}>
                  <SectionItem
                    item={edu}
                    index={index}
                    fields={[
                      {
                        label: "Institution Name",
                        name: "institutionName",
                        required: true,
                      },
                      {
                        label: "Field of Study",
                        name: "fieldOfStudy",
                        required: true,
                      },
                      { label: "Degree", name: "degree", required: true },
                      { label: "City", name: "city" },
                      { label: "Country", name: "country" },
                      {
                        label: "From",
                        name: "from",
                        type: "date",
                        required: true,
                      },
                      { label: "To", name: "to", type: "date" },
                      {
                        label: "GPA",
                        name: "gpa",
                        type: "number",
                        min: 0,
                        max: 4,
                        step: "0.01",
                      },
                      { label: "Honors", name: "honors" },
                    ]}
                    updateAction={updateEducation}
                    removeAction={removeEducation}
                    addDescAction={addDescriptionToEducation}
                    updateDescAction={updateDescriptionToEducation}
                    removeDescAction={removeDescriptionFromEducation}
                    checkboxField={{
                      name: "currentlyStudying",
                      label: "Currently Studying",
                    }}
                    onSave={
                      resumeId
                        ? handleSaveSectionItem.bind(null, "education")
                        : null
                    }
                    onDelete={
                      resumeId
                        ? handleDeleteSectionItem.bind(null, "education")
                        : null
                    }
                    isSaving={loadingStates[`education-${index}`]}
                    isDeleting={loadingStates[`education-${index}-delete`]}
                    sectionName="Education"
                    dispatch={dispatch}
                  />
                  {errors[`education-${index}`] && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors[`education-${index}`]}
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => dispatch(addEducation())}
                aria-label="Add Education"
              >
                Add Education
              </button>
            </section>

            {/* Trainings */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Trainings
              </h3>
              {resume.trainings.map((train, index) => (
                <div key={index}>
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
                    addDescAction={addDescriptionToTraining}
                    updateDescAction={updateDescriptionToTraining}
                    removeDescAction={removeDescriptionFromTraining}
                    sectionName="Training"
                    dispatch={dispatch}
                  />
                  {errors[`training-${index}`] && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors[`training-${index}`]}
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => dispatch(addTraining())}
                aria-label="Add Training"
              >
                Add Training
              </button>
            </section>

            {/* Certifications */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Certifications
              </h3>
              {resume.certifications.map((cert, index) => (
                <div key={index}>
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
                    addDescAction={addDescriptionToCertification}
                    updateDescAction={updateDescriptionToCertification}
                    removeDescAction={removeDescriptionFromCertification}
                    sectionName="Certification"
                    dispatch={dispatch}
                  />
                  {errors[`certification-${index}`] && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors[`certification-${index}`]}
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => dispatch(addCertification())}
                aria-label="Add Certification"
              >
                Add Certification
              </button>
            </section>

            {/* Skills */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Skills
              </h3>
              <button
                type="button"
                className="mb-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center"
                onClick={handleGetSkillsSuggestion}
                disabled={loadingStates.skills}
                aria-label="Get AI-generated skills suggestion"
              >
                {loadingStates.skills ? (
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
                    Generating...
                  </>
                ) : (
                  "Get AI Skills Suggestion"
                )}
              </button>
              {errors.skills && (
                <div className="text-red-500 text-sm mb-2">{errors.skills}</div>
              )}
              {resume.skills.map((cat, catIndex) => (
                <div
                  key={catIndex}
                  className="border p-4 mb-4 rounded-md bg-gray-50"
                >
                  <InputField
                    label="Category"
                    name="category"
                    value={cat.category}
                    onChange={(e) =>
                      dispatch(
                        updateSkillCategory({
                          index: catIndex,
                          category: e.target.value,
                        })
                      )
                    }
                    required
                    error={errors[`skills[${catIndex}].category`]}
                  />
                  {cat.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex gap-4 mb-2 items-end">
                      <InputField
                        label="Skill Name"
                        name="name"
                        value={skill.name}
                        onChange={(e) =>
                          dispatch(
                            updateSkillInCategory({
                              catIndex,
                              skillIndex,
                              data: { name: e.target.value },
                            })
                          )
                        }
                        className="flex-1"
                        required
                        error={
                          errors[`skills[${catIndex}][${skillIndex}].name`]
                        }
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={`skill-level-${catIndex}-${skillIndex}`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Level
                        </label>
                        <select
                          id={`skill-level-${catIndex}-${skillIndex}`}
                          name="level"
                          value={skill.level || ""}
                          onChange={(e) =>
                            dispatch(
                              updateSkillInCategory({
                                catIndex,
                                skillIndex,
                                data: { level: e.target.value },
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
                        {errors[`skills[${catIndex}][${skillIndex}].level`] && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors[`skills[${catIndex}][${skillIndex}].level`]}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 text-sm"
                        onClick={() =>
                          dispatch(
                            removeSkillFromCategory({ catIndex, skillIndex })
                          )
                        }
                        aria-label={`Remove skill ${skillIndex + 1}`}
                      >
                        Remove Skill
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="mt-2 text-blue-500 hover:text-blue-700 text-sm"
                    onClick={() =>
                      dispatch(addSkillToCategory({ index: catIndex }))
                    }
                    aria-label={`Add skill to category ${cat.category}`}
                  >
                    Add Skill
                  </button>
                  <button
                    type="button"
                    className="mt-2 ml-4 text-red-500 hover:text-red-700 text-sm"
                    onClick={() => dispatch(removeSkillCategory(catIndex))}
                    aria-label={`Remove category ${cat.category}`}
                  >
                    Remove Category
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => dispatch(addSkillCategory())}
                aria-label="Add Skill Category"
              >
                Add Skill Category
              </button>
            </section>

            {/* References */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                References
              </h3>
              {resume.references.map((ref, index) => (
                <div key={index}>
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
                    <div className="text-red-500 text-sm mt-1">
                      {errors[`reference-${index}`]}
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => dispatch(addReference())}
                aria-label="Add Reference"
              >
                Add Reference
              </button>
            </section>

            {/* Form Actions */}
            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center"
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
                  "Save & Generate Resume"
                )}
              </button>
              {resumeId && (
                <button
                  type="button"
                  className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 disabled:bg-red-400 flex items-center"
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
                    "Delete Resume"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="lg:w-1/2">
          {/* <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Resume Preview</h2> */}
          <ResumePreview resume={resume} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResumeForm;
