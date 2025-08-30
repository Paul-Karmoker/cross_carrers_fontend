/* eslint-disable react/prop-types */

export default function ResumePreview({ resume }) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200 h-full overflow-auto font-sans">
      {/* Header */}
      <div className="flex items-center border-b-2 border-gray-300 pb-4 mb-6">
        {/* Profile Picture */}
        {resume.personalInfo.profilePicture && (
          <div className="w-[100px] h-[100px]">
            <img
              src={resume.personalInfo.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover rounded-md border-1 border-gray-200"
            />
          </div>
        )}
        {/* Personal Info */}
        <div className="flex-1 pr-10 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {resume.personalInfo.firstName || "First Name"}{" "}
            {resume.personalInfo.lastName || "Last Name"}
          </h1>
          {resume.personalInfo.professionalTitle && (
            <p className="text-lg text-gray-600">
              {resume.personalInfo.professionalTitle}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            {resume.personalInfo.emailAddress && (
              <p>{resume.personalInfo.emailAddress}</p>
            )}
            {resume.personalInfo.phoneNumber && (
              <p>{resume.personalInfo.phoneNumber}</p>
            )}
            {resume.personalInfo.address && (
              <p>
                {resume.personalInfo.address.street &&
                  `${resume.personalInfo.address.street}, `}
                {resume.personalInfo.address.city &&
                  `${resume.personalInfo.address.city}, `}
                {resume.personalInfo.address.postal &&
                  `${resume.personalInfo.address.postal}, `}
                {resume.personalInfo.address.country}
              </p>
            )}
          </div>
          <div className="flex justify-center gap-4 text-sm text-blue-600">
            {resume.personalInfo.linkedIn && (
              <a
                href={resume.personalInfo.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
            )}
            {resume.personalInfo.portfolio && (
              <a
                href={resume.personalInfo.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Portfolio
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Career Objective */}
      {resume.careerObjective && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-2">
            Career Objective
          </h2>
          <p className="text-base text-gray-600 mt-3 leading-relaxed">
            {resume.careerObjective}
          </p>
        </section>
      )}

      {/* Career Summary */}
      {resume.careerSummary && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-2">
            Career Summary
          </h2>
          <p className="text-base text-gray-600 mt-3 leading-relaxed">
            {resume.careerSummary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {resume.workExperience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-2">
            Work Experience
          </h2>
          {resume.workExperience.map((exp, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-lg font-medium text-gray-800">
                {exp.position || "Position"} at {exp.companyName || "Company"}
              </h3>
              <p className="text-sm text-gray-500">
                {exp.city && `${exp.city}, `}
                {exp.country} | {exp.from || "Start Date"} -{" "}
                {exp.to || "Present"}
              </p>
              {exp.description.length > 0 && (
                <ul className="list-disc list-inside text-base text-gray-600 mt-2 space-y-1">
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
      {Array.isArray(resume.education) && resume.education.length > 0 && (
  <section className="mb-8">
    <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-2">
      Education
    </h2>
    {resume.education.map((edu, index) => (
      <div key={index} className="mt-4">
        <h3 className="text-lg font-medium text-gray-800">
          {edu.degree || "Degree"} in {edu.fieldOfStudy || "Field of Study"}
        </h3>
        <p className="text-sm text-gray-500">
          {edu.institutionName || "Institution"}
          {edu.city ? `, ${edu.city}` : ""}
          {edu.country ? `, ${edu.country}` : ""}
          {edu.passingYear ? ` | ${edu.passingYear}` : ""}
        </p>
        {edu.gpa && (
          <p className="text-base text-gray-600 mt-1">GPA: {edu.gpa}</p>
        )}
        {edu.honors && (
          <p className="text-base text-gray-600 mt-1">Honors: {edu.honors}</p>
        )}
      </div>
    ))}
  </section>
)}


      {/* Trainings */}
      {resume.trainings.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-2">
            Trainings
          </h2>
          {resume.trainings.map((train, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-lg font-medium text-gray-800">
                {train.name || "Training Name"},{" "}
                {train.institution || "Institution"}
              </h3>
              <p className="text-sm text-gray-500">
                Duration: {train.duration || "Duration"} |{" "}
                {train.from || "Start Date"} - {train.to || "End Date"}
              </p>
              {train.description.length > 0 && (
                <ul className="list-disc list-inside text-base text-gray-600 mt-2 space-y-1">
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
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-2">
            Certifications
          </h2>
          {resume.certifications.map((cert, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-lg font-medium text-gray-800">
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
                    className="hover:underline"
                  >
                    URL/Code
                  </a>
                </p>
              )}
              {cert.description.length > 0 && (
                <ul className="list-disc list-inside text-base text-gray-600 mt-2 space-y-1">
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
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-2">
            Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {resume.skills.map((skill, index) => (
              <div key={index} className="text-base text-gray-600">
                • {skill.name || "Skill"} - {skill.level || "Level"}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {resume.references.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-2">
            References
          </h2>
          {resume.references.map((ref, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-lg font-medium text-gray-800">
                {ref.name || "Name"}, {ref.position || "Position"} at{" "}
                {ref.company || "Company"}
              </h3>
              <p className="text-sm text-gray-500">
                {ref.phone && `Phone: ${ref.phone}, `}
                {ref.email && `Email: ${ref.email}`}
              </p>
              {ref.relationship && (
                <p className="text-base text-gray-600 mt-1">
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