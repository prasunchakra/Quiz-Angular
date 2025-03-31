import {Component, inject, Input, signal} from '@angular/core';
import {Question} from '../../core/models/question.model';
import {StateService} from '../../core/services/state.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-true-false',
  imports: [CommonModule],
  template: `
    <div>
      <p class="mb-4 font-medium">{{ question?.text }}</p>
      <div class="space-y-2">
        <label *ngFor="let option of ['True', 'False']" class="block">
          <input
            type="radio"
            name="trueFalse"
            [value]="option"
            [checked]="selected() === option"
            (change)="selectOption(option)"
            class="mr-2"
          />
          {{ option }}
        </label>
      </div>
    </div>`
})
export class TrueFalseComponent {
  @Input() question!: Question;
  private state = inject(StateService);
  selected = signal<string | null>(null);

  ngOnInit() {
    const saved = this.state.getAnswerForQuestion(this.question.id);
    if (saved) {
      this.selected.set(saved.value);
    }
  }

  selectOption(option: string) {
    this.selected.set(option);
    this.state.saveAnswer({
      questionId: this.question.id,
      value: option
    });
  }
}
