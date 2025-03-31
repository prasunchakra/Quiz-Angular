import {Component, inject, Input, signal} from '@angular/core';
import {Question} from '../../core/models/question.model';
import {CommonModule} from '@angular/common';
import {StateService} from '../../core/services/state.service';

@Component({
  selector: 'app-matching',
  imports: [CommonModule],
  template: `
    <div>
      <p class="mb-4 font-medium">{{ question?.text }}</p>

      <div class="space-y-4">
        <div *ngFor="let left of question.options" class="flex items-center gap-4">
          <span class="w-1/3 font-medium">{{ left }}</span>
          <select
            class="border border-gray-300 rounded px-2 py-1 w-2/3"
            [value]="selected()[left] || ''"
            (change)="selectMatch(left, left)"
          >
            <option value="" disabled>Select match</option>
            <option *ngFor="let right of matches" [value]="right">{{ right }}</option>
          </select>
        </div>
      </div>
    </div>`
})
export class MatchingComponent {
  @Input() question!: Question;
  private state = inject(StateService);
  selected = signal<Record<string, string>>({});
  matches: string[] = [];

  ngOnInit() {
    if(this.question.metadata)
    this.matches = this.question.metadata['matches'] || [];
    const saved = this.state.getAnswerForQuestion(this.question.id);
    if (saved) {
      this.selected.set({ ...saved.value });
    }
  }

  selectMatch(left: string, right: string) {
    const current = { ...this.selected() };
    current[left] = right;
    this.selected.set(current);

    this.state.saveAnswer({
      questionId: this.question.id,
      value: current
    });
  }

  protected readonly HTMLSelectElement = HTMLSelectElement;
}
