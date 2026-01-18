import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export interface ResumeState {
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
  lastUpdated: string;
}

/* ─────────────────────────────
   Initial Objects
───────────────────────────── */
const emptyAddress: Address = {
  street: '',
  city: '',
  postal: '',
  country: '',
};

const initialPersonalInfo: PersonalInfo = {
  firstName: '',
  lastName: '',
  professionalTitle: '',
  phoneNumber: '',
  emailAddress: '',
  titleBefore: '',
  titleAfter: '',
  skype: '',
  linkedIn: '',
  portfolio: '',
  profilePicture: '',
  address: { ...emptyAddress },
  permanentAddress: { ...emptyAddress },
};

const initialWorkExperience: WorkExperience = {
  companyName: '',
  position: '',
  city: '',
  country: '',
  from: '',
  to: '',
  currentlyWorking: false,
  description: [],
};

const initialEducation: Education = {
  institutionName: '',
  fieldOfStudy: '',
  degree: '',
  city: '',
  country: '',
  passingYear: '',
  currentlyStudying: false,
  gpa: '',
  honors: '',
  description: [],
};

const initialTraining: Training = {
  name: '',
  institution: '',
  duration: '',
  from: '',
  to: '',
  description: [],
};

const initialCertification: Certification = {
  name: '',
  authority: '',
  urlCode: '',
  date: '',
  description: [],
};

const initialSkill: Skill = {
  name: '',
  level: '',
};

const initialReference: Reference = {
  name: '',
  position: '',
  company: '',
  phone: '',
  email: '',
  relationship: '',
};

/* ─────────────────────────────
   Initial State
───────────────────────────── */
const initialState: ResumeState = {
  personalInfo: { ...initialPersonalInfo },
  careerObjective: '',
  careerSummary: '',
  workExperience: [],
  education: [],
  trainings: [],
  certifications: [],
  skills: [],
  references: [],
  template: 'Smart',
  lastUpdated: new Date().toISOString(),
};

/* ─────────────────────────────
   Slice
───────────────────────────── */
const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    resetResume: () => initialState,

    /* ───────────── Personal Info ───────────── */
    updatePersonalInfo(
      state,
      action: PayloadAction<Partial<PersonalInfo>>
    ) {
      state.personalInfo = {
        ...state.personalInfo,
        ...action.payload,
      };
    },

    /* ───────────── Career ───────────── */
    updateCareerObjective(state, action: PayloadAction<string>) {
      state.careerObjective = action.payload;
    },

    updateCareerSummary(state, action: PayloadAction<string>) {
      state.careerSummary = action.payload;
    },

    /* ───────────── Work Experience ───────────── */
    addWorkExperience(state) {
      state.workExperience.push({ ...initialWorkExperience });
    },

    updateWorkExperience(
      state,
      action: PayloadAction<{ index: number; data: Partial<WorkExperience> }>
    ) {
      const { index, data } = action.payload;
      if (state.workExperience[index]) {
        state.workExperience[index] = {
          ...state.workExperience[index],
          ...data,
        };
      }
    },

    removeWorkExperience(state, action: PayloadAction<number>) {
      state.workExperience.splice(action.payload, 1);
    },

    /* ───────────── Education ───────────── */
    addEducation(state) {
      state.education.push({ ...initialEducation });
    },

    updateEducation(
      state,
      action: PayloadAction<{ index: number; data: Partial<Education> }>
    ) {
      const { index, data } = action.payload;
      if (state.education[index]) {
        state.education[index] = {
          ...state.education[index],
          ...data,
        };
      }
    },

    removeEducation(state, action: PayloadAction<number>) {
      state.education.splice(action.payload, 1);
    },

    /* ───────────── Trainings ───────────── */
    addTraining(state) {
      state.trainings.push({ ...initialTraining });
    },

    updateTraining(
      state,
      action: PayloadAction<{ index: number; data: Partial<Training> }>
    ) {
      const { index, data } = action.payload;
      if (state.trainings[index]) {
        state.trainings[index] = {
          ...state.trainings[index],
          ...data,
        };
      }
    },

    removeTraining(state, action: PayloadAction<number>) {
      state.trainings.splice(action.payload, 1);
    },

    /* ───────────── Certifications ───────────── */
    addCertification(state) {
      state.certifications.push({ ...initialCertification });
    },

    updateCertification(
      state,
      action: PayloadAction<{ index: number; data: Partial<Certification> }>
    ) {
      const { index, data } = action.payload;
      if (state.certifications[index]) {
        state.certifications[index] = {
          ...state.certifications[index],
          ...data,
        };
      }
    },

    removeCertification(state, action: PayloadAction<number>) {
      state.certifications.splice(action.payload, 1);
    },

    /* ───────────── Skills ───────────── */
    addSkill(state) {
      state.skills.push({ ...initialSkill });
    },

    updateSkill(
      state,
      action: PayloadAction<{ index: number; data: Partial<Skill> }>
    ) {
      const { index, data } = action.payload;
      if (state.skills[index]) {
        state.skills[index] = {
          ...state.skills[index],
          ...data,
        };
      }
    },

    removeSkill(state, action: PayloadAction<number>) {
      state.skills.splice(action.payload, 1);
    },

    /* ───────────── References ───────────── */
    addReference(state) {
      state.references.push({ ...initialReference });
    },

    updateReference(
      state,
      action: PayloadAction<{ index: number; data: Partial<Reference> }>
    ) {
      const { index, data } = action.payload;
      if (state.references[index]) {
        state.references[index] = {
          ...state.references[index],
          ...data,
        };
      }
    },

    removeReference(state, action: PayloadAction<number>) {
      state.references.splice(action.payload, 1);
    },

    /* ───────────── Template ───────────── */
    setTemplate(state, action: PayloadAction<string>) {
      state.template = action.payload;
      state.lastUpdated = new Date().toISOString();
    },

    /* ───────────── Set Full Resume ───────────── */
    setResume(state, action: PayloadAction<Partial<ResumeState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  resetResume,
  updatePersonalInfo,
  updateCareerObjective,
  updateCareerSummary,
  addWorkExperience,
  updateWorkExperience,
  removeWorkExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addTraining,
  updateTraining,
  removeTraining,
  addCertification,
  updateCertification,
  removeCertification,
  addSkill,
  updateSkill,
  removeSkill,
  addReference,
  updateReference,
  removeReference,
  setTemplate,
  setResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;