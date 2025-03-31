import {Component, signal} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-countdown',
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent {
  counter = signal(5);

  constructor(private router: Router) {
    this.startCountdown();
  }

  startCountdown() {
    const interval = setInterval(() => {
      const newValue = this.counter() - 1;
      this.counter.set(newValue);

      if (newValue === 0) {
        clearInterval(interval);
        this.router.navigate(['/quiz']);
      }
    }, 1000);
  }
}
