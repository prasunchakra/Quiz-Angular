import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../core/services/state.service';

@Component({
  standalone: true,
  selector: 'app-question-nav-panel',
  imports: [CommonModule],
  templateUrl: './question-nav-panel.component.html',
})
export class QuestionNavPanelComponent {
  private state = inject(StateService);

  get questions() {
    return this.state.questions();
  }

  get answers() {
    return this.state.answers();
  }

  goTo(index: number) {
    this.state.goTo(index);
  }

  getStatus(index: number): string {
    const q = this.questions[index];
    const a = this.answers.find(ans => ans.questionId === q.id);

    if (!a) return 'not-visited';
    if (a.markedForReview) return 'marked';
    if (a.value !== null && a.value !== undefined && a.value !== '') return 'answered';
    return 'not-answered';
  }
}
