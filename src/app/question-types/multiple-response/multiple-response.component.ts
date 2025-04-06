import {Component, inject, Input, signal} from '@angular/core';
import {Question} from '../../core/models/question.model';
import {CommonModule} from '@angular/common';
import {StateService} from '../../core/services/state.service';

@Component({
  selector: 'app-multiple-response',
  imports: [CommonModule],
  template: `
    <div>
      <p class="mb-4 font-medium">{{ question.text }}</p>
      <div class="space-y-2">
        <label *ngFor="let option of question.options" class="block">
          <input
            type="checkbox"
            [value]="option"
            [checked]="selected().includes(option)"
            (change)="toggleOption(option)"
            class="mr-2"
          />
          {{ option }}
        </label>
      </div>
    </div>`
})
export class MultipleResponseComponent {
  @Input() question!: Question;
  private state = inject(StateService);
  selected = signal<string[]>([]);

  ngOnInit() {
    const saved = this.state.getAnswerForQuestion(this.question.id);
    if (saved && Array.isArray(saved.value)) {
      this.selected.set([...saved.value]);
    }
  }

  toggleOption(option: string) {
    const current = this.selected();
    const updated = current.includes(option)
      ? current.filter(o => o !== option)
      : [...current, option];

    this.selected.set(updated);

    this.state.saveAnswer({
      questionId: this.question.id,
      value: updated,
      markedForReview: false
    });
  }
}
