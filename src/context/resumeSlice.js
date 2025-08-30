// src/features/resume/resumeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialPersonalInfo = {
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
  address: { street: '', city: '', postal: '', country: '' },
  permanentAddress: { street: '', city: '', postal: '', country: '' },
};

const initialWorkExperience = {
  companyName: '',
  position: '',
  city: '',
  country: '',
  from: '',
  to: '',
  currentlyWorking: false,
  description: [],
};

const initialEducation = {
  institutionName: '',
  fieldOfStudy: '',
  degree: '',
  city: '',
  country: '',
  passingYear: '',
  currentlyStudying: false,
  gpa: '',
  honors: ''
};

const initialTraining = {
  name: '',
  institution: '',
  duration: '',
  from: '',
  to: '',
  description: [],
};

const initialCertification = {
  name: '',
  authority: '',
  urlCode: '',
  date: '',
  description: [],
};

const initialSkill = {
  name: '',
  level: '',
};

const initialReference = {
  name: '',
  position: '',
  company: '',
  phone: '',
  email: '',
  relationship: '',
};

const initialState = {
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

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    resetResume: () => initialState,

    // Personal Info
    updatePersonalInfo(state, action) {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },

    // Career
    updateCareerObjective(state, action) {
      state.careerObjective = action.payload;
    },
    updateCareerSummary(state, action) {
      state.careerSummary = action.payload;
    },

    // Work Experience
    addWorkExperience(state) {
      state.workExperience.push({ ...initialWorkExperience });
    },
    updateWorkExperience(state, action) {
      const { index, data } = action.payload;
      if (state.workExperience[index]) {
        state.workExperience[index] = { ...state.workExperience[index], ...data };
      }
    },
    removeWorkExperience(state, action) {
      state.workExperience.splice(action.payload, 1);
    },

    // Education
    addEducation(state) {
      state.education.push({ ...initialEducation });
    },
    updateEducation(state, action) {
      const { index, data } = action.payload;
      if (state.education[index]) {
        state.education[index] = { ...state.education[index], ...data };
      }
    },
    removeEducation(state, action) {
      state.education.splice(action.payload, 1);
    },

    // Trainings
    addTraining(state) {
      state.trainings.push({ ...initialTraining });
    },
    updateTraining(state, action) {
      const { index, data } = action.payload;
      if (state.trainings[index]) {
        state.trainings[index] = { ...state.trainings[index], ...data };
      }
    },
    removeTraining(state, action) {
      state.trainings.splice(action.payload, 1);
    },

    // Certifications
    addCertification(state) {
      state.certifications.push({ ...initialCertification });
    },
    updateCertification(state, action) {
      const { index, data } = action.payload;
      if (state.certifications[index]) {
        state.certifications[index] = { ...state.certifications[index], ...data };
      }
    },
    removeCertification(state, action) {
      state.certifications.splice(action.payload, 1);
    },

    // Skills (flat array)
    addSkill(state) {
      state.skills.push({ ...initialSkill });
    },
    updateSkill(state, action) {
      const { index, data } = action.payload;
      if (state.skills[index]) {
        state.skills[index] = { ...state.skills[index], ...data };
      }
    },
    removeSkill(state, action) {
      state.skills.splice(action.payload, 1);
    },

    // References
    addReference(state) {
      state.references.push({ ...initialReference });
    },
    updateReference(state, action) {
      const { index, data } = action.payload;
      if (state.references[index]) {
        state.references[index] = { ...state.references[index], ...data };
      }
    },
    removeReference(state, action) {
      state.references.splice(action.payload, 1);
    },

    // Template
    setTemplate(state, action) {
      state.template = action.payload;
      state.lastUpdated = new Date().toISOString();
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
} = resumeSlice.actions;

export default resumeSlice.reducer;
