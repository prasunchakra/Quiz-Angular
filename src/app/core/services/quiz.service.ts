import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quiz } from '../models/quiz.model';
import { QuizSubmission } from '../enterface/quiz-submission.interface';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getQuestions(quizId: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/quizzes/${quizId}`);
  }
  getQuiz(quizId: string): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.baseUrl}/quizzes/${quizId}`);
  }

  submitQuiz(submissionObject: QuizSubmission): Observable<any> {
    console.log(submissionObject);
    return this.http.post(`${this.baseUrl}/submission`, submissionObject);
  }

}
