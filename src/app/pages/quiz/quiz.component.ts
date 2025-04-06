import {Component, inject} from '@angular/core';
import {QuizService} from '../../core/services/quiz.service';
import {StateService} from '../../core/services/state.service';
import {CommonModule} from '@angular/common';
import { QuestionRendererComponent } from '../../question-types/question-renderer.component';
import {QuestionNavPanelComponent} from '../../components/question-nav-panel/question-nav-panel.component';
import {Router, ActivatedRoute} from '@angular/router';
import { QuizSubmission } from '../../core/enterface/quiz-submission.interface';
import { NgeventService } from '../../core/services/ngevent.service';
@Component({
  selector: 'app-quiz',
  imports: [CommonModule, QuestionRendererComponent, QuestionNavPanelComponent,],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {

  private stateService = inject(StateService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private quizId = this.route.snapshot.queryParams['quiz'];
  private userId = "fe980824-1f31-4ab5-8f35-2a5216732ec6";
  private questionIndex = this.route.snapshot.queryParams['question'];
  
  constructor(private eventService: NgeventService) {}
  ngOnInit() {
    this.stateService.goTo(Number(this.questionIndex) || 0);
  }
  
  get currentQuestion() {
    return this.stateService.getCurrentQuestion();
  }

  get currentIndex() {
    return this.stateService.currentQuestionIndex();
  }

  goNext() {
    const nextIndex = this.currentIndex + 1;
    const totalQuestions = this.stateService.getNumberOfQuestions();
    const targetIndex = nextIndex >= totalQuestions ? 0 : nextIndex;
    this.stateService.goTo(targetIndex);
  }

  goPrev() {
    const prevIndex = this.currentIndex - 1;
    const totalQuestions = this.stateService.getNumberOfQuestions();
    const targetIndex = prevIndex < 0 ? totalQuestions - 1 : prevIndex;
    this.stateService.goTo(targetIndex);
  }

  clearAnswer() {
    const current = this.currentQuestion;
    if (current) {
      this.stateService.clearAnswer(current.id);
      this.eventService.emitClearInput();
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
    const submission: QuizSubmission = {
      quizId: this.quizId,
      userId: this.userId,
      answers: this.stateService.getAnswers(),
      metadata: {
        submittedAt: new Date().toISOString(),
        totalTimeSpent: 0,
        totalQuestions: this.stateService.getNumberOfQuestions()
      }
    };
    sessionStorage.setItem('submission', JSON.stringify(submission));
    this.router.navigate(['/summary']);
    
  }
}
