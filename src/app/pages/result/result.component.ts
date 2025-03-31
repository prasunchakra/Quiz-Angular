import {Component, inject} from '@angular/core';
import {StateService} from '../../core/services/state.service';
import {Question} from '../../core/models/question.model';
import {QuestionType} from '../../core/enums/question-type.enum';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-result',
  imports: [CommonModule, RouterLink],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  private state = inject(StateService);

  questions: Question[] = this.state.questions();
  answers = this.state.answers();

  get totalMarks() {
    return this.questions.reduce((sum, q) => sum + q.marks, 0);
  }

  get scoredMarks() {
    return this.questions.reduce((sum, q) => {
      const a = this.answers.find(ans => ans.questionId === q.id);
      if (!a || a.markedForReview) return sum;

      switch (q.type) {
        case QuestionType.MultipleChoice:
        case QuestionType.TrueFalse:
        case QuestionType.FillInTheBlank:
        case QuestionType.Numeric:
          return a.value === q.correctAnswer ? sum + q.marks : sum;

        case QuestionType.MultipleResponse:
          const expected = Array.isArray(q.correctAnswer) ? q.correctAnswer.sort() : [];
          const actual = Array.isArray(a.value) ? a.value.sort() : [];
          return JSON.stringify(expected) === JSON.stringify(actual) ? sum + q.marks : sum;

        case QuestionType.Matching:
        case QuestionType.Ordering:
          return JSON.stringify(a.value) === JSON.stringify(q.correctAnswer) ? sum + q.marks : sum;

        default:
          return sum; // Essay, ShortAnswer, FileUpload — skipped from scoring
      }
    }, 0);
  }
}
