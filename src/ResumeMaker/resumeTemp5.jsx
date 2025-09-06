/* eslint-disable react/prop-types */

export default function ResumeTemplate({ resume }) {
  const defaultProfilePicture = 'https://via.placeholder.com/150'; // Default placeholder image

  return (
    <div className="flex bg-gray-100 min-h-screen text-gray-800">
      {/* Left Column */}
      <div className="w-1/3 bg-blue-700 text-white p-8 flex flex-col items-center">
        {/* Profile Picture */}
        <div className="mb-6">
          <img
            src={resume.personalInfo.profilePicture || defaultProfilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>

        {/* Name and Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-1">
            {resume.personalInfo.firstName || "Lorna"}{" "}
            {resume.personalInfo.lastName || "Alvarado"}
          </h1>
          <p className="text-lg font-light opacity-90">
            {resume.personalInfo.professionalTitle || "Marketing Manager"}
          </p>
        </div>

        {/* Contact */}
        <div className="w-full mb-8">
          <h2 className="text-xl font-semibold border-b-2 border-white pb-2 mb-4">
            Contact
          </h2>
          <div className="flex items-center mb-2">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
              ></path>
            </svg>
            <p className="text-sm">
              {resume.personalInfo.phoneNumber || "+123-456-7890"}
            </p>
          </div>
          <div className="flex items-center mb-2">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            <p className="text-sm">
              {resume.personalInfo.emailAddress || "hello@reallygreatsite.com"}
            </p>
          </div>
          <div className="flex items-start mb-2">
            <svg
              className="w-5 h-5 mr-3 mt-1 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <p className="text-sm">
              {resume.personalInfo.address.street || "123 Anywhere St."}
              {resume.personalInfo.address.street && ", "}
              {resume.personalInfo.address.city || "Any City"}
              {resume.personalInfo.address.city && ", "}
              {resume.personalInfo.address.postal || "ST 12345"}
              {resume.personalInfo.address.country && `, ${resume.personalInfo.address.country}`}
            </p>
          </div>
          {resume.personalInfo.linkedIn && (
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 110-4 2 2 0 010 4z"></path>
              </svg>
              <a href={resume.personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="text-sm underline">LinkedIn</a>
            </div>
          )}
          {resume.personalInfo.portfolio && (
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              <a href={resume.personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="text-sm underline">Portfolio</a>
            </div>
          )}
        </div>

        {/* About Me */}
        {(resume.careerObjective || resume.careerSummary) && (
          <div className="w-full mb-8">
            <h2 className="text-xl font-semibold border-b-2 border-white pb-2 mb-4">
              About Me
            </h2>
            <p className="text-sm font-light text-justify">
              {resume.careerObjective || resume.careerSummary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
            </p>
          </div>
        )}


        {/* Skills */}
        {resume?.skills?.length > 0 && (
          <div className="w-full mb-8">
            <h2 className="text-xl font-semibold border-b-2 border-white pb-2 mb-4">
              Skills
            </h2>
            <ul className="list-none pl-0">
              {resume.skills.map((skill, index) => (
                <li key={index} className="flex items-center mb-1 text-sm">
                  <svg
                    className="w-3 h-3 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {skill.name || "Skill Name"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="w-2/3 p-8 bg-white">
        {/* Education */}
        {resume?.education?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
              <svg
                className="w-7 h-7 mr-3 text-blue-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
              Education
            </h2>
            {resume.education.map((edu, index) => (
              <div key={index} className="mb-4 pl-3 border-l-2 border-blue-200">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {edu.degree || "Bachelor of Business Management"} in{" "}
                    {edu.fieldOfStudy || "Field of Study"}
                  </h3>
                  <span className="text-sm text-gray-500 flex-shrink-0 ml-4">
                    {edu.from || "2016"} - {edu.to || "2020"}
                  </span>
                </div>
                <p className="text-md text-gray-600 mb-1">
                  {edu.institutionName || "Borcelle University"}
                </p>
                <p className="text-sm text-gray-600">
                  {Array.isArray(edu.description) && edu.description.length > 0 ? (
                    edu.description[0]
                  ) : (
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec risus egestas accumsan. In enim nunc, tincidunt ut quam eget, luctus sollicitudin neque. Sed leo nisl, semper ac hendrerit a, sollicitudin in arcu."
                  )}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Work Experience */}
        {resume.workExperience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
              <svg
                className="w-7 h-7 mr-3 text-blue-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              Experience
            </h2>
            {resume.workExperience.map((exp, index) => (
              <div key={index} className="mb-4 pl-3 border-l-2 border-blue-200">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {exp.position || "Product Design Manager"} at{" "}
                    {exp.companyName || "Arowwai Industries"}
                  </h3>
                  <span className="text-sm text-gray-500 flex-shrink-0 ml-4">
                    {exp.from || "2016"} - {exp.to || "2020"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {exp.description.length > 0 ? (
                    exp.description[0]
                  ) : (
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec risus egestas accumsan. In enim nunc, tincidunt ut quam eget, luctus sollicitudin neque. Sed leo nisl, semper ac hendrerit a, sollicitudin in arcu."
                  )}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Trainings */}
        {resume.trainings.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
              <svg
                className="w-7 h-7 mr-3 text-blue-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
              Trainings
            </h2>
            {resume.trainings.map((train, index) => (
              <div key={index} className="mb-4 pl-3 border-l-2 border-blue-200">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {train.name || "Training Name"},{" "}
                    {train.institution || "Institution"}
                  </h3>
                  <span className="text-sm text-gray-500 flex-shrink-0 ml-4">
                    {train.from || "Start Date"} - {train.to || "End Date"}
                  </span>
                </div>
                {train.description.length > 0 && (
                  <p className="text-sm text-gray-600 mt-1">{train.description[0]}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {resume.certifications.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
              <svg
                className="w-7 h-7 mr-3 text-blue-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.24A1.99 1.99 0 0015.618 2H8.382c-.777 0-1.494.394-1.929 1.059L2.73 7.828c-.628.986-.18 2.307.95 2.528l3.125.625A1.99 1.99 0 008 12.001v.001A1.99 1.99 0 0010 14h4c1.11 0 2-.89 2-2V8l3.414-3.414a2 2 0 000-2.828z"
                ></path>
              </svg>
              Certifications
            </h2>
            {resume.certifications.map((cert, index) => (
              <div key={index} className="mb-4 pl-3 border-l-2 border-blue-200">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {cert.name || "Certification Name"},{" "}
                    {cert.authority || "Authority"}
                  </h3>
                  <span className="text-sm text-gray-500 flex-shrink-0 ml-4">
                    {cert.date || "Date"}
                  </span>
                </div>
                {cert.urlCode && (
                  <a
                    href={cert.urlCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 block mb-1"
                  >
                    URL/Code
                  </a>
                )}
                {cert.description.length > 0 && (
                  <p className="text-sm text-gray-600">{cert.description[0]}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* References */}
        {resume.references.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
              <svg
                className="w-7 h-7 mr-3 text-blue-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M17 20h-.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 9v4m-2-2h4"
                ></path>
              </svg>
              References
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resume.references.map((ref, index) => (
                <div key={index} className="pl-3 border-l-2 border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {ref.name || "Harumi Kobayashi"}
                  </h3>
                  <p className="text-md text-gray-600">
                    {ref.position || "CEO"} at {ref.company || "Wardiere Inc."}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Phone: {ref.phone || "123-456-7890"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Email: {ref.email || "hello@reallygreatsite.com"}
                  </p>
                  {ref.relationship && (
                    <p className="text-sm text-gray-600">
                      Relationship: {ref.relationship}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}