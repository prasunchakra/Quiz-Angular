import { Question } from "./question.model";

export interface Quiz {
  id: string;
  title: string;
  description: string;
  status: 'Draft' | 'Published' | 'Archived';
  isPublic: boolean;
  timeLimit: number | null;
  passingScore: number | null;
  questions: Question[];
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
}
