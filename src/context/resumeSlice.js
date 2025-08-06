// src/features/resume/resumeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    professionalTitle: '',
    phoneNumber: '',
    emailAddress: '',
    skype: '',
    linkedIn: '',
    portfolio: '',
    profilePicture: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    nid: '',
    passport: '',
    address: { street: '', city: '', postal: '', country: '' },
    permanentAddress: { street: '', city: '', postal: '', country: '' },
  },
  careerObjective: '',
  careerSummary: '',
  workExperience: [],
  education: [],
  trainings: [],
  certifications: [],
  skills: [],
  references: [],
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    resetResume: () => initialState,
    updatePersonalInfo(state, action) {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updateCareerObjective(state, action) {
      state.careerObjective = action.payload;
    },
    updateCareerSummary(state, action) {
      state.careerSummary = action.payload;
    },
    addWorkExperience(state) {
      state.workExperience.push({
        companyName: '',
        position: '',
        city: '',
        country: '',
        from: '',
        to: '',
        currentlyWorking: false,
        description: [],
      });
    },
    updateWorkExperience(state, action) {
      state.workExperience[action.payload.index] = {
        ...state.workExperience[action.payload.index],
        ...action.payload.data,
      };
    },
    removeWorkExperience(state, action) {
      state.workExperience.splice(action.payload, 1);
    },
    addDescriptionToWork(state, action) {
      state.workExperience[action.payload.index].description.push('');
    },
    updateDescriptionToWork(state, action) {
      state.workExperience[action.payload.workIndex].description[action.payload.descIndex] = action.payload.value;
    },
    removeDescriptionFromWork(state, action) {
      state.workExperience[action.payload.workIndex].description.splice(action.payload.descIndex, 1);
    },
    addEducation(state) {
      state.education.push({
        institutionName: '',
        fieldOfStudy: '',
        degree: '',
        city: '',
        country: '',
        from: '',
        to: '',
        gpa: '',
        honors: '',
        currentlyStudying: false,
        description: [],
      });
    },
    updateEducation(state, action) {
      state.education[action.payload.index] = {
        ...state.education[action.payload.index],
        ...action.payload.data,
      };
    },
    removeEducation(state, action) {
      state.education.splice(action.payload, 1);
    },
    addDescriptionToEducation(state, action) {
      state.education[action.payload.index].description.push('');
    },
    updateDescriptionToEducation(state, action) {
      state.education[action.payload.educationIndex].description[action.payload.descIndex] = action.payload.value;
    },
    removeDescriptionFromEducation(state, action) {
      state.education[action.payload.educationIndex].description.splice(action.payload.descIndex, 1);
    },
    addTraining(state) {
      state.trainings.push({
        name: '',
        institution: '',
        duration: '',
        from: '',
        to: '',
        description: [],
      });
    },
    updateTraining(state, action) {
      state.trainings[action.payload.index] = {
        ...state.trainings[action.payload.index],
        ...action.payload.data,
      };
    },
    removeTraining(state, action) {
      state.trainings.splice(action.payload, 1);
    },
    addDescriptionToTraining(state, action) {
      state.trainings[action.payload.index].description.push('');
    },
    updateDescriptionToTraining(state, action) {
      state.trainings[action.payload.trainingIndex].description[action.payload.descIndex] = action.payload.value;
    },
    removeDescriptionFromTraining(state, action) {
      state.trainings[action.payload.trainingIndex].description.splice(action.payload.descIndex, 1);
    },
    addCertification(state) {
      state.certifications.push({
        name: '',
        authority: '',
        urlCode: '',
        date: '',
        description: [],
      });
    },
    updateCertification(state, action) {
      state.certifications[action.payload.index] = {
        ...state.certifications[action.payload.index],
        ...action.payload.data,
      };
    },
    removeCertification(state, action) {
      state.certifications.splice(action.payload, 1);
    },
    addDescriptionToCertification(state, action) {
      state.certifications[action.payload.index].description.push('');
    },
    updateDescriptionToCertification(state, action) {
      state.certifications[action.payload.certificationIndex].description[action.payload.descIndex] = action.payload.value;
    },
    removeDescriptionFromCertification(state, action) {
      state.certifications[action.payload.certificationIndex].description.splice(action.payload.descIndex, 1);
    },
    addSkillCategory(state) {
      state.skills.push({ category: '', skills: [] });
    },
    updateSkillCategory(state, action) {
      state.skills[action.payload.index].category = action.payload.category;
    },
    removeSkillCategory(state, action) {
      state.skills.splice(action.payload, 1);
    },
    addSkillToCategory(state, action) {
      state.skills[action.payload.index].skills.push({ name: '', level: '' });
    },
    updateSkillInCategory(state, action) {
      state.skills[action.payload.catIndex].skills[action.payload.skillIndex] = {
        ...state.skills[action.payload.catIndex].skills[action.payload.skillIndex],
        ...action.payload.data,
      };
    },
    removeSkillFromCategory(state, action) {
      state.skills[action.payload.catIndex].skills.splice(action.payload.skillIndex, 1);
    },
    addReference(state) {
      state.references.push({
        name: '',
        position: '',
        company: '',
        phone: '',
        email: '',
        relationship: '',
      });
    },
    updateReference(state, action) {
      state.references[action.payload.index] = {
        ...state.references[action.payload.index],
        ...action.payload.data,
      };
    },
    removeReference(state, action) {
      state.references.splice(action.payload, 1);
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
  addDescriptionToWork,
  updateDescriptionToWork,
  removeDescriptionFromWork,
  addEducation,
  updateEducation,
  removeEducation,
  addDescriptionToEducation,
  updateDescriptionToEducation,
  removeDescriptionFromEducation,
  addTraining,
  updateTraining,
  removeTraining,
  addDescriptionToTraining,
  updateDescriptionToTraining,
  removeDescriptionFromTraining,
  addCertification,
  updateCertification,
  removeCertification,
  addDescriptionToCertification,
  updateDescriptionToCertification,
  removeDescriptionFromCertification,
  addSkillCategory,
  updateSkillCategory,
  removeSkillCategory,
  addSkillToCategory,
  updateSkillInCategory,
  removeSkillFromCategory,
  addReference,
  updateReference,
  removeReference,
} = resumeSlice.actions;
export default resumeSlice.reducer;