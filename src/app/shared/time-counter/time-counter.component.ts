import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-counter',
  templateUrl: './time-counter.component.html',
  styleUrls: ['./time-counter.component.scss']
})
export class TimeCounterComponent implements OnInit {
  estimatedTime = 60 * 10;
  minutes = 10;
  seconds = 0;
  timerPaused = false;

  constructor() { }

  ngOnInit(): void {
  }

  startTimer() {
    const s = setInterval(() => {
      if (!this.timerPaused) {
        this.estimatedTime--;
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
