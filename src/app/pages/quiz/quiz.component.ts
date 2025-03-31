import {Component, inject} from '@angular/core';
import {QuizService} from '../../core/services/quiz.service';
import {StateService} from '../../core/services/state.service';
import {CommonModule} from '@angular/common';
import { QuestionRendererComponent } from '../../question-types/question-renderer.component';
import {QuestionNavPanelComponent} from '../../components/question-nav-panel/question-nav-panel.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, QuestionRendererComponent, QuestionNavPanelComponent,],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  private quizService = inject(QuizService);
  private stateService = inject(StateService);
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.quizService.getQuestions().subscribe(questions => {
      this.stateService.setQuestions(questions);
    });
  }

  get currentQuestion() {
    return this.stateService.getCurrentQuestion();
  }

  get currentIndex() {
    return this.stateService.currentQuestionIndex();
  }

  goNext() {
    this.stateService.goTo(this.currentIndex + 1);
  }

  goPrev() {
    this.stateService.goTo(this.currentIndex - 1);
  }

  clearAnswer() {
    const current = this.currentQuestion;
    if (current) {
      this.stateService.clearAnswer(current.id);
    }
  }

  markForReview() {
    const current = this.currentQuestion;
    if (current) {
      this.stateService.markForReview(current.id);
      this.goNext();
    }
  }

  saveAndNext() {
    // Already auto-saving on input, but can force save if needed
    this.goNext();
  }

  endTest() {
    this.router.navigate(['/summary']);
  }
}
