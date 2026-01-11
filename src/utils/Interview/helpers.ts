import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from '../../types';

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: 'File size exceeds 5MB limit' };
  }
  
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { isValid: false, error: 'Invalid file type. Please upload PDF, DOCX, or TXT files' };
  }
  
  return { isValid: true };
};

export const getScoreColor = (score: number): string => {
  if (score >= 90) return 'bg-green-100 text-green-800';
  if (score >= 70) return 'bg-blue-100 text-blue-800';
  return 'bg-red-100 text-red-800';
};

export const getOverallScoreMessage = (score: number): string => {
  if (score >= 95) return 'Outstanding! You demonstrate expert-level skills.';
  if (score >= 80) return 'Well done! Solid performance with minor areas for refinement.';
  return 'Good effort! Focus on the feedback to boost your score next time.';
};