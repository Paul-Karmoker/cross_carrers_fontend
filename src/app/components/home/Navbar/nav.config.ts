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
      { label: "INGOT Jobs", path: "/ingo" },
      { label: "Embassy Jobs", path: "/emb" },
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
      { label: "Cover Letter Maker", path: "/coverhome" },
      { label: "Match & Insights", path: "/matchhome", restricted: true },
    ],
  },
  {
    label: "Candidate Kit",
    key: "candidate",
    type: "dropdown",
    items: [
      { label: "Training Sites", path: "/trainings" },
      { label: "Written Test", path: "/writtenTest" },
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
];
