import { QuestionType } from '../enums/question-type.enum';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[]; // For MCQ, MR, TrueFalse
  correctAnswer?: any; // For evaluation
  section: string;
  marks: number;
  negativeMarks?: number;
  metadata?: Record<string, any>;
}

export interface Answer {
  questionId: string;
  value: any; // String, array, number, or file
  markedForReview?: boolean;
  visited?: boolean;
}
