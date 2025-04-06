import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../core/services/state.service';
import { AnswerStatus } from '../../core/enterface/answer-status.enum';
@Component({
  standalone: true,
  selector: 'app-question-nav-panel',
  imports: [CommonModule],
  templateUrl: './question-nav-panel.component.html',
})
export class QuestionNavPanelComponent {
  private state = inject(StateService);
  protected AnswerStatus = AnswerStatus;
  get questions() {
    return this.state.currentQuiz()?.questions || [];
  }

  get answers() {
    return this.state.answers();
  }

  goTo(index: number) {
    this.state.goTo(index);
  }

  getStatus(index: number): string {
    const q = this.questions[index];
    const a = this.answers[q.id];

    if (!a) return AnswerStatus.NOT_ANSWERED;
    if (a.markedForReview) return AnswerStatus.MARKED;
    return AnswerStatus.ANSWERED;
  }
}
