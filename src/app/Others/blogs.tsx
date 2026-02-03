import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";

// SEO‑friendly Blog Post Type
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
}

// Blog data (replace later with API / CMS)
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Master the Mission: How to Prepare for NGO Job Interviews in 2026",
    slug: "prepare-for-ngo-job-interviews",
    date: "2026-01-15",
    excerpt: "Learn practical interview preparation strategies for NGO, UN, and humanitarian sector jobs in Bangladesh and beyond.",
    category: "Interview Support",
    content: `
      <p>Landing a role in the Non-Governmental Organization (NGO) sector is about more than just having the right technical skills; it’s about demonstrating a deep-rooted alignment with a mission. Whether you are aiming for a position at a global giant like <strong>BRAC</strong>, the <strong>UN</strong>, or a specialized local agency, preparation is the bridge between being a "qualified candidate" and a "perfect fit."</p>

      <h2>1. Research Beyond the "About Us" Page</h2>
      <p>To impress an NGO panel, you must understand their impact at a granular level. Generic answers will not work in this competitive sector.</p>
      <ul>
        <li><strong>Study the Annual Reports:</strong> Look for their recent success stories and, more importantly, their funding sources. Knowing if a project is funded by USAID, UKAid, or local grants shows business acumen.</li>
        <li><strong>Understand the "Beneficiaries":</strong> Who are they serving? Understanding the community's needs allows you to tailor your answers to real-world impact.</li>
        <li><strong>Current Projects in Bangladesh:</strong> Mention a specific project they are running (e.g., climate resilience in the coastal belts or refugee aid in Cox's Bazar). This shows you are genuinely invested in their local operations.</li>
      </ul>

      <h2>2. Master the "Competency-Based" Interview Style</h2>
      <p>Most international NGOs and UN agencies use <strong>Competency-Based Interviews (CBI)</strong>. They are looking for evidence of past behavior to predict future performance.</p>
      <h3>Use the STAR Method</h3>
      <p>When answering questions, strictly follow this structure to keep your answers concise and impactful:</p>
      <ul>
        <li><strong>S - Situation:</strong> Briefly describe the context.</li>
        <li><strong>T - Task:</strong> Explain what was required of you.</li>
        <li><strong>A - Action:</strong> (The most important part) Detail the specific steps <em>you</em> took. Avoid saying "we"; say "I".</li>
        <li><strong>R - Result:</strong> Share the quantitative outcome (e.g., "Reduced procurement costs by 15%").</li>
      </ul>

      <h2>3. Highlight Technical & Operational Knowledge</h2>
      <p>NGOs operate in highly regulated environments. Demonstrating knowledge of compliance can set you apart, especially for roles in <strong>Logistics, Procurement, or Administration</strong>.</p>
      <ul>
        <li><strong>Regulatory Knowledge:</strong> If you are interviewing in Bangladesh, familiarize yourself with <strong>NGO Affairs Bureau (NGOAB)</strong> regulations, such as <strong>FD-6</strong> or <strong>FD-7</strong> project proformas.</li>
        <li><strong>Donor Compliance:</strong> Show that you understand the importance of audit trails and transparency. Mentioning your experience with ethical procurement policies is a major plus.</li>
      </ul>

      <h2>4. Common NGO Interview Questions</h2>
      <p>Prepare specifically for these industry-standard questions:</p>
      <table>
        <thead>
          <tr>
            <th style="text-align: left; padding: 8px;">Question</th>
            <th style="text-align: left; padding: 8px;">What they are really asking</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px;">"Why do you want to work for us?"</td>
            <td style="padding: 8px;">Do your personal values align with our organizational mandate?</td>
          </tr>
          <tr>
            <td style="padding: 8px;">"How do you handle field pressure?"</td>
            <td style="padding: 8px;">Can you maintain neutrality and efficiency in crisis situations?</td>
          </tr>
          <tr>
            <td style="padding: 8px;">"Describe a time you dealt with a difficult stakeholder."</td>
            <td style="padding: 8px;">Do you have diplomatic and conflict-resolution skills?</td>
          </tr>
        </tbody>
      </table>

      <h2>5. Ask High-Impact Questions</h2>
      <p>When the interviewer asks, "Do you have any questions for us?", use it to show your strategic thinking:</p>
      <ul>
        <li><em>"How does this role contribute to the organization's strategic goals for the next 5 years?"</em></li>
        <li><em>"What are the biggest challenges the team faces regarding donor compliance or project implementation right now?"</em></li>
      </ul>

      <hr />

      <h3>Final Checklist for Success:</h3>
      <p>Remember, working in the development sector is a commitment. Dress professionally, arrive early to account for traffic, and always follow up with a thank-you email emphasizing your passion for their cause.</p>
    `
  },
{
  id: 2,
  title: "Top Skills for Supply Chain Professionals in 2026",
  slug: "top-supply-chain-skills-2026",
  date: "2026-01-28",
  excerpt: "Discover the most in-demand logistics and supply chain skills employers want in 2026.",
  category: "Career Guide",
  content: `
    <p>The landscape of supply chain management is evolving rapidly. By 2026, organizations across industries will expect supply chain professionals to not only execute traditional logistics tasks but also leverage digital solutions, demonstrate strategic thinking, and exhibit leadership in complex environments. To stay ahead, professionals must cultivate a mix of technical, analytical, and interpersonal skills that meet the demands of an increasingly global and technology-driven supply chain ecosystem.</p>

    <h2>1. Mastery of Digital Logistics Systems</h2>
    <p>Digital transformation is reshaping supply chain operations. Modern supply chain professionals need to be proficient in digital logistics platforms, transportation management systems (TMS), warehouse management systems (WMS), and advanced inventory management software. Knowledge of these tools allows professionals to optimize routing, reduce operational costs, and maintain high service levels. Automation, IoT-enabled tracking, and real-time dashboards are no longer optional—they are essential.</p>
    <ul>
      <li><strong>Inventory Visibility:</strong> Use WMS and ERP integrations to provide real-time updates on stock levels and locations.</li>
      <li><strong>Demand Forecasting:</strong> Leverage predictive analytics to anticipate market needs and avoid overstocking or stockouts.</li>
      <li><strong>Transport Optimization:</strong> Plan routes and shipping schedules efficiently using TMS platforms.</li>
    </ul>

    <h2>2. Proficiency in ERP Tools</h2>
    <p>Enterprise Resource Planning (ERP) systems form the backbone of integrated supply chains. Professionals need hands-on experience with ERP software to streamline procurement, track financials, and coordinate production schedules. Familiarity with modules related to procurement, inventory, finance, and sales ensures smooth cross-functional collaboration and supports informed decision-making.</p>
    <ul>
      <li><strong>Data Integration:</strong> Consolidate supply chain data across multiple departments for coherent planning.</li>
      <li><strong>Process Automation:</strong> Reduce manual errors and improve efficiency with automated workflows.</li>
      <li><strong>Reporting:</strong> Generate dashboards and KPIs that reflect operational performance in real time.</li>
    </ul>

    <h2>3. Analytical and Data-Driven Mindset</h2>
    <p>Data analytics is increasingly critical for supply chain success. Professionals must not only gather data but also interpret it to drive actionable insights. Skills in Excel, SQL, Power BI, or Python can help identify trends, forecast demand, and measure performance. A data-driven approach enables better inventory management, cost control, and strategic sourcing decisions.</p>
    <ul>
      <li><strong>Performance Analysis:</strong> Track KPIs such as order fulfillment rate, inventory turnover, and supplier performance.</li>
      <li><strong>Predictive Analytics:</strong> Use historical data to forecast demand, plan capacity, and mitigate risks.</li>
      <li><strong>Problem Solving:</strong> Identify bottlenecks and propose data-backed solutions.</li>
    </ul>

    <h2>4. Compliance and Risk Management</h2>
    <p>Supply chains operate under a myriad of regulations, from trade compliance and customs requirements to environmental and ethical standards. Professionals must understand legal frameworks and implement compliance protocols effectively. Additionally, risk management skills are vital to anticipate disruptions—from supplier delays to geopolitical events—and maintain business continuity.</p>
    <ul>
      <li><strong>Regulatory Compliance:</strong> Stay updated on international trade regulations, tariffs, and labor laws.</li>
      <li><strong>Supplier Audits:</strong> Ensure vendors meet quality, safety, and ethical standards.</li>
      <li><strong>Contingency Planning:</strong> Develop mitigation strategies for operational risks.</li>
    </ul>

    <h2>5. Leadership and Collaboration</h2>
    <p>Beyond technical skills, supply chain professionals need leadership and interpersonal abilities. Effective communication, team management, and cross-functional collaboration are essential to align operations with organizational goals. Leaders in supply chain roles must guide teams through complex projects, negotiate with stakeholders, and foster continuous improvement.</p>
    <ul>
      <li><strong>Team Coordination:</strong> Align procurement, warehousing, and logistics teams for smooth execution.</li>
      <li><strong>Stakeholder Management:</strong> Communicate effectively with internal departments, suppliers, and customers.</li>
      <li><strong>Change Leadership:</strong> Drive adoption of new technologies and process improvements.</li>
    </ul>

    <h2>Final Thoughts</h2>
    <p>The supply chain professional of 2026 is a hybrid of a strategist, analyst, and digital innovator. Mastering technology, data, compliance, and leadership ensures that you can add tangible value to organizations navigating complex, global supply networks. Continuous learning and adaptability remain the hallmarks of a successful career in this dynamic field.</p>
  `
},
 {
  id: 3,
  title: "Building an ATS-Friendly Resume",
  slug: "ats-friendly-resume",
  date: "2026-02-01",
  excerpt: "Tips to make your CV compatible with Applicant Tracking Systems (ATS) and get noticed by recruiters.",
  category: "Application Tracking system (ATS)",
  content: `
    <p>In today’s competitive job market, many organizations rely on <strong>Applicant Tracking Systems (ATS)</strong> to streamline recruitment. These systems automatically scan resumes, filtering candidates based on keywords, formatting, and relevant experience. Understanding how ATS works and optimizing your resume accordingly is crucial for increasing your chances of getting noticed by recruiters.</p>

    <h2>1. Understand How ATS Parses Resumes</h2>
    <p>An ATS scans resumes for relevant information such as job titles, skills, education, and experience. It analyzes text, extracts data, and ranks candidates based on how well their resume matches the job description. Common issues include:</p>
    <ul>
      <li>Complex formatting that confuses the parser (tables, images, graphics)</li>
      <li>Use of uncommon fonts or colors that ATS cannot read</li>
      <li>Missing keywords that match the job posting</li>
    </ul>
    <p>By understanding these limitations, you can structure your resume to be both ATS-compatible and visually appealing for human recruiters.</p>

    <h2>2. Use Keywords Strategically</h2>
    <p>Keywords are the backbone of an ATS-friendly resume. Carefully analyze the job description and identify key skills, certifications, and industry-specific terms. Incorporate these naturally throughout your resume, especially in sections like:</p>
    <ul>
      <li><strong>Skills:</strong> List both hard and soft skills relevant to the role</li>
      <li><strong>Professional Experience:</strong> Describe accomplishments using industry terminology</li>
      <li><strong>Certifications:</strong> Include relevant qualifications recognized by your field</li>
    </ul>
    <p>Be mindful to avoid keyword stuffing, which can appear unnatural and reduce readability for hiring managers.</p>

    <h2>3. Optimize Formatting and Layout</h2>
    <p>Simplicity is key. ATS systems read resumes linearly, so avoid complex layouts or multi-column designs. Recommended formatting tips include:</p>
    <ul>
      <li>Use standard fonts like Arial, Calibri, or Times New Roman</li>
      <li>Stick to clear headings such as “Experience,” “Education,” and “Skills”</li>
      <li>Use bullet points instead of tables for listing responsibilities and achievements</li>
      <li>Keep dates and company names consistent and clearly visible</li>
    </ul>

    <h2>4. Highlight Achievements Quantitatively</h2>
    <p>ATS scans text, but humans review results. Combine data-driven accomplishments with keywords to strengthen your resume. For example:</p>
    <ul>
      <li>“Reduced procurement costs by 15% through supplier renegotiation”</li>
      <li>“Managed a logistics team of 12, improving on-time delivery by 20%”</li>
      <li>“Implemented ERP software across three warehouses, enhancing inventory accuracy by 25%”</li>
    </ul>
    <p>This approach ensures your resume appeals to both ATS and recruiters, demonstrating measurable impact and expertise.</p>

    <h2>5. Tailor Each Resume for the Job</h2>
    <p>ATS systems favor resumes that closely match the job description. Tailoring your resume for each application improves your ranking. Focus on:</p>
    <ul>
      <li>Aligning your skills and experience with the job requirements</li>
      <li>Rewriting summary statements to reflect the role’s priorities</li>
      <li>Highlighting relevant projects, tools, and achievements</li>
    </ul>

    <h2>6. Test Your Resume for ATS Compatibility</h2>
    <p>Before submitting, use free tools like <strong>Jobscan</strong> or <strong>Resumeworded</strong> to check how your resume performs with ATS. These tools help identify missing keywords, formatting issues, and areas for improvement.</p>

    <h2>7. Additional Best Practices</h2>
    <ul>
      <li>Save your resume as a <strong>.docx</strong> or <strong>PDF</strong> format unless the job description specifies otherwise</li>
      <li>Include a concise professional summary at the top, integrating main keywords</li>
      <li>Maintain chronological order for work experience, starting with the most recent role</li>
      <li>Keep the resume between one to two pages, focusing on quality over quantity</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Creating an ATS-friendly resume is no longer optional; it is a necessity for job seekers in the modern recruitment landscape. By understanding how Applicant Tracking Systems operate, strategically using keywords, optimizing formatting, and highlighting achievements, you can ensure your resume reaches recruiters’ desks. Regularly reviewing and updating your resume with industry trends and best practices will maximize your chances of success. An ATS-optimized resume is not only about passing the system—it’s about presenting yourself as a professional, results-oriented candidate ready to excel in today’s competitive job market.</p>
  `
},
{
  id: 4,
  title: "Creating an Impactful Resume / CV",
  slug: "impactful-resume-cv",
  date: "2026-02-03",
  excerpt: "Key strategies to craft a strong resume or CV that stands out to employers.",
  category: "Resume / CV",
  content: `
    <p>In today’s competitive job market, crafting an <strong>impactful resume or CV</strong> is essential to capturing the attention of recruiters and securing interviews. A strong CV not only highlights your skills and experience but also conveys your professionalism, accomplishments, and alignment with the role you are applying for. By following strategic guidelines, job seekers can create resumes that truly stand out.</p>

    <h2>1. Focus on Achievements Over Responsibilities</h2>
    <p>Many candidates make the mistake of listing job duties instead of emphasizing accomplishments. Recruiters are more interested in what you achieved and the impact you made. To do this effectively:</p>
    <ul>
      <li>Quantify your achievements wherever possible, e.g., “Increased sales revenue by 20% in six months”</li>
      <li>Highlight successful projects, initiatives, or improvements you contributed to</li>
      <li>Use action verbs like “implemented,” “led,” “optimized,” or “developed”</li>
    </ul>
    <p>By presenting concrete results, your resume communicates value to potential employers immediately.</p>

    <h2>2. Use Clear and Professional Formatting</h2>
    <p>Presentation matters. A clean, well-organized resume ensures recruiters can quickly scan and absorb the information. Key formatting tips include:</p>
    <ul>
      <li>Use a professional font such as Arial, Calibri, or Times New Roman</li>
      <li>Organize sections with clear headings: “Professional Experience,” “Education,” “Skills,” “Certifications”</li>
      <li>Keep consistent spacing, bullet styles, and date formats</li>
      <li>Maintain a logical flow, ideally reverse-chronological order for work experience</li>
    </ul>

    <h2>3. Tailor Your Resume for Each Job Application</h2>
    <p>Generic resumes rarely succeed. Tailoring your CV for each job increases your chances of passing through both automated and human screening. Consider these steps:</p>
    <ul>
      <li>Match your skills and experience to the job description</li>
      <li>Integrate relevant keywords for ATS (Applicant Tracking Systems)</li>
      <li>Highlight experience that is most relevant to the role</li>
    </ul>
    <p>Customizing your resume demonstrates genuine interest and attention to detail, which recruiters value highly.</p>

    <h2>4. Include a Strong Professional Summary</h2>
    <p>The summary section at the top of your resume serves as your first impression. A strong summary should:</p>
    <ul>
      <li>Be concise, ideally 3–4 sentences</li>
      <li>Highlight your key skills, years of experience, and notable achievements</li>
      <li>Include industry-specific keywords to improve ATS ranking</li>
      <li>Reflect your career goals aligned with the prospective role</li>
    </ul>

    <h2>5. Highlight Relevant Skills and Certifications</h2>
    <p>Recruiters and ATS systems pay close attention to the skills section. To make this impactful:</p>
    <ul>
      <li>Focus on technical skills relevant to your field (e.g., ERP systems, data analysis, project management tools)</li>
      <li>Include soft skills such as leadership, communication, and teamwork if they align with the role</li>
      <li>List certifications, licenses, or professional training that enhance credibility</li>
    </ul>

    <h2>6. Keep It Concise and Readable</h2>
    <p>While you may have extensive experience, a concise resume is more effective. Tips for maintaining readability:</p>
    <ul>
      <li>Limit the resume to one or two pages depending on experience</li>
      <li>Use bullet points instead of long paragraphs</li>
      <li>Ensure margins and spacing allow for easy scanning</li>
      <li>Remove outdated or irrelevant experience that does not add value</li>
    </ul>

    <h2>7. Proofread and Review</h2>
    <p>Errors in your resume can undermine your professionalism. Before submitting:</p>
    <ul>
      <li>Check spelling, grammar, and punctuation carefully</li>
      <li>Ask a mentor or colleague to review for clarity and impact</li>
      <li>Ensure consistency in formatting, tense, and style</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Creating an impactful resume or CV is a combination of strategic content, clear presentation, and personalization for each job application. By focusing on achievements, optimizing formatting, tailoring content, and highlighting relevant skills, you position yourself as a strong candidate. Remember, your resume is often the first impression a recruiter has of you—make it count. A well-crafted, ATS-compatible, and visually appealing CV increases your chances of landing interviews and ultimately securing your desired role in a competitive job market.</p>
  `
}

];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Application Tracking system (ATS)", "Resume / CV", "Career Guide", "Interview Support"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" ? true : post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>{selectedPost ? `${selectedPost.title} | CrossCareers Blog` : "Career Insights & Blogs | CrossCareers"}</title>
        <meta
          name="description"
          content={selectedPost ? selectedPost.excerpt : "Career guidance, interview tips, and NGO job insights for professionals in Bangladesh and globally."}
        />
        <link rel="canonical" href={`https://crosscareers.com/blog${selectedPost ? `/${selectedPost.slug}` : ""}`} />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-white selection:bg-blue-100 pt-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-800">Career Insights & Blogs</h1>

          {!selectedPost && (
            <>
              {/* Search Box */}
              <input
                type="text"
                placeholder="Search blogs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 w-full rounded-xl border px-4 py-2"
              />

              {/* Category Filter */}
              <div className="mb-6 flex gap-4 flex-wrap">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`px-4 py-2 rounded-xl border ${selectedCategory === cat ? "bg-black text-white" : "bg-white text-gray-700"}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Blog List */}
              <div className="grid gap-6">
                {filteredPosts.map(post => (
                  <article
                    key={post.id}
                    className="rounded-2xl bg-white p-6 shadow hover:shadow-md transition"
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                  >
                    <h2 className="text-xl font-semibold text-gray-800" itemProp="headline">{post.title}</h2>
                    <time className="mt-1 block text-sm text-gray-500" dateTime={post.date} itemProp="datePublished">{post.date}</time>
                    <p className="mt-3 text-gray-600" itemProp="description">{post.excerpt}</p>

                    <button
                      onClick={() => setSelectedPost(post)}
                      className="mt-4 inline-block rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                    >Read More</button>
                  </article>
                ))}
              </div>
            </>
          )}

          {/* Single Blog Post */}
          {selectedPost && (
            <article className="rounded-2xl bg-white p-8 shadow" itemScope itemType="https://schema.org/BlogPosting">
              <button
                onClick={() => setSelectedPost(null)}
                className="mb-4 px-4 py-2 font-medium rounded-xl bg-black text-white hover:bg-white hover:text-black border border-black transition-colors duration-300"
              >
                ← Back to Blogs
              </button>

              <h2 className="text-2xl font-bold text-gray-800" itemProp="headline">{selectedPost.title}</h2>
              <time className="mt-1 block text-sm text-gray-500" dateTime={selectedPost.date} itemProp="datePublished">{selectedPost.date}</time>

              <div
                className="mt-6 leading-relaxed text-gray-700"
                itemProp="articleBody"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              ></div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
