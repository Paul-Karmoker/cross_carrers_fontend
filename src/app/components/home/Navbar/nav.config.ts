import { NavItem } from "@/types";

export const NAV_CONFIG: NavItem[] = [
  { label: "Home", path: "/", type: "link" },

  {
    label: "Jobs Here",
    key: "jobs",
    type: "dropdown",
    items: [
      { label: "BDjobs Sites", path: "/bangladesh-jobs-sites" },
      { label: "Int. Jobs Sites", path: "/international-jobs-sites" },
      { label: "NGO Jobs", path: "/ngo-jobs-bangladesh" },
      { label: "INGO Jobs", path: "/international-ngo-jobs" },
      { label: "Freelancer Jobs", path: "/freelance-jobs-online" },
      { label: "Remote Jobs", path: "/remote-jobs-worldwide" },
      { label: "Embassy Jobs", path: "/embassy-jobs-bangladesh", restricted: true },
      { label: "Donar Jobs", path: "/donor-jobs-bangladesh", restricted: true },
      { label: "UN Jobs", path: "/united-nation-jobs-bangladesh", restricted: true },
    ],
  },
  {
    label: "Resume Kit",
    key: "resume",
    type: "dropdown",
    items: [
      { label: "Resume Maker", path: "/resume", restricted: true },
      { label: "Cover Letter Maker", path: "/cover", restricted: true },
      { label: "Match & Insights", path: "/matchhome", restricted: true },
    ],
  },
  {
    label: "Candidate Kit",
    key: "candidate",
    type: "dropdown",
    items: [
      { label: "Training Sites", path: "/training-sites-worldwide" },
      { label: "Written Test", path: "/writtenTest", restricted: true },
      {
        label: "Interview Practice",
        path: "/InterviewSimulator",
        restricted: true,
      },
      { label: "Interview Questions", path: "/qahome", restricted: true },
    ],
  },

  {
    label: "Services Kit",
    key: "services",
    type: "dropdown",
    items: [
      { label: "PowerPoint Maker", path: "/ppt", restricted: true },
      { label: "Document Maker", path: "/doc", restricted: true },
      // { label: "Excel Format Maker", path: "/excelhome", restricted: true, hidden: true },
    ],
  },
  { label: "Blogs", type: "link", path: "/blogs" },
];
