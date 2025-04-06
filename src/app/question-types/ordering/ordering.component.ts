import {Component, inject, Input, signal} from '@angular/core';
import {Question} from '../../core/models/question.model';
import {CommonModule} from '@angular/common';
import {StateService} from '../../core/services/state.service';

@Component({
  selector: 'app-ordering',
  imports: [CommonModule],
  template: `
    <div>
      <p class="mb-4 font-medium">{{ question.text }}</p>
      <div class="space-y-4">
        <div *ngFor="let option of question.options" class="flex items-center gap-4">
          <span class="w-2/3 font-medium">{{ option }}</span>
          <select
            class="border border-gray-300 rounded px-2 py-1 w-1/3"
            [value]="selected()[option] || ''"
            (change)="selectOrder(option, option)"
          >
            <option value="" disabled>Choose order</option>
            <option *ngFor="let i of orderIndexes" [value]="i">{{ i }}</option>
          </select>
        </div>
      </div>
    </div>`
})
export class OrderingComponent {
  @Input() question!: Question;
  private state = inject(StateService);
  selected = signal<Record<string, number>>({});
  orderIndexes: number[] = [];

  ngOnInit() {
    this.orderIndexes = this.question.options ? this.question.options.map((_, idx) => idx + 1): [];
    const saved = this.state.getAnswerForQuestion(this.question.id);
    if (saved) {
      this.selected.set(saved.value as Record<string, number>);
    }
  }

  selectOrder(option: string, position: string) {
    const current = { ...this.selected() };
    current[option] = Number(position);
    this.selected.set(current);

    this.state.saveAnswer({
      questionId: this.question.id,
      value: current,
      markedForReview: false
    });
  }
}
