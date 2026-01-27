export type PracticeMode = 'full' | 'technical' | 'scenario';
export type QuestionType = 'technical' | 'scenario';

export interface Question {
  question: string;
  type: QuestionType;
  category?: string;
}

export interface ProgressItem {
  question: string;
  type: QuestionType;
  timeSpent: number;
  transcript: string;
}

export interface QuestionAnalysis {
  question: string;
  userAnswer: string;
  score: number;
  feedback: string;
  suggestedAnswer: string;
}

export interface AnalysisResult {
  overallScore: number;
  questionAnalysis: QuestionAnalysis[];
  improvementSuggestions: string[];
}

export interface FormData {
  jobDescription: string;
  document: FileList | null;
}

export interface SpeechDetection {
  audioContext: AudioContext;
  stream: MediaStream;
  javascriptNode: ScriptProcessorNode;
}

export interface InterviewState {
  step: number;
  questions: Question[];
  currentQuestionIndex: number;
  isRecording: boolean;
  analysis: AnalysisResult | null;
  isLoading: boolean;
  transcript: string;
  timeElapsed: number;
  isSpeaking: boolean;
  practiceMode: PracticeMode;
  showVirtualInterviewer: boolean;
  progress: ProgressItem[];
  fileName: string;
  isUploading: boolean;
  uploadProgress: number;
  file: File | null;
  virtualInterviewerText: string;
  isSpeakingAI: boolean;
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];