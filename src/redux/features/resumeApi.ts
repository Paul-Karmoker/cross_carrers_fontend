import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:4001/api/v1/resume';

/* ─────────────────────────────
   Common Types (lightweight)
───────────────────────────── */
type ResumeId = string;

interface UpdateResumePayload {
  id: ResumeId;
  data: any;
}

interface WorkExperiencePayload {
  id: ResumeId;
  workExp: any;
}

interface DeleteByIndexPayload {
  id: ResumeId;
  index: number;
}

interface EducationPayload {
  id: ResumeId;
  education: any;
}

interface ReferencePayload {
  id: ResumeId;
  reference: any;
}

/* ─────────────────────────────
   API Slice
───────────────────────────── */
export const resumeApi = createApi({
  reducerPath: 'resumeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Resume'],
  endpoints: (builder) => ({
    // GET all resumes (dashboard)
    getAllResumes: builder.query<any, void>({
      query: () => '/',
      providesTags: ['Resume'],
    }),

    // CREATE resume
    createResume: builder.mutation<any, any>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Resume'],
    }),

    // GET single resume
    getResume: builder.query<any, ResumeId>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Resume', id }],
    }),

    // UPDATE resume
    updateResume: builder.mutation<any, UpdateResumePayload>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Resume'],
    }),

    // DELETE resume
    deleteResume: builder.mutation<any, ResumeId>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Resume'],
    }),

    // WORK EXPERIENCE
    addWorkExperience: builder.mutation<any, WorkExperiencePayload>({
      query: ({ id, workExp }) => ({
        url: `/${id}/work-experience`,
        method: 'POST',
        body: workExp,
      }),
      invalidatesTags: ['Resume'],
    }),

    deleteWorkExperience: builder.mutation<any, DeleteByIndexPayload>({
      query: ({ id, index }) => ({
        url: `/${id}/work-experience`,
        method: 'DELETE',
        body: { index },
      }),
      invalidatesTags: ['Resume'],
    }),

    // EDUCATION
    addEducation: builder.mutation<any, EducationPayload>({
      query: ({ id, education }) => ({
        url: `/${id}/education`,
        method: 'POST',
        body: education,
      }),
      invalidatesTags: ['Resume'],
    }),

    deleteEducation: builder.mutation<any, DeleteByIndexPayload>({
      query: ({ id, index }) => ({
        url: `/${id}/education`,
        method: 'DELETE',
        body: { index },
      }),
      invalidatesTags: ['Resume'],
    }),

    // REFERENCE
    addReference: builder.mutation<any, ReferencePayload>({
      query: ({ id, reference }) => ({
        url: `/${id}/reference`,
        method: 'POST',
        body: reference,
      }),
      invalidatesTags: ['Resume'],
    }),

    deleteReference: builder.mutation<any, DeleteByIndexPayload>({
      query: ({ id, index }) => ({
        url: `/${id}/reference`,
        method: 'DELETE',
        body: { index },
      }),
      invalidatesTags: ['Resume'],
    }),

    // AI Suggestions
    getJobDescriptionSuggestion: builder.mutation<any, any>({
      query: (workExp) => ({
        url: '/suggest/job-description',
        method: 'POST',
        body: { workExp },
      }),
    }),

    getSkillsSuggestion: builder.mutation<any, any>({
      query: (workExperiences) => ({
        url: '/suggest/skills',
        method: 'POST',
        body: { workExperiences },
      }),
    }),

    getCareerObjectiveSuggestion: builder.mutation<any, any>({
      query: (data) => ({
        url: '/suggest/career-objective',
        method: 'POST',
        body: data,
      }),
    }),

    getCareerSummarySuggestion: builder.mutation<any, any>({
      query: (data) => ({
        url: '/suggest/career-summary',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

/* ─────────────────────────────
   Hooks Export
───────────────────────────── */
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
