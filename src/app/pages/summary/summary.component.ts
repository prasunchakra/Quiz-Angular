import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StateService} from '../../core/services/state.service';
import {Router} from '@angular/router';
import { QuizService } from '../../core/services/quiz.service';

@Component({
  selector: 'app-summary',
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  private quizService = inject(QuizService);
  private state = inject(StateService);
  private router = inject(Router);

  questions = this.state.currentQuiz()?.questions;
  answers = this.state.answers();

  private stats = {
    answered: 0,
    notAnswered: 0,
    marked: 0,

    total: 0
  };

  constructor() { 
    this.calculateStats();
  }



  private calculateStats() {
    this.stats.total = this.questions?.length || 0;
    
    const answers = Object.values(this.answers);
    this.stats.notAnswered = this.stats.total - Object.keys(this.answers).length;
    this.stats.answered = 0;
    this.stats.marked = 0;

    for (const answer of answers) {
      if (answer.markedForReview) {
        this.stats.marked++;
      } else if (answer.value !== '' && answer.value !== null && answer.value !== undefined) {
        this.stats.answered++;
      } 
    }
  }

  get total() {
    return this.stats.total;
  }

  get answered() {
    return this.stats.answered;
  }

  get notAnswered() {
    return this.stats.notAnswered;
  }

  get marked() {
    return this.stats.marked;
  }


  goBack() {
    this.router.navigate(['/quiz']);
  }

  submit() {
    const submission = sessionStorage.getItem('submission');
    if (submission) {
      this.quizService.submitQuiz(JSON.parse(submission)).subscribe(result => {
        sessionStorage.setItem('result', JSON.stringify(result));
        this.router.navigate(['/result']); 
      });
    }
  }
}
