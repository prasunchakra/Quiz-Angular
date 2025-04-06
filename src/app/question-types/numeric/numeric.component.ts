import {Component, EventEmitter, inject, Input, signal} from '@angular/core';
import {Question} from '../../core/models/question.model';
import {CommonModule} from '@angular/common';
import {StateService} from '../../core/services/state.service';
import { NgeventService } from '../../core/services/ngevent.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-numeric',
  imports: [CommonModule],
  template: `
    <div>
      <p class="mb-4 font-medium">{{ question.text }}</p>
      <input
        type="number"
        [value]="value()"
        (input)="updateAnswer($event)"
        class="border border-gray-300 rounded px-3 py-2 w-full"
        placeholder="Enter a number"
      />
    </div>`
})
export class NumericComponent {
  @Input() question!: Question;
  private state = inject(StateService);
  value = signal<number | ''>('');
  constructor(private eventService: NgeventService) {
    this.eventService.clearInput$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.value.set('');
      }); 
  }
  ngOnInit() {
    const saved = this.state.getAnswerForQuestion(this.question.id);
    if (saved) {
      this.value.set(saved.value as number);
    }
  }

  updateAnswer(event: Event) {
    const input = event.target as HTMLInputElement;
    const numericValue = input.value ? Number(input.value) : '';
    this.value.set(numericValue);

    this.state.saveAnswer({
      questionId: this.question.id,
      value: numericValue,
      markedForReview: false
    });
  }
}
