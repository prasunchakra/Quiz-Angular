import {Component, inject} from '@angular/core';
import {StateService} from '../../core/services/state.service';
import {Question} from '../../core/models/question.model';
import {QuestionType} from '../../core/enterface/question-type.enum';
import {CommonModule} from '@angular/common';
import {RouterLink, Router} from '@angular/router';
import { AnswerStatus } from '../../core/enterface/answer-status.enum';

interface IndividualScore {
  questionText: string;
  marks: number;
  result: string;
}

interface ResultData {
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  status: string;
  individualScore: IndividualScore[];
}

@Component({
  selector: 'app-result',
  imports: [CommonModule, RouterLink],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  private state = inject(StateService);
  protected AnswerStatus = AnswerStatus;
  resultData: ResultData = {
    totalMarks: 0,
    obtainedMarks: 0,
    percentage: 0,
    status: '',
    individualScore: []
  };
  questions: Question[] = this.state.currentQuiz()?.questions || [];
  answers = this.state.answers();

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    const result = sessionStorage.getItem('result');
    if (result) {
      this.resultData = JSON.parse(result);
    }
  }

  goToStart(): void {
   this.state.clearCurrentQuiz();
   sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
