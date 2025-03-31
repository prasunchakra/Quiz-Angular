import {Component, inject, Input, signal} from '@angular/core';
import {Question} from '../../core/models/question.model';
import {CommonModule} from '@angular/common';
import {StateService} from '../../core/services/state.service';

@Component({
  selector: 'app-essay',
  imports: [CommonModule],
  template: `
    <div>
      <p class="mb-4 font-medium">{{ question?.text }}</p>
      <textarea
        rows="10"
        [value]="value()"
        (input)="updateAnswer($event)"
        class="border border-gray-300 rounded px-3 py-2 w-full"
        placeholder="Write your essay answer here..."
      ></textarea>
    </div>
  `,
  styles:''
})
export class EssayComponent {
  @Input() question!: Question;
  private state = inject(StateService);
  value = signal<string>('');

  ngOnInit() {
    const saved = this.state.getAnswerForQuestion(this.question.id);
    if (saved) {
      this.value.set(saved.value);
    }
  }

  updateAnswer(event: Event) {
    const input = event.target as HTMLTextAreaElement;
    const val = input.value;
    this.value.set(val);

    this.state.saveAnswer({
      questionId: this.question.id,
      value: val
    });
  }
}
