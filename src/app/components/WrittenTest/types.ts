//types

export interface InitSessionPayload {
  jobTitle: string;
  experienceYears: number;
  skills: string[];
  jobDescription: string;
  durationMinutes: number;
}

export interface SessionResponse {
  sessionId: string;
  status: 'pending' | 'active' | 'completed' | 'expired';
  total?: number;
}

export interface QuestionData {
  sessionId: string;
  index: number;
  question: string;
  total: number;
  remainingSeconds: number;
}

// request payload (frontend → backend)
export interface SubmitAnswerPayload {
  sessionId: string;
  answer: string;
}

// response payload (backend → frontend)
export interface SubmitAnswerResponse {
  status: 'active' | 'completed';
  currentQuestion: number;
  totalScore?: number;
}

export interface TimeLeftResponse {
  remainingSeconds: number;
}

export interface Question {
  index: number;
  question: string;
  idealAnswer: string;
  topicTags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  userAnswer?: string;
  feedback?: string;
  isCorrect?: boolean;
  score?: number;
}

export interface AssessmentResult {
  id: string;
  jobTitle: string;
  totalScore: number;
  status: string;
  questions: Question[];
  startedAt?: string;
  completedAt?: string;
}

