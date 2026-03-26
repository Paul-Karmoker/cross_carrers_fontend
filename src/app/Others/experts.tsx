// app/team.tsx (or pages/team.tsx)
import React, { useEffect } from 'react';
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";

// Team members data
const teamMembers = [
  { name: "H. Imtiaz", role: "Humanitarian Logistics Specialist", experience: "15 years in national & international NGOs" },
  { name: "F. Tanjin", role: "Human Resources & Development Expert", experience: "12+ years in HR" },
  { name: "D. Boiragi", role: "Senior HR Management Advisor", experience: "17 years in senior HR leadership" },
  { name: "Khalid Zishan", role: "Government Liaison Specialist", experience: "15 years in govt. coordination" },
  { name: "R. Mandal", role: "Financial Coordinator", experience: "18 years in financial coordination" },
  { name: "Biplob A. Gomes", role: "Financial Management Advisor", experience: "28 years in financial management" },
  { name: "T. Mazumder", role: "Program & Advocacy Specialist", experience: "15 years in program and advocacy" },
  { name: "S. Khatun", role: "GBV, Safeguarding & Complaint Mechanism Expert", experience: "20 years in protection & compliance" },
  { name: "J. abedin Begum", role: "Education Policy Advisor", experience: "20 years in education policy" },
  { name: "Khalid Hassan", role: "Communications & Branding Strategist", experience: "16 years in communications" },
  { name: "Jay C. Sarkar", role: "Support Services Director", experience: "26 years in HR, finance, logistics, procurement, security & liaison" },
  { name: "Angela L. Mondal", role: "Program Management Lead", experience: "18 years in program management" }
];

const editorialLead = {
  name: "Paul Romeo Karmoker",
  role: "Strategic Operational Strengthening Specialist & Editorial Lead",
  experience: "17+ years in humanitarian & development operations, including UN WFP"
};

export default function TeamPage() {
  // Set the page title dynamically
  useEffect(() => {
    document.title = "Our Experts | CrossCareers Expert Network";
  }, []);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CrossCareers Expert Network",
    "url": "https://yourdomain.com/team", // replace with actual URL
    "description": "A multidisciplinary team of humanitarian and development professionals with combined 220+ years of experience.",
    "member": [
      ...teamMembers.map(member => ({
        "@type": "Person",
        "name": member.name,
        "description": `${member.role} – ${member.experience}`
      })),
      {
        "@type": "Person",
        "name": editorialLead.name,
        "description": `${editorialLead.role} – ${editorialLead.experience}`
      }
    ]
  };

  return (
    <>
    <Navbar />
      {/* Inject structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Meet Our Experts</h1>
        <p className="text-lg mb-8">
          The CrossCareers Expert Network brings together over 220 years of combined field‑tested experience across logistics, HR, finance, program management, safeguarding, and more. Every article is authored by a subject‑matter expert and reviewed by our editorial lead.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Subject‑Matter Experts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="border rounded-lg p-4 shadow-sm">
              <h3 className="text-xl font-medium">{member.name}</h3>
              <p className="text-gray-700">{member.role}</p>
              <p className="text-sm text-gray-500 mt-1">{member.experience}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Editorial Lead & Reviewer</h2>
        <div className="border rounded-lg p-4 shadow-sm max-w-md">
          <h3 className="text-xl font-medium">{editorialLead.name}</h3>
          <p className="text-gray-700">{editorialLead.role}</p>
          <p className="text-sm text-gray-500 mt-1">{editorialLead.experience}</p>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Each blog post under the CrossCareers Expert Network byline is either written or reviewed by the respective expert and final‑reviewed by Paul Romeo Karmoker.
        </p>
      </main>
      <Footer />
    </>
  );
}