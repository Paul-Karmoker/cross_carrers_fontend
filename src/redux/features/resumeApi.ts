import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/* ─────────────────────────────
   Types
───────────────────────────── */
export interface Address {
  street: string;
  city: string;
  postal: string;
  country: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  professionalTitle: string;
  phoneNumber: string;
  emailAddress: string;
  titleBefore: string;
  titleAfter: string;
  skype: string;
  linkedIn: string;
  portfolio: string;
  profilePicture: string;
  address: Address;
  permanentAddress: Address;
}

export interface WorkExperience {
  companyName: string;
  position: string;
  city: string;
  country: string;
  from: string;
  to: string;
  currentlyWorking: boolean;
  description: string[];
}

export interface Education {
  institutionName: string;
  fieldOfStudy: string;
  degree: string;
  city: string;
  country: string;
  passingYear: string;
  currentlyStudying: boolean;
  gpa: string;
  honors: string;
  description: string[];
}

export interface Training {
  name: string;
  institution: string;
  duration: string;
  from: string;
  to: string;
  description: string[];
}

export interface Certification {
  name: string;
  authority: string;
  urlCode: string;
  date: string;
  description: string[];
}

export interface Skill {
  name: string;
  level: string;
}

export interface Reference {
  name: string;
  position: string;
  company: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface Resume {
  id?: string;
  _id?: string;
  personalInfo: PersonalInfo;
  careerObjective: string;
  careerSummary: string;
  workExperience: WorkExperience[];
  education: Education[];
  trainings: Training[];
  certifications: Certification[];
  skills: Skill[];
  references: Reference[];
  template: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ResumeResponse {
  success: boolean;
  message: string;
  data: Resume | Resume[];
}

export interface SuggestionResponse {
  success: boolean;
  message: string;
  data: {
    suggestions?: string[];
    suggestion?: string;
    technical?: string[];
    soft?: string[];
  };
}

/* ─────────────────────────────
   Helper function to get token with validation
───────────────────────────── */
const getValidToken = (): string | null => {
  const token = localStorage.getItem('token');
  
  // Optional: Add token validation logic here
  if (!token) {
    console.warn('No token found in localStorage');
    return null;
  }
  
  // You could add JWT expiration check here if needed
  return token;
};

/* ─────────────────────────────
   API CONFIG
───────────────────────────── */
const BASE_URL = 'https://api.crosscareers.com/api/v1/resume';

export const resumeApi = createApi({
  reducerPath: 'resumeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getValidToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      } else {
        // Optional: Redirect to login if no token
        console.warn('No authentication token available');
      }
      return headers;
    },
  }),
  tagTypes: ['Resume'],
  endpoints: (builder) => ({
    /* ───────────── Queries ───────────── */
    getAllResumes: builder.query<ResumeResponse, void>({
      query: () => '/',
      providesTags: ['Resume'],
    }),

    getResume: builder.query<ResumeResponse, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [
        { type: 'Resume', id },
      ],
    }),

    /* ───────────── Mutations ───────────── */
    createResume: builder.mutation<ResumeResponse, Partial<Resume>>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Resume'],
    }),

    updateResume: builder.mutation<ResumeResponse, { id: string; data: Partial<Resume> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Resume'],
    }),

    deleteResume: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Resume'],
    }),

    /* ───────────── Work Experience ───────────── */
    addWorkExperience: builder.mutation<ResumeResponse, { id: string; workExp: Partial<WorkExperience> }>({
      query: ({ id, workExp }) => ({
        url: `/${id}/work-experience`,
        method: 'POST',
        body: workExp,
      }),
      invalidatesTags: ['Resume'],
    }),

    deleteWorkExperience: builder.mutation<ResumeResponse, { id: string; index: number }>({
      query: ({ id, index }) => ({
        url: `/${id}/work-experience`,
        method: 'DELETE',
        body: { index },
      }),
      invalidatesTags: ['Resume'],
    }),

    /* ───────────── Education ───────────── */
    addEducation: builder.mutation<ResumeResponse, { id: string; education: Partial<Education> }>({
      query: ({ id, education }) => ({
        url: `/${id}/education`,
        method: 'POST',
        body: education,
      }),
      invalidatesTags: ['Resume'],
    }),

    deleteEducation: builder.mutation<ResumeResponse, { id: string; index: number }>({
      query: ({ id, index }) => ({
        url: `/${id}/education`,
        method: 'DELETE',
        body: { index },
      }),
      invalidatesTags: ['Resume'],
    }),

    /* ───────────── Reference ───────────── */
    addReference: builder.mutation<ResumeResponse, { id: string; reference: Partial<Reference> }>({
      query: ({ id, reference }) => ({
        url: `/${id}/reference`,
        method: 'POST',
        body: reference,
      }),
      invalidatesTags: ['Resume'],
    }),

    deleteReference: builder.mutation<ResumeResponse, { id: string; index: number }>({
      query: ({ id, index }) => ({
        url: `/${id}/reference`,
        method: 'DELETE',
        body: { index },
      }),
      invalidatesTags: ['Resume'],
    }),

    /* ───────────── AI Suggestions ───────────── */
    getJobDescriptionSuggestion: builder.mutation<SuggestionResponse, Partial<WorkExperience>>({
      query: (workExp) => ({
        url: '/suggest/job-description',
        method: 'POST',
        body: { workExp },
      }),
    }),

    getSkillsSuggestion: builder.mutation<SuggestionResponse, { workExperiences: WorkExperience[] }>({
      query: (data) => ({
        url: '/suggest/skills',
        method: 'POST',
        body: data,
      }),
    }),

    getCareerObjectiveSuggestion: builder.mutation<SuggestionResponse, { 
      workExperiences: WorkExperience[];
      education: Education[];
    }>({
      query: (data) => ({
        url: '/suggest/career-objective',
        method: 'POST',
        body: data,
      }),
    }),

    getCareerSummarySuggestion: builder.mutation<SuggestionResponse, { 
      workExperiences: WorkExperience[];
      education: Education[];
    }>({
      query: (data) => ({
        url: '/suggest/career-summary',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllResumesQuery,
  useCreateResumeMutation,
  useGetResumeQuery,
  useUpdateResumeMutation,
  useDeleteResumeMutation,
  useAddWorkExperienceMutation,
  useDeleteWorkExperienceMutation,
  useAddEducationMutation,
  useDeleteEducationMutation,
  useAddReferenceMutation,
  useDeleteReferenceMutation,
  useGetJobDescriptionSuggestionMutation,
  useGetSkillsSuggestionMutation,
  useGetCareerObjectiveSuggestionMutation,
  useGetCareerSummarySuggestionMutation,
} = resumeApi;