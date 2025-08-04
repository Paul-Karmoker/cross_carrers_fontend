// src/components/ResumeForm.js
import 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateResumeMutation } from '../context/resumeApi.js';
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
} from '../context/resumeSlice'; // Correct import path
import InputField from "../Components/InputField.jsx"; // Adjusted path (relative to src/components)
import jsPDF from 'jspdf';

const ResumeForm = () => {
  const resume = useSelector((state) => state.resume);
  const dispatch = useDispatch();
  const [createResume, { isLoading: isSubmitting }] = useCreateResumeMutation();

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    dispatch(updatePersonalInfo({ [name]: value }));
  };

  const handleAddressChange = (e, addrType) => {
    const { name, value } = e.target;
    dispatch(updatePersonalInfo({ [addrType]: { ...resume.personalInfo[addrType], [name]: value } }));
  };

  const handleSectionUpdate = (section, index, e) => {
    const { name, value } = e.target;
    dispatch(section({ index, data: { [name]: value } }));
  };

  const handleSectionCheckbox = (section, index, e) => {
    const { name, checked } = e.target;
    dispatch(section({ index, data: { [name]: checked } }));
  };

  const handleAddDesc = (addAction, index) => dispatch(addAction({ index }));

  const handleUpdateDesc = (updateAction, sectionIndex, descIndex, e) => {
    dispatch(updateAction({ [`${sectionIndex}Index`]: sectionIndex, descIndex, value: e.target.value }));
  };

  const handleRemoveDesc = (removeAction, sectionIndex, descIndex) => {
    dispatch(removeAction({ [`${sectionIndex}Index`]: sectionIndex, descIndex }));
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();
    let yPos = 20;

    const addText = (text, x, y, options = {}) => {
      doc.text(text, x, y, options);
      return y + (options.lineHeight || 5);
    };

    const checkPage = () => {
      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }
    };

    doc.setFont('helvetica', 'bold');
    yPos = addText(`${data.personalInfo.firstName} ${data.personalInfo.lastName}`, 20, yPos, { lineHeight: 10 });
    doc.setFont('helvetica', 'normal');
    yPos = addText(data.personalInfo.professionalTitle, 20, yPos);
    yPos = addText(`${data.personalInfo.emailAddress} | ${data.personalInfo.phoneNumber}`, 20, yPos);
    yPos = addText(`${data.personalInfo.address.street}, ${data.personalInfo.address.city}, ${data.personalInfo.address.postal}, ${data.personalInfo.address.country}`, 20, yPos);
    if (data.personalInfo.linkedIn) yPos = addText(`LinkedIn: ${data.personalInfo.linkedIn}`, 20, yPos);
    if (data.personalInfo.portfolio) yPos = addText(`Portfolio: ${data.personalInfo.portfolio}`, 20, yPos);
    checkPage();

    doc.setFont('helvetica', 'bold');
    yPos = addText('Career Objective', 20, yPos, { lineHeight: 10 });
    doc.setFont('helvetica', 'normal');
    yPos = addText(data.careerObjective, 20, yPos, { maxWidth: 170, lineHeight: 7 });
    checkPage();

    doc.setFont('helvetica', 'bold');
    yPos = addText('Career Summary', 20, yPos, { lineHeight: 10 });
    doc.setFont('helvetica', 'normal');
    yPos = addText(data.careerSummary, 20, yPos, { maxWidth: 170, lineHeight: 7 });
    checkPage();

    doc.setFont('helvetica', 'bold');
    yPos = addText('Work Experience', 20, yPos, { lineHeight: 10 });
    doc.setFont('helvetica', 'normal');
    data.workExperience.forEach((exp) => {
      checkPage();
      yPos = addText(`${exp.position} at ${exp.companyName}, ${exp.city}, ${exp.country}`, 20, yPos);
      yPos = addText(`${exp.from} - ${exp.to || 'Present'}`, 20, yPos);
      exp.description.forEach((desc) => {
        yPos = addText(`• ${desc}`, 25, yPos, { maxWidth: 160 });
        checkPage();
      });
      yPos += 5;
    });
    checkPage();

    doc.setFont('helvetica', 'bold');
    yPos = addText('Education', 20, yPos, { lineHeight: 10 });
    doc.setFont('helvetica', 'normal');
    data.education.forEach((edu) => {
      checkPage();
      yPos = addText(`${edu.degree} in ${edu.fieldOfStudy}, ${edu.institutionName}, ${edu.city}, ${edu.country}`, 20, yPos);
      yPos = addText(`${edu.from} - ${edu.to || 'Present'}`, 20, yPos);
      if (edu.gpa) yPos = addText(`GPA: ${edu.gpa}`, 20, yPos);
      if (edu.honors) yPos = addText(`Honors: ${edu.honors}`, 20, yPos);
      edu.description.forEach((desc) => {
        yPos = addText(`• ${desc}`, 25, yPos, { maxWidth: 160 });
        checkPage();
      });
      yPos += 5;
    });
    checkPage();

    doc.setFont('helvetica', 'bold');
    yPos = addText('Trainings', 20, yPos, { lineHeight: 10 });
    doc.setFont('helvetica', 'normal');
    data.trainings.forEach((train) => {
      checkPage();
      yPos = addText(`${train.name}, ${train.institution}`, 20, yPos);
      yPos = addText(`Duration: ${train.duration}, ${train.from} - ${train.to}`, 20, yPos);
      train.description.forEach((desc) => {
        yPos = addText(`• ${desc}`, 25, yPos, { maxWidth: 160 });
        checkPage();
      });
      yPos += 5;
    });
    checkPage();

    doc.setFont('helvetica', 'bold');
    yPos = addText('Certifications', 20, yPos, { lineHeight: 10 });
    doc.setFont('helvetica', 'normal');
    data.certifications.forEach((cert) => {
      checkPage();
      yPos = addText(`${cert.name}, ${cert.authority}`, 20, yPos);
      yPos = addText(`Date: ${cert.date}`, 20, yPos);
      if (cert.urlCode) yPos = addText(`URL: ${cert.urlCode}`, 20, yPos);
      cert.description.forEach((desc) => {
        yPos = addText(`• ${desc}`, 25, yPos, { maxWidth: 160 });
        checkPage();
      });
      yPos += 5;
    });
    checkPage();

    doc.setFont('helvetica', 'bold');
    yPos = addText('Skills', 20, yPos, { lineHeight: 10 });
    doc.setFont('helvetica', 'normal');
    data.skills.forEach((cat) => {
      checkPage();
      yPos = addText(cat.category, 20, yPos);
      cat.skills.forEach((skill) => {
        yPos = addText(`• ${skill.name} - ${skill.level}`, 25, yPos);
        checkPage();
      });
      yPos += 5;
    });
    checkPage();

    doc.setFont('helvetica', 'bold');
    yPos = addText('References', 20, yPos, { lineHeight: 10 });
    doc.setFont('helvetica', 'normal');
    data.references.forEach((ref) => {
      checkPage();
      yPos = addText(`${ref.name}, ${ref.position} at ${ref.company}`, 20, yPos);
      yPos = addText(`Phone: ${ref.phone}, Email: ${ref.email}`, 20, yPos);
      yPos = addText(`Relationship: ${ref.relationship}`, 20, yPos);
      yPos += 5;
    });

    doc.save('resume.pdf');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createResume(resume).unwrap();
      console.log('Resume submitted:', response);
      generatePDF(resume);
    } catch (error) {
      console.error('Error submitting resume:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Resume Builder</h2>

      {/* Personal Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="First Name" name="firstName" value={resume.personalInfo.firstName} onChange={handlePersonalChange} />
          <InputField label="Last Name" name="lastName" value={resume.personalInfo.lastName} onChange={handlePersonalChange} />
          <InputField label="Professional Title" name="professionalTitle" value={resume.personalInfo.professionalTitle} onChange={handlePersonalChange} />
          <InputField label="Phone Number" name="phoneNumber" value={resume.personalInfo.phoneNumber} onChange={handlePersonalChange} />
          <InputField label="Email Address" name="emailAddress" value={resume.personalInfo.emailAddress} onChange={handlePersonalChange} />
          <InputField label="Skype" name="skype" value={resume.personalInfo.skype} onChange={handlePersonalChange} />
          <InputField label="LinkedIn" name="linkedIn" value={resume.personalInfo.linkedIn} onChange={handlePersonalChange} />
          <InputField label="Portfolio" name="portfolio" value={resume.personalInfo.portfolio} onChange={handlePersonalChange} />
          <InputField label="Profile Picture URL" name="profilePicture" value={resume.personalInfo.profilePicture} onChange={handlePersonalChange} />
          <InputField label="Father's Name" name="fatherName" value={resume.personalInfo.fatherName} onChange={handlePersonalChange} />
          <InputField label="Mother's Name" name="motherName" value={resume.personalInfo.motherName} onChange={handlePersonalChange} />
          <InputField label="Spouse's Name" name="spouseName" value={resume.personalInfo.spouseName} onChange={handlePersonalChange} />
          <InputField label="NID" name="nid" value={resume.personalInfo.nid} onChange={handlePersonalChange} />
          <InputField label="Passport" name="passport" value={resume.personalInfo.passport} onChange={handlePersonalChange} />
        </div>
        <h4 className="text-md font-medium mt-4 mb-2">Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Street" name="street" value={resume.personalInfo.address.street} onChange={(e) => handleAddressChange(e, 'address')} />
          <InputField label="City" name="city" value={resume.personalInfo.address.city} onChange={(e) => handleAddressChange(e, 'address')} />
          <InputField label="Postal" name="postal" value={resume.personalInfo.address.postal} onChange={(e) => handleAddressChange(e, 'address')} />
          <InputField label="Country" name="country" value={resume.personalInfo.address.country} onChange={(e) => handleAddressChange(e, 'address')} />
        </div>
        <h4 className="text-md font-medium mt-4 mb-2">Permanent Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Street" name="street" value={resume.personalInfo.permanentAddress.street} onChange={(e) => handleAddressChange(e, 'permanentAddress')} />
          <InputField label="City" name="city" value={resume.personalInfo.permanentAddress.city} onChange={(e) => handleAddressChange(e, 'permanentAddress')} />
          <InputField label="Postal" name="postal" value={resume.personalInfo.permanentAddress.postal} onChange={(e) => handleAddressChange(e, 'permanentAddress')} />
          <InputField label="Country" name="country" value={resume.personalInfo.permanentAddress.country} onChange={(e) => handleAddressChange(e, 'permanentAddress')} />
        </div>
      </div>

      {/* Career Objective and Summary */}
      <div className="mb-8">
        <InputField label="Career Objective" type="textarea" value={resume.careerObjective} onChange={(e) => dispatch(updateCareerObjective(e.target.value))} />
        <InputField label="Career Summary" type="textarea" value={resume.careerSummary} onChange={(e) => dispatch(updateCareerSummary(e.target.value))} />
      </div>

      {/* Work Experience */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
        {resume.workExperience.map((exp, index) => (
          <div key={index} className="border p-4 mb-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Company Name" name="companyName" value={exp.companyName} onChange={(e) => handleSectionUpdate(updateWorkExperience, index, e)} />
              <InputField label="Position" name="position" value={exp.position} onChange={(e) => handleSectionUpdate(updateWorkExperience, index, e)} />
              <InputField label="City" name="city" value={exp.city} onChange={(e) => handleSectionUpdate(updateWorkExperience, index, e)} />
              <InputField label="Country" name="country" value={exp.country} onChange={(e) => handleSectionUpdate(updateWorkExperience, index, e)} />
              <InputField label="From" name="from" type="date" value={exp.from} onChange={(e) => handleSectionUpdate(updateWorkExperience, index, e)} />
              <InputField label="To" name="to" type="date" value={exp.to} onChange={(e) => handleSectionUpdate(updateWorkExperience, index, e)} />
            </div>
            <label className="flex items-center mt-2">
              <input type="checkbox" name="currentlyWorking" checked={exp.currentlyWorking} onChange={(e) => handleSectionCheckbox(updateWorkExperience, index, e)} />
              <span className="ml-2">Currently Working</span>
            </label>
            <h4 className="text-md font-medium mt-4 mb-2">Description</h4>
            {exp.description.map((desc, dIndex) => (
              <div key={dIndex} className="flex items-center mb-2">
                <InputField
                  value={desc}
                  onChange={(e) => handleUpdateDesc(updateDescriptionToWork, index, dIndex, e)}
                  className="flex-1"
                />
                <button type="button" className="ml-2 text-red-500" onClick={() => handleRemoveDesc(removeDescriptionFromWork, index, dIndex)}>Remove</button>
              </div>
            ))}
            <button type="button" className="mt-2 text-blue-500" onClick={() => handleAddDesc(addDescriptionToWork, index)}>Add Description</button>
            <button type="button" className="mt-2 ml-4 text-red-500" onClick={() => dispatch(removeWorkExperience(index))}>Remove Experience</button>
          </div>
        ))}
        <button type="button" className="text-blue-600" onChange={() => dispatch(addWorkExperience())}>Add Work Experience</button>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Education</h3>
        {resume.education.map((edu, index) => (
          <div key={index} className="border p-4 mb-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Institution Name" name="institutionName" value={edu.institutionName} onChange={(e) => handleSectionUpdate(updateEducation, index, e)} />
              <InputField label="Field of Study" name="fieldOfStudy" value={edu.fieldOfStudy} onChange={(e) => handleSectionUpdate(updateEducation, index, e)} />
              <InputField label="Degree" name="degree" value={edu.degree} onChange={(e) => handleSectionUpdate(updateEducation, index, e)} />
              <InputField label="City" name="city" value={edu.city} onChange={(e) => handleSectionUpdate(updateEducation, index, e)} />
              <InputField label="Country" name="country" value={edu.country} onChange={(e) => handleSectionUpdate(updateEducation, index, e)} />
              <InputField label="From" name="from" type="date" value={edu.from} onChange={(e) => handleSectionUpdate(updateEducation, index, e)} />
              <InputField label="To" name="to" type="date" value={edu.to} onChange={(e) => handleSectionUpdate(updateEducation, index, e)} />
              <InputField label="GPA" name="gpa" value={edu.gpa} onChange={(e) => handleSectionUpdate(updateEducation, index, e)} />
              <InputField label="Honors" name="honors" value={edu.honors} onChange={(e) => handleSectionUpdate(updateEducation, index, e)} />
            </div>
            <label className="flex items-center mt-2">
              <input type="checkbox" name="currentlyStudying" checked={edu.currentlyStudying} onChange={(e) => handleSectionCheckbox(updateEducation, index, e)} />
              <span className="ml-2">Currently Studying</span>
            </label>
            <h4 className="text-md font-medium mt-4 mb-2">Description</h4>
            {edu.description.map((desc, dIndex) => (
              <div key={dIndex} className="flex items-center mb-2">
                <InputField
                  value={desc}
                  onChange={(e) => handleUpdateDesc(updateDescriptionToEducation, index, dIndex, e)}
                  className="flex-1"
                />
                <button type="button" className="ml-2 text-red-500" onClick={() => handleRemoveDesc(removeDescriptionFromEducation, index, dIndex)}>Remove</button>
              </div>
            ))}
            <button type="button" className="mt-2 text-blue-500" onClick={() => handleAddDesc(addDescriptionToEducation, index)}>Add Description</button>
            <button type="button" className="mt-2 ml-4 text-red-500" onClick={() => dispatch(removeEducation(index))}>Remove Education</button>
          </div>
        ))}
        <button type="button" className="text-blue-600" onClick={() => dispatch(addEducation())}>Add Education</button>
      </div>

      {/* Trainings */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Trainings</h3>
        {resume.trainings.map((train, index) => (
          <div key={index} className="border p-4 mb-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Name" name="name" value={train.name} onChange={(e) => handleSectionUpdate(updateTraining, index, e)} />
              <InputField label="Institution" name="institution" value={train.institution} onChange={(e) => handleSectionUpdate(updateTraining, index, e)} />
              <InputField label="Duration" name="duration" value={train.duration} onChange={(e) => handleSectionUpdate(updateTraining, index, e)} />
              <InputField label="From" name="from" type="date" value={train.from} onChange={(e) => handleSectionUpdate(updateTraining, index, e)} />
              <InputField label="To" name="to" type="date" value={train.to} onChange={(e) => handleSectionUpdate(updateTraining, index, e)} />
            </div>
            <h4 className="text-md font-medium mt-4 mb-2">Description</h4>
            {train.description.map((desc, dIndex) => (
              <div key={dIndex} className="flex items-center mb-2">
                <InputField
                  value={desc}
                  onChange={(e) => handleUpdateDesc(updateDescriptionToTraining, index, dIndex, e)}
                  className="flex-1"
                />
                <button type="button" className="ml-2 text-red-500" onClick={() => handleRemoveDesc(removeDescriptionFromTraining, index, dIndex)}>Remove</button>
              </div>
            ))}
            <button type="button" className="mt-2 text-blue-500" onClick={() => handleAddDesc(addDescriptionToTraining, index)}>Add Description</button>
            <button type="button" className="mt-2 ml-4 text-red-500" onClick={() => dispatch(removeTraining(index))}>Remove Training</button>
          </div>
        ))}
        <button type="button" className="text-blue-600" onClick={() => dispatch(addTraining())}>Add Training</button>
      </div>

      {/* Certifications */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Certifications</h3>
        {resume.certifications.map((cert, index) => (
          <div key={index} className="border p-4 mb-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Name" name="name" value={cert.name} onChange={(e) => handleSectionUpdate(updateCertification, index, e)} />
              <InputField label="Authority" name="authority" value={cert.authority} onChange={(e) => handleSectionUpdate(updateCertification, index, e)} />
              <InputField label="URL/Code" name="urlCode" value={cert.urlCode} onChange={(e) => handleSectionUpdate(updateCertification, index, e)} />
              <InputField label="Date" name="date" type="date" value={cert.date} onChange={(e) => handleSectionUpdate(updateCertification, index, e)} />
            </div>
            <h4 className="text-md font-medium mt-4 mb-2">Description</h4>
            {cert.description.map((desc, dIndex) => (
              <div key={dIndex} className="flex items-center mb-2">
                <InputField
                  value={desc}
                  onChange={(e) => handleUpdateDesc(updateDescriptionToCertification, index, dIndex, e)}
                  className="flex-1"
                />
                <button type="button" className="ml-2 text-red-500" onClick={() => handleRemoveDesc(removeDescriptionFromCertification, index, dIndex)}>Remove</button>
              </div>
            ))}
            <button type="button" className="mt-2 text-blue-500" onClick={() => handleAddDesc(addDescriptionToCertification, index)}>Add Description</button>
            <button type="button" className="mt-2 ml-4 text-red-500" onClick={() => dispatch(removeCertification(index))}>Remove Certification</button>
          </div>
        ))}
        <button type="button" className="text-blue-600" onClick={() => dispatch(addCertification())}>Add Certification</button>
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Skills</h3>
        {resume.skills.map((cat, catIndex) => (
          <div key={catIndex} className="border p-4 mb-4 rounded-md">
            <InputField label="Category" name="category" value={cat.category} onChange={(e) => dispatch(updateSkillCategory({ index: catIndex, category: e.target.value }))} />
            {cat.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="flex gap-4 mb-2">
                <InputField label="Skill Name" name="name" value={skill.name} onChange={(e) => dispatch(updateSkillInCategory({ catIndex, skillIndex, data: { name: e.target.value } }))} className="flex-1" />
                <InputField label="Level" name="level" value={skill.level} onChange={(e) => dispatch(updateSkillInCategory({ catIndex, skillIndex, data: { level: e.target.value } }))} className="flex-1" />
                <button type="button" className="text-red-500 self-end" onClick={() => dispatch(removeSkillFromCategory({ catIndex, skillIndex }))}>Remove Skill</button>
              </div>
            ))}
            <button type="button" className="mt-2 text-blue-500" onClick={() => dispatch(addSkillToCategory({ index: catIndex }))}>Add Skill</button>
            <button type="button" className="mt-2 ml-4 text-red-500" onClick={() => dispatch(removeSkillCategory(catIndex))}>Remove Category</button>
          </div>
        ))}
        <button type="button" className="text-blue-600" onClick={() => dispatch(addSkillCategory())}>Add Skill Category</button>
      </div>

      {/* References */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">References</h3>
        {resume.references.map((ref, index) => (
          <div key={index} className="border p-4 mb-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Name" name="name" value={ref.name} onChange={(e) => handleSectionUpdate(updateReference, index, e)} />
              <InputField label="Position" name="position" value={ref.position} onChange={(e) => handleSectionUpdate(updateReference, index, e)} />
              <InputField label="Company" name="company" value={ref.company} onChange={(e) => handleSectionUpdate(updateReference, index, e)} />
              <InputField label="Phone" name="phone" value={ref.phone} onChange={(e) => handleSectionUpdate(updateReference, index, e)} />
              <InputField label="Email" name="email" value={ref.email} onChange={(e) => handleSectionUpdate(updateReference, index, e)} />
              <InputField label="Relationship" name="relationship" value={ref.relationship} onChange={(e) => handleSectionUpdate(updateReference, index, e)} />
            </div>
            <button type="button" className="mt-2 text-red-500" onClick={() => dispatch(removeReference(index))}>Remove Reference</button>
          </div>
        ))}
        <button type="button" className="text-blue-600" onClick={() => dispatch(addReference())}>Add Reference</button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
      >
        {isSubmitting ? 'Generating...' : 'Generate Resume'}
      </button>
    </form>
  );
};

export default ResumeForm;