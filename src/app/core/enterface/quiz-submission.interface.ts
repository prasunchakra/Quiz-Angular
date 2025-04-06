import { Answer } from "../models/question.model";

export interface QuizSubmission {
    quizId: string;
    userId: string;
    answers: Record<string, Answer>;
    metadata: {
      submittedAt: string;
      totalTimeSpent: number;
      totalQuestions: number;
    };
  }