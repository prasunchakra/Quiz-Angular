import { Injectable, signal } from '@angular/core';
import { Answer, Question } from '../models/question.model';
import { Quiz } from '../models/quiz.model';
@Injectable({
  providedIn: 'root'
})
export class StateService {
  currentQuiz = signal<Quiz | null>(null);
  numberOfQuestions = 0;
  currentQuestionIndex = signal(0);
  currentQuestion = signal<Question | null>(null);
  answers = signal<Record<string, Answer>>({});
  setQuiz(quiz: Quiz) {
    this.currentQuiz.set(quiz);
    this.numberOfQuestions = quiz.questions.length;
    sessionStorage.setItem('currentQuiz', JSON.stringify(quiz));
  }
  
  loadStoredQuiz(): Quiz | null {
    const storedQuiz = sessionStorage.getItem('currentQuiz');
    if (!storedQuiz) return null;
    
    const quiz = JSON.parse(storedQuiz);
    this.setQuiz(quiz);
    return quiz;
  }
  saveAnswer(answer: Answer) {
    const all = this.answers();
    const newAnswer: Answer = {
      questionId: answer.questionId,
      value: answer.value,
      markedForReview: answer.markedForReview
    };
    this.answers.set({ ...all, [answer.questionId]: newAnswer });
  }

  getAnswerForQuestion(questionId: string): Answer | undefined {
    return this.answers()[questionId];
  }
  getAnswers(): Record<string, Answer> {
    return this.answers();
  }
  getNumberOfQuestions(): number {
    return this.numberOfQuestions;
  }

  getCurrentQuestion(): Question | undefined {
    let quiz : Quiz | null = this.currentQuiz();
    if (!quiz) {
      const storedQuiz = sessionStorage.getItem('currentQuiz');
      if (!storedQuiz) return undefined;
      quiz = JSON.parse(storedQuiz);
    }
    return quiz?.questions[this.currentQuestionIndex()];
  }
  setCurrentQuestion(question: Question) {
    this.currentQuestion.set(question);
  }

  goTo(index: number) {
    const quiz = this.currentQuiz() ?? this.loadStoredQuiz();
    if (quiz && index >= 0 && index < quiz.questions.length) {
      this.currentQuestionIndex.set(index);
    }
  }

  markForReview(questionId: string) {
    const all = this.answers();
    const existing = all[questionId];
    if (existing) {
      this.answers.set({ 
        ...all, 
        [questionId]: { ...existing, markedForReview: true }
      });
    } else {
      this.answers.set({ 
        ...all, 
        [questionId]: { questionId, value: '', markedForReview: true }
      });
    }
  }

  clearAnswer(questionId: string) {
    const all = { ...this.answers() };
    delete all[questionId];
    this.answers.set(all);
  }

  initializeFromStorage() {
    const storedQuiz = sessionStorage.getItem('currentQuiz');
    if (storedQuiz) {
      const quiz = JSON.parse(storedQuiz);
      this.setQuiz(quiz);
    }
  }
  clearCurrentQuiz() {
    this.currentQuiz.set(null);
    this.answers.set({});
    this.currentQuestionIndex.set(0);
    this.currentQuestion.set(null);
    sessionStorage.removeItem('currentQuiz');
    sessionStorage.removeItem('submission');
    sessionStorage.removeItem('quizId');
  }
}
