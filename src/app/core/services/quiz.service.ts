import { Injectable } from '@angular/core';
import { QuestionType } from '../enums/question-type.enum';
import { Question } from '../models/question.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor() {}

  getQuestions(): Observable<Question[]> {
    const dummyQuestions: Question[] = [
      {
        id: 'q1',
        type: QuestionType.MultipleChoice,
        text: 'What is the capital of France?',
        options: ['Paris', 'Berlin', 'Rome', 'Madrid'],
        correctAnswer: 'Paris',
        section: 'Geography',
        marks: 1
      },
      {
        id: 'q2',
        type: QuestionType.MultipleResponse,
        text: 'Which of the following are prime numbers?',
        options: ['2', '3', '4', '5'],
        correctAnswer: ['2', '3', '5'],
        section: 'Math',
        marks: 2
      },
      {
        id: 'q3',
        type: QuestionType.TrueFalse,
        text: 'The Earth is flat.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        section: 'Science',
        marks: 1
      },
      {
        id: 'q4',
        type: QuestionType.FillInTheBlank,
        text: '_____ is the process of photosynthesis.',
        correctAnswer: 'Chlorophyll',
        section: 'Biology',
        marks: 1
      },
      {
        id: 'q5',
        type: QuestionType.Matching,
        text: 'Match the following countries with their capitals.',
        options: ['India', 'France', 'Germany'], // Left side
        correctAnswer: { India: 'New Delhi', France: 'Paris', Germany: 'Berlin' },
        metadata: {
          matches: ['New Delhi', 'Paris', 'Berlin', 'Rome'] // Right side choices
        },
        section: 'Geography',
        marks: 3
      },
      {
        id: 'q6',
        type: QuestionType.Ordering,
        text: 'Arrange the planets in order from the sun.',
        options: ['Earth', 'Mars', 'Venus', 'Mercury'],
        correctAnswer: ['Mercury', 'Venus', 'Earth', 'Mars'],
        section: 'Astronomy',
        marks: 2
      },
      {
        id: 'q7',
        type: QuestionType.Numeric,
        text: 'What is 12 × 8?',
        correctAnswer: 96,
        section: 'Math',
        marks: 1
      },
      {
        id: 'q8',
        type: QuestionType.ShortAnswer,
        text: 'Define gravity in your own words.',
        correctAnswer: '',
        section: 'Physics',
        marks: 2
      },
      {
        id: 'q9',
        type: QuestionType.Essay,
        text: 'Explain the causes and effects of World War II.',
        correctAnswer: '',
        section: 'History',
        marks: 5
      },
      {
        id: 'q10',
        type: QuestionType.FileUpload,
        text: 'Upload a PDF of your science project.',
        correctAnswer: '',
        section: 'Projects',
        marks: 5
      }
    ];

    return of(dummyQuestions);
  }
}
