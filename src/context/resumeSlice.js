// src/features/resume/resumeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    professionalTitle: '',
    phoneNumber: '',
    emailAddress: '',
    address: {
      street: '',
      city: '',
      postal: '',
      country: ''
    },
    permanentAddress: {
      street: '',
      city: '',
      postal: '',
      country: ''
    },
    skype: '',
    linkedIn: '',
    portfolio: '',
    profilePicture: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    nid: '',
    passport: ''
  },
  workExperience: [],
  education: [],
  trainings: [],
  certifications: [],
  skills: [],
  references: [],
  careerObjective: '',
  careerSummary: ''
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updateCareerObjective: (state, action) => {
      state.careerObjective = action.payload;
    },
    updateCareerSummary: (state, action) => {
      state.careerSummary = action.payload;
    },
    // Work Experience
    addWorkExperience: (state) => {
      state.workExperience.push({
        companyName: '',
        position: '',
        city: '',
        country: '',
        from: '',
        to: '',
        currentlyWorking: false,
        description: []
      });
    },
    updateWorkExperience: (state, action) => {
      const { index, data } = action.payload;
      state.workExperience[index] = { ...state.workExperience[index], ...data };
    },
    removeWorkExperience: (state, action) => {
      state.workExperience.splice(action.payload, 1);
    },
    addDescriptionToWork: (state, action) => {
      const { index } = action.payload;
      state.workExperience[index].description.push('');
    },
    updateDescriptionToWork: (state, action) => {
      const { workIndex, descIndex, value } = action.payload;
      state.workExperience[workIndex].description[descIndex] = value;
    },
    removeDescriptionFromWork: (state, action) => {
      const { workIndex, descIndex } = action.payload;
      state.workExperience[workIndex].description.splice(descIndex, 1);
    },
    // Education
    addEducation: (state) => {
      state.education.push({
        institutionName: '',
        fieldOfStudy: '',
        degree: '',
        city: '',
        country: '',
        from: '',
        to: '',
        currentlyStudying: false,
        gpa: '',
        honors: '',
        description: []
      });
    },
    updateEducation: (state, action) => {
      const { index, data } = action.payload;
      state.education[index] = { ...state.education[index], ...data };
    },
    removeEducation: (state, action) => {
      state.education.splice(action.payload, 1);
    },
    addDescriptionToEducation: (state, action) => {
      const { index } = action.payload;
      state.education[index].description.push('');
    },
    updateDescriptionToEducation: (state, action) => {
      const { eduIndex, descIndex, value } = action.payload;
      state.education[eduIndex].description[descIndex] = value;
    },
    removeDescriptionFromEducation: (state, action) => {
      const { eduIndex, descIndex } = action.payload;
      state.education[eduIndex].description.splice(descIndex, 1);
    },
    // Trainings
    addTraining: (state) => {
      state.trainings.push({
        name: '',
        institution: '',
        duration: '',
        from: '',
        to: '',
        description: []
      });
    },
    updateTraining: (state, action) => {
      const { index, data } = action.payload;
      state.trainings[index] = { ...state.trainings[index], ...data };
    },
    removeTraining: (state, action) => {
      state.trainings.splice(action.payload, 1);
    },
    addDescriptionToTraining: (state, action) => {
      const { index } = action.payload;
      state.trainings[index].description.push('');
    },
    updateDescriptionToTraining: (state, action) => {
      const { trainIndex, descIndex, value } = action.payload;
      state.trainings[trainIndex].description[descIndex] = value;
    },
    removeDescriptionFromTraining: (state, action) => {
      const { trainIndex, descIndex } = action.payload;
      state.trainings[trainIndex].description.splice(descIndex, 1);
    },
    // Certifications
    addCertification: (state) => {
      state.certifications.push({
        name: '',
        authority: '',
        urlCode: '',
        date: '',
        description: []
      });
    },
    updateCertification: (state, action) => {
      const { index, data } = action.payload;
      state.certifications[index] = { ...state.certifications[index], ...data };
    },
    removeCertification: (state, action) => {
      state.certifications.splice(action.payload, 1);
    },
    addDescriptionToCertification: (state, action) => {
      const { index } = action.payload;
      state.certifications[index].description.push('');
    },
    updateDescriptionToCertification: (state, action) => {
      const { certIndex, descIndex, value } = action.payload;
      state.certifications[certIndex].description[descIndex] = value;
    },
    removeDescriptionFromCertification: (state, action) => {
      const { certIndex, descIndex } = action.payload;
      state.certifications[certIndex].description.splice(descIndex, 1);
    },
    // Skills
    addSkillCategory: (state) => {
      state.skills.push({ category: '', skills: [] });
    },
    updateSkillCategory: (state, action) => {
      const { index, category } = action.payload;
      state.skills[index].category = category;
    },
    removeSkillCategory: (state, action) => {
      state.skills.splice(action.payload, 1);
    },
    addSkillToCategory: (state, action) => {
      const { index } = action.payload;
      state.skills[index].skills.push({ name: '', level: '' });
    },
    updateSkillInCategory: (state, action) => {
      const { catIndex, skillIndex, data } = action.payload;
      state.skills[catIndex].skills[skillIndex] = { ...state.skills[catIndex].skills[skillIndex], ...data };
    },
    removeSkillFromCategory: (state, action) => {
      const { catIndex, skillIndex } = action.payload;
      state.skills[catIndex].skills.splice(skillIndex, 1);
    },
    // References
    addReference: (state) => {
      state.references.push({
        name: '',
        position: '',
        company: '',
        phone: '',
        email: '',
        relationship: ''
      });
    },
    updateReference: (state, action) => {
      const { index, data } = action.payload;
      state.references[index] = { ...state.references[index], ...data };
    },
    removeReference: (state, action) => {
      state.references.splice(action.payload, 1);
    },
  },
});

export const {
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