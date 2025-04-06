import { QuestionType } from '../enterface/question-type.enum';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options: string[] | null;
  correctAnswer: string;
  section: string;
  marks: number;
  metadata: Record<string, any> | null;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Draft' | 'Published' | 'Archived';
  explanation: string | null;
  tags: string[] | null;
  wrongAnswerFeedback: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Answer {
  questionId: string;
  value: string | number | boolean | Record<string, number> | Record<string, string> | string[];
  markedForReview: boolean;
}

