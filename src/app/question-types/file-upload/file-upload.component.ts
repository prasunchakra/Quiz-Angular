import {Component, inject, Input, signal} from '@angular/core';
import {Question} from '../../core/models/question.model';
import {CommonModule} from '@angular/common';
import {StateService} from '../../core/services/state.service';

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule],
  template: `
    <div>
      <p class="mb-4 font-medium">{{ question?.text }}</p>

      <input
        type="file"
        (change)="handleFile($event)"
        class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:rounded file:bg-blue-50 file:text-blue-700"
      />

      <div *ngIf="fileName()" class="mt-2 text-sm text-green-600">
        ✅ {{ fileName() }} selected
      </div>
    </div>
  `,
  styles:''
})
export class FileUploadComponent {
  @Input() question!: Question;
  private state = inject(StateService);
  fileName = signal<string>('');

  ngOnInit() {
    const saved = this.state.getAnswerForQuestion(this.question.id);
    if (saved && saved.value?.name) {
      this.fileName.set(saved.value.name);
    }
  }

  handleFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName.set(file.name);

      this.state.saveAnswer({
        questionId: this.question.id,
        value: file
      });
    }
  }
}
