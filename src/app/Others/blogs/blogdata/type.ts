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
  title: "Humanitarian & Development Professionals",
  bio: "The CrossCareers Expert Network is a multidisciplinary team of senior professionals with 15–25+ years of experience across humanitarian and development sectors in Bangladesh and internationally. The network includes specialists in supply chain, HR, finance, program management, safeguarding, and government liaison.\n\nAll content is reviewed by Paul Romeo Karmoker, a logistics and operations specialist with 17+ years of experience, including work with the United Nations World Food Programme (WFP).\n\nArticles are based on real field experience, operational insights, and current job market practices in Bangladesh.",
  experience: "15–25+ years field experience"
};
