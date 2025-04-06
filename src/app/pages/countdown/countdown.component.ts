import {Component, signal} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {QuizService} from '../../core/services/quiz.service';
import {StateService} from '../../core/services/state.service';

@Component({
  selector: 'app-countdown',
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent {
  counter = signal(1);
  private quizId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private stateService: StateService
  ) {
    this.route.queryParams.subscribe(params => {
      this.quizId = params['quiz'];
      this.startCountdown();
    });
  }

  startCountdown() {
    if (!this.quizId) {
      this.router.navigate(['/']);
      return;
    }

    // Fetch quiz data while counting down
    this.quizService.getQuiz(this.quizId).subscribe(quiz => {
      this.stateService.setQuiz(quiz);
    });
    const interval = setInterval(() => {
      const newValue = this.counter() - 1;
      this.counter.set(newValue);

      if (newValue === 0) {
        clearInterval(interval);
        this.router.navigate(['/quiz'], {
          queryParams: {
            quiz: this.quizId,
          }
        });
      }
    }, 1000);
  }
}
