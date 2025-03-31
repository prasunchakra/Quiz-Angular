import {Component, inject, Input, signal} from '@angular/core';
import {Question} from '../../core/models/question.model';
import {CommonModule} from '@angular/common';
import {StateService} from '../../core/services/state.service';

@Component({
  selector: 'app-mcq',
  imports: [CommonModule],
  template: `
    <div>
      <p class="mb-4 font-medium">{{ question?.text }}</p>
      <div class="space-y-2">
        <label *ngFor="let option of question?.options" class="block">
          <input
            type="radio"
            name="mcq"
            [value]="option"
            [checked]="selected() === option"
            (change)="selectOption(option)"
            class="mr-2"
          />
          {{ option }}
        </label>
      </div>
    </div>
  `,
  styles:''
})
export class McqComponent {
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
