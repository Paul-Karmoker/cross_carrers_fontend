import { NavItem } from "@/types";

export const NAV_CONFIG: NavItem[] = [
  { label: "Home", path: "/", type: "link" },

  {
    label: "Jobs Here",
    key: "jobs",
    type: "dropdown",
    items: [
      { label: "BDjobs Sites", path: "/bdjobs" },
      { label: "Int. Jobs Sites", path: "/intjobs" },
      { label: "NGO Jobs", path: "/ngo" },
      { label: "INGO Jobs", path: "/ingo" },
      { label: "Freelancer Jobs", path: "/freelance" },
      { label: "Remote Jobs", path: "/remote-jobs" },
      { label: "Embassy Jobs", path: "/emb", restricted: true },
      { label: "Donar Jobs", path: "/donor", restricted: true },
      { label: "UN Jobs", path: "/un", restricted: true },
    ],
  },
  {
    label: "Resume Kit",
    key: "resume",
    type: "dropdown",
    items: [
      { label: "Resume Maker", path: "/resume", restricted: true },
      { label: "Cover Letter Maker", path: "/coverhome", restricted: true },
      { label: "Match & Insights", path: "/matchhome", restricted: true },
    ],
  },
  {
    label: "Candidate Kit",
    key: "candidate",
    type: "dropdown",
    items: [
      { label: "Training Sites", path: "/trainings" },
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
      { label: "PowerPoint Maker", path: "/ppthome", restricted: true },
      { label: "Document Maker", path: "/dochome", restricted: true },
      // { label: "Excel Format Maker", path: "/excelhome", restricted: true, hidden: true },
    ],
  },
  { label: "Blogs", type: "link", path: "/blogs" },
];
