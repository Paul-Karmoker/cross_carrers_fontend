/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { asBlob } from 'html-to-docx';
import { saveAs } from 'file-saver';
import { Download, Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Star, Award, Wrench, UserCheck } from 'lucide-react';
export default function ResumeFormPreview({ resume }) {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full overflow-auto">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-4 mb-4">
        {resume.personalInfo.profilePicture && (
          <div className="mb-4 flex justify-center">
            <img
              src={resume.personalInfo.profilePicture}
              alt="Profile Picture"
              className="w-24 h-24 object-cover rounded-full border-2 border-indigo-500 shadow-md"
            />
          </div>
        )}
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
}
