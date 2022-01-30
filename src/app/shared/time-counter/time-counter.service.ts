import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeCounterService {
  estimatedTime$ = new BehaviorSubject<number>(600);
  estimatedTime!: number;
  minutes = 10;
  seconds = 0;
  timerPaused = false;

  constructor() { }

  startTimer() {
    const s = setInterval(() => {
      if (!this.timerPaused) {
        this.estimatedTime$.next(this.estimatedTime--);
        if (this.minutes === 0 && this.seconds === 0) {
          this.togglePauseTimer();
          this.resetCounter();
        }
        if (this.seconds === 0) {
          this.minutes--;
          this.seconds = 59;
        }
        this.seconds = (this.estimatedTime - (this.minutes * 60));
      }
    }, 1000);
  }

  resumeTimer() {
    this.timerPaused = false;
  }

  togglePauseTimer() {
    this.timerPaused = !this.timerPaused;
  }

  resetCounter() {
    this.estimatedTime = 60 * 10; // 10 minutes
    this.minutes = 10;
    this.seconds = 0;
  }
}
