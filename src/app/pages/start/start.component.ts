import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start',
  imports: [],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {
  quizId = sessionStorage.getItem('quizId') || 'bbc9de2a-8046-49e4-a85d-b07254f3f908';

  constructor(private router: Router) {
    sessionStorage.setItem('quizId', this.quizId);
  }

  startQuiz() {
    this.router.navigate(['/countdown'], {
      queryParams: {
        quiz: this.quizId
      }
    });
  }
}
