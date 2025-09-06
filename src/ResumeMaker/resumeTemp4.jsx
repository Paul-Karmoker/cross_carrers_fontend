/* eslint-disable react/prop-types */

export default function ResumeFormPreview({ resume }) {
  return (
    <div className="w-full bg-white font-sans text-gray-800 shadow-lg h-full overflow-auto">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-blue-700 text-white p-6 flex flex-col items-center">
          {/* Profile Picture */}
          <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden mt-8 mb-6">
            {resume.personalInfo.profilePicture ? (
              <img
                src={resume.personalInfo.profilePicture}
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-5xl font-bold">
                RH
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="w-full text-center mt-6">
            <h2 className="text-xl font-bold uppercase tracking-wide mb-4 border-b border-white pb-2">
              Contact
            </h2>
            <div className="flex flex-col items-center space-y-2 text-sm">
              {resume.personalInfo.phoneNumber && (
                <p className="flex items-center">
                  <i className="fas fa-phone mr-2"></i>{" "}
                  {resume.personalInfo.phoneNumber}
                </p>
              )}
              {resume.personalInfo.emailAddress && (
                <p className="flex items-center">
                  <i className="fas fa-envelope mr-2"></i>{" "}
                  {resume.personalInfo.emailAddress}
                </p>
              )}
              {resume.personalInfo.address?.street && (
                <p className="flex items-center text-center">
                  <i className="fas fa-map-marker-alt mr-2"></i>{" "}
                  {resume.personalInfo.address.street},{" "}
                  {resume.personalInfo.address.city},{" "}
                  {resume.personalInfo.address.country}
                </p>
              )}
              {resume.personalInfo.linkedIn && (
                <p className="flex items-center">
                  <i className="fab fa-linkedin mr-2"></i>{" "}
                  <a
                    href={resume.personalInfo.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                </p>
              )}
              {resume.personalInfo.portfolio && (
                <p className="flex items-center">
                  <i className="fas fa-globe mr-2"></i>{" "}
                  <a
                    href={resume.personalInfo.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Portfolio
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Expertise/Skills Section */}
          {resume.skills?.length > 0 && (
            <div className="w-full mt-8">
              <h2 className="text-xl font-bold uppercase tracking-wide mb-4 border-b border-white pb-2">
                Expertise
              </h2>
              <div className="space-y-3">
                {resume.skills.map((skill, index) => (
                  <div key={index}>
                    <p className="text-sm">{skill.name || "Skill Name"}</p>
                    <div className="w-full bg-blue-500 h-2 rounded-full mt-1">
                      <div
                        className="bg-white h-2 rounded-full"
                        style={{ width: `${(skill.level / 5) * 100 || 0}%` }} // Assuming level is 1-5
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {resume.references.length > 0 && (
            <div className="w-full mt-8">
              <h2 className="text-xl font-bold uppercase tracking-wide mb-4 border-b border-white pb-2">
                References
              </h2>
              <p className="text-sm">Available on request.</p>
            </div>
          )}
        </div>

        {/* Right Content Area */}
        <div className="w-2/3 p-10">
          {/* Name and Title */}
          <div className="mb-8 pb-4 border-b-2 border-gray-300">
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
              {resume.personalInfo.firstName || "Robert"}{" "}
              {resume.personalInfo.lastName || "Hopkins"}
            </h1>
            <h2 className="text-xl text-gray-600 mt-2">
              {resume.personalInfo.professionalTitle || "Job Title"}
            </h2>
          </div>

          {/* Career Objective / Summary */}
          {resume.careerObjective && (
            <section className="mb-8">
              <h3 className="text-lg font-bold text-blue-700 uppercase tracking-wide mb-3 pb-1 border-b border-gray-300">
                Career Objective
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                {resume.careerObjective}
              </p>
            </section>
          )}

          {resume.careerSummary && (
            <section className="mb-8">
              <h3 className="text-lg font-bold text-blue-700 uppercase tracking-wide mb-3 pb-1 border-b border-gray-300">
                Career Summary
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                {resume.careerSummary}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {resume.workExperience.length > 0 && (
            <section className="mb-8">
              <h3 className="text-lg font-bold text-blue-700 uppercase tracking-wide mb-3 pb-1 border-b border-gray-300">
                Career
              </h3>
              {resume.workExperience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-md font-semibold text-gray-800">
                      {exp.companyName || "Company Name"} -{" "}
                      {exp.position || "Job Title"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {exp.from || "Start Date"} - {exp.to || "Present"}
                    </p>
                  </div>
                  {exp.city && (
                    <p className="text-sm text-gray-600 mb-2">
                      {exp.city}, {exp.country}
                    </p>
                  )}
                  {exp.description.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
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
          {resume.education?.length > 0 && (
            <section className="mb-8">
              <h3 className="text-lg font-bold text-blue-700 uppercase tracking-wide mb-3 pb-1 border-b border-gray-300">
                Education
              </h3>
              {resume.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-md font-semibold text-gray-800">
                      {edu.degree || "Degree"} in{" "}
                      {edu.fieldOfStudy || "Field of Study"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {edu.from || "Start Date"} - {edu.to || "Present"}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {edu.institutionName || "Institution"},{" "}
                    {edu.city && `${edu.city}, `}
                    {edu.country}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                  {edu.honors && (
                    <p className="text-sm text-gray-600">Honors: {edu.honors}</p>
                  )}
                  {Array.isArray(edu.description) &&
                    edu.description.length > 0 && (
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
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
            <section className="mb-8">
              <h3 className="text-lg font-bold text-blue-700 uppercase tracking-wide mb-3 pb-1 border-b border-gray-300">
                Trainings
              </h3>
              {resume.trainings.map((train, index) => (
                <div key={index} className="mb-4">
                  <h4 className="text-md font-semibold text-gray-800">
                    {train.name || "Training Name"},{" "}
                    {train.institution || "Institution"}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Duration: {train.duration || "Duration"} |{" "}
                    {train.from || "Start Date"} - {train.to || "End Date"}
                  </p>
                  {train.description.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
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
              <h3 className="text-lg font-bold text-blue-700 uppercase tracking-wide mb-3 pb-1 border-b border-gray-300">
                Certifications
              </h3>
              {resume.certifications.map((cert, index) => (
                <div key={index} className="mb-4">
                  <h4 className="text-md font-semibold text-gray-800">
                    {cert.name || "Certification Name"},{" "}
                    {cert.authority || "Authority"}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
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
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                      {cert.description.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}