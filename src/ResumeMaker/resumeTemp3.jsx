/* eslint-disable react/prop-types */

// Helper component for section titles for consistency
const SectionTitle = ({ children }) => (
  <h2 className="text-xl font-bold text-indigo-800 border-b-2 border-indigo-200 pb-2 mb-4">
    {children}
  </h2>
);

// Helper component for individual entries in sections like Experience, Education, etc.
const SectionEntry = ({ title, subtitle, date, children }) => (
  <div className="mb-6">
    <div className="flex justify-between items-baseline">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {date && <p className="text-sm font-medium text-indigo-700">{date}</p>}
    </div>
    {subtitle && <p className="text-md font-medium text-gray-700 italic">{subtitle}</p>}
    <div className="mt-2 text-sm text-gray-800 space-y-1.5">{children}</div>
  </div>
);

export default function ResumeTemp3({ resume }) {
  // Helper function to format address cleanly
  const formatAddress = (address) => {
    const parts = [address.street, address.city, address.country].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : '';
  };

  return (
    // Full-screen container with improved padding for better centering on various devices
    <div className="w-full bg-gray-50 flex items-center justify-center p-2 sm:p-8 lg:p-12 print:p-0 print:bg-white">

      {/* Wrapper for premium gradient border effect - Sized to mimic A4 page (8.27x11.69 inches) for print-friendly design */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-1 rounded-xl shadow-2xl w-full max-w-[8.27in] print:max-w-none print:shadow-none print:p-0 print:rounded-none">
        {/* Inner content with premium white background and subtle shadow */}
        <div className="w-full bg-white rounded-lg print:rounded-none">
         
          {/* Main content grid with relative positioning and z-index to overlay watermark */}
          <div className="grid grid-cols-1 md:grid-cols-12 relative z-10 print:grid-cols-12">
            {/* Left Sidebar - Enhanced with premium blur and subtle gradient */}
            <aside className="md:col-span-4 bg-gradient-to-b from-gray-50 to-gray-100/80 backdrop-blur-md p-6 border-r border-gray-200 print:backdrop-blur-none print:bg-gray-50">
              {/* Profile Picture - Improved border and shadow for premium feel */}
              {resume.personalInfo.profilePicture && (
                <div className="flex justify-center mb-6">
                  <img
                    src={resume.personalInfo.profilePicture}
                    alt="Profile"
                    className="w-36 h-36 object-cover rounded-full border-4 border-indigo-300 shadow-xl"
                  />
                </div>
              )}

              {/* Contact Section - Icons with premium color and hover effects */}
              <section className="mb-8">
                <SectionTitle>Contact</SectionTitle>
                <div className="space-y-4 text-sm text-gray-800">
                  {resume.personalInfo.emailAddress && (
                    <p className="flex items-center gap-3 hover:text-indigo-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      <span>{resume.personalInfo.emailAddress}</span>
                    </p>
                  )}
                  {resume.personalInfo.phoneNumber && (
                    <p className="flex items-center gap-3 hover:text-indigo-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      <span>{resume.personalInfo.phoneNumber}</span>
                    </p>
                  )}
                  {resume.personalInfo.address && formatAddress(resume.personalInfo.address) && (
                    <p className="flex items-start gap-3 hover:text-indigo-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span>{formatAddress(resume.personalInfo.address)}</span>
                    </p>
                  )}
                  {resume.personalInfo.linkedIn && (
                    <a href={resume.personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-indigo-600 hover:text-indigo-800 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                  {resume.personalInfo.portfolio && (
                    <a href={resume.personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-indigo-600 hover:text-indigo-800 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      <span>Portfolio</span>
                    </a>
                  )}
                </div>
              </section>

              {/* Skills Section - Enhanced with premium card design, better colors for readability */}
              {resume?.skills?.length > 0 && (
                <section className="bg-white/80 p-5 rounded-xl shadow-lg border border-gray-200">
                  <h2 className="text-xl font-semibold text-indigo-800 border-b border-indigo-200 pb-2 mb-3">
                    Skills
                  </h2>
                  <ul className="list-none text-sm text-gray-800 space-y-2">
                    {resume.skills.map((skill, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span className="font-medium">{skill.name || "Skill"}</span>
                        <span className="text-indigo-600 font-medium">{skill.level || "Level"}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </aside>

            {/* Right Main Content - Enhanced padding and text for premium readability */}
            <main className="md:col-span-8 p-8 bg-white/90 backdrop-blur-md print:backdrop-blur-none print:bg-white">
              {/* Header - Bolder and more premium typography */}
              <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                  {resume.personalInfo.firstName || "First"}{" "}
                  {resume.personalInfo.lastName || "Last"}
                </h1>
                {resume.personalInfo.professionalTitle && (
                  <p className="text-lg text-indigo-700 font-semibold mt-1">
                    {resume.personalInfo.professionalTitle}
                  </p>
                )}
              </header>

              {/* Career Summary/Objective - Improved line height and spacing */}
              {resume.careerSummary && (
                <section className="mb-8">
                  <SectionTitle>Career Summary</SectionTitle>
                  <p className="text-sm text-gray-800 leading-relaxed">{resume.careerSummary}</p>
                </section>
              )}
              {resume.careerObjective && (
                <section className="mb-8">
                  <SectionTitle>Career Objective</SectionTitle>
                  <p className="text-sm text-gray-800 leading-relaxed">{resume.careerObjective}</p>
                </section>
              )}

              {/* Work Experience - Bullet points with premium icons */}
              {resume.workExperience.length > 0 && (
                <section className="mb-8">
                  <SectionTitle>Work Experience</SectionTitle>
                  {resume.workExperience.map((exp, index) => (
                    <SectionEntry
                      key={index}
                      title={exp.position || "Position"}
                      subtitle={`${exp.companyName || "Company"} | ${exp.city || ""}, ${exp.country || ""}`}
                      date={`${exp.from || "Start"} - ${exp.to || "Present"}`}
                    >
                      {exp.description.length > 0 && (
                        <ul className="list-disc list-inside ml-2 space-y-1.5 marker:text-indigo-600">
                          {exp.description.map((desc, idx) => <li key={idx}>{desc}</li>)}
                        </ul>
                      )}
                    </SectionEntry>
                  ))}
                </section>
              )}

              {/* Education - Consistent formatting and premium details */}
              {resume?.education?.length > 0 && (
                <section className="mb-8">
                  <SectionTitle>Education</SectionTitle>
                  {resume.education.map((edu, index) => (
                    <SectionEntry
                      key={index}
                      title={edu.degree || "Degree"}
                      subtitle={`${edu.institutionName || "Institution"} | ${edu.city || ""}, ${edu.country || ""}`}
                      date={`${edu.from || "Start"} - ${edu.to || "End"}`}
                    >
                      <p className="font-medium"><strong>Field:</strong> {edu.fieldOfStudy || "Field of Study"}</p>
                      {edu.gpa && <p className="font-medium"><strong>GPA:</strong> {edu.gpa}</p>}
                      {edu.honors && <p className="font-medium"><strong>Honors:</strong> {edu.honors}</p>}
                      {Array.isArray(edu.description) && edu.description.length > 0 && (
                        <ul className="list-disc list-inside ml-2 space-y-1.5 mt-2 marker:text-indigo-600">
                          {edu.description.map((desc, idx) => (
                            <li key={idx}>{desc}</li>
                          ))}
                        </ul>
                      )}
                    </SectionEntry>
                  ))}
                </section>
              )}
              
              {/* Certifications & Trainings - Premium card-like entries */}
              {resume.certifications.length > 0 && (
                <section className="mb-8">
                  <SectionTitle>Certifications</SectionTitle>
                  {resume.certifications.map((cert, index) => (
                    <SectionEntry
                      key={index}
                      title={cert.name || "Certification Name"}
                      subtitle={cert.authority || "Issuing Authority"}
                      date={cert.date || "Date"}
                    >
                      {cert.urlCode && <a href={cert.urlCode} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">View Credential</a>}
                    </SectionEntry>
                  ))}
                </section>
              )}

              {resume.trainings.length > 0 && (
                <section className="mb-8">
                  <SectionTitle>Professional Trainings</SectionTitle>
                  {resume.trainings.map((train, index) => (
                    <SectionEntry
                      key={index}
                      title={train.name || "Training Name"}
                      subtitle={train.institution || "Institution"}
                      date={`${train.from || "Start"} - ${train.to || "End"}`}
                    >
                      <p className="font-medium"><strong>Duration:</strong> {train.duration || "N/A"}</p>
                      {train.description.length > 0 && (
                        <ul className="list-disc list-inside ml-2 space-y-1.5 mt-2 marker:text-indigo-600">
                          {train.description.map((desc, idx) => <li key={idx}>{desc}</li>)}
                        </ul>
                      )}
                    </SectionEntry>
                  ))}
                </section>
              )}

              {/* References - Grid with premium cards */}
              {resume.references.length > 0 && (
                <section>
                  <SectionTitle>References</SectionTitle>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resume.references.map((ref, index) => (
                      <div key={index} className="bg-gray-50 p-5 rounded-xl shadow-md border border-gray-200">
                        <h4 className="font-bold text-gray-900 text-lg">{ref.name || "Reference Name"}</h4>
                        <p className="text-sm text-gray-700 font-medium">{ref.position}, {ref.company}</p>
                        <p className="text-sm text-gray-800 mt-2">{ref.email && `Email: ${ref.email}`}</p>
                        <p className="text-sm text-gray-800">{ref.phone && `Phone: ${ref.phone}`}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </main>
          </div>

        </div>
      </div>
    </div>
  );
}