export interface authorPaul {
  name: string;
  title: string;
  bio?: string;
  image?: string;
  profileUrl?: string;
  experience?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: authorPaul;
  readingTime?: number;
}

export const authorPaul = {
  name: "Paul R. Karmoker",
  title: "Strategic Logistics & Capacity Strengthening Specialist | Supply Chain Management | Country Capacity Strengthening (CCS) | Procurement & Operations Leader",
  bio: "Paul is a Strategic Operational Strengthening Specialist with over 16 years of cross-functional leadership experience in the humanitarian and development sector, including direct tenure with the United Nations World Food Programme (WFP). He has successfully led Country Capacity Strengthening (CCS) initiatives, facilitating technical supply chain training and knowledge transfer to national counterparts, local partners, and international NGO staff. His expertise spans strategic human resource, administration, procurement, Logitics and management, infrastructure project oversight (including constructing warehouses and a seven-story head office), and maintaining audit-ready documentation for multi-million dollar donor-funded projects (USAID, ECHO, WFP, UNFPA).\n\nPaul holds a Post Graduate Diploma in Supply Chain Management (ProfQual-UK) and is currently pursuing his CIPS Level 4 certification. He combines deep operational knowledge with a strong commitment to capacity building, having facilitated over 24 training sessions for organizations including WFP, DanChurchAid, and Good Neighbors. His proficiency with digital supply chain tools (RITA, LESS, MS Dynamics, Agresso) and his ability to navigate complex government liaison and compliance landscapes make him a trusted leader in building sustainable, accountable operations from the ground up.",
  image: "https://i.ibb.co.com/5hpWTFHT/Untitled-design.webp",
  experience: "16.6+ years in UN/INGO humanitarian & development operations"
};