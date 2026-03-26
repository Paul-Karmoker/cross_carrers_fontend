export interface authorCrossCareers {
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
  author: authorCrossCareers;
  readingTime?: number;
}


export const authorCrossCareers = {
  name: "CrossCareers Expert Network",
  title: "Humanitarian & Development Operations | Supply Chain | HR | Finance | Program | Safeguarding | Govt. Liaison",
  bio: "The CrossCareers Expert Network is a multidisciplinary team of humanitarian and development professionals. With an average 20+ years of field‑tested experience across 12+ specialist domains, the network brings together senior practitioners in supply chain, human resources, finance, program management, advocacy, safeguarding, government liaison, communications, and education policy.\n\nEach article is authored by a subject‑matter expert from the network and undergoes technical review by Paul Romeo Karmoker – a Strategic Operational Strengthening Specialist with 17+ years of leadership experience, including direct tenure with the United Nations World Food Programme (WFP). This ensures every piece is both deeply specialized and operationally grounded.\n\nCollectively, the network has led country capacity strengthening (CCS) initiatives, facilitated 24+ professional training sessions for organizations such as WFP, DanChurchAid, and Good Neighbors, and managed multi‑million‑dollar donor‑funded programs (USAID, ECHO, UNFPA). Expertise spans supply chain digitalization (RITA, LESS, MS Dynamics, Agresso), infrastructure project oversight (including warehouse and office construction), audit‑ready compliance, and senior HR/administration leadership.\n\nBy combining niche expertise with rigorous editorial oversight, the CrossCareers Expert Network delivers authoritative, practical insights for the humanitarian and development sector.",
  experience: "Average 20+ years in humanitarian & development operations"
};
