import { Injectable, signal } from '@angular/core';
import { Answer, Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  questions = signal<Question[]>([]);
  currentQuestionIndex = signal(0);
  answers = signal<Answer[]>([]);

  setQuestions(questions: Question[]) {
    this.questions.set(questions);
  }

  saveAnswer(answer: Answer) {
    const all = this.answers();
    const existing = all.find(a => a.questionId === answer.questionId);
    if (existing) {
      Object.assign(existing, answer);
    } else {
      all.push(answer);
    }
    this.answers.set([...all]);
  }

  getAnswerForQuestion(questionId: string): Answer | undefined {
    return this.answers().find(a => a.questionId === questionId);
  }

  getCurrentQuestion(): Question | undefined {
    return this.questions()[this.currentQuestionIndex()];
  }

  goTo(index: number) {
    console.log('Going to question', index);
    if (index >= 0 && index < this.questions().length) {
      this.currentQuestionIndex.set(index);
    }
  }

  markForReview(questionId: string) {
    const all = this.answers();
    const existing = all.find(a => a.questionId === questionId);
    if (existing) {
      existing.markedForReview = true;
    } else {
      all.push({ questionId, value: '', markedForReview: true });
    }
    this.answers.set([...all]);
  }

  clearAnswer(questionId: string) {
    const all = this.answers().filter(a => a.questionId !== questionId);
    this.answers.set([...all]);
  }
}
