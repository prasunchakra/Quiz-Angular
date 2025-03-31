import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StateService} from '../../core/services/state.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-summary',
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  private state = inject(StateService);
  private router = inject(Router);

  questions = this.state.questions();
  answers = this.state.answers();

  get total() {
    return this.questions.length;
  }

  get answered() {
    return this.answers.filter(a => a.value !== '' && a.value !== null && a.value !== undefined && !a.markedForReview).length;
  }

  get notAnswered() {
    return this.answers.filter(a => (a.value === '' || a.value === null || a.value === undefined) && !a.markedForReview).length;
  }

  get marked() {
    return this.answers.filter(a => a.markedForReview).length;
  }

  get notVisited() {
    return this.total - this.answers.length;
  }

  goBack() {
    this.router.navigate(['/quiz']);
  }

  submit() {
    this.router.navigate(['/result']); // or call an API to evaluate
  }
}
