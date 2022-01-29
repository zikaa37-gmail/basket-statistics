import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameResult } from '../shared/models/game.model';
// import { StatAction } from '../stat-actions/stat-actions.component';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.scss']
})
export class PeriodsComponent implements OnInit {
  @Input() isSquadSet!: boolean;
  @Input() home = 0;
  @Input() visitor = 0;
  @Input() gameResult!: GameResult;
  @Output() savePeriod = new EventEmitter<Period>();
  @Output() visitorPoints = new EventEmitter<number>();
  periods: Period[] = [
    { name: 1, displayName: 'I', selected: true },
    { name: 2, displayName: 'II', selected: false },
    { name: 3, displayName: 'III', selected: false },
    { name: 4, displayName: 'IV', selected: false },
    // { name: 5, displayName: 'Kraj', selected: false },
  ];
  selectedPeriod!: Period; // = this.periods[0];
  // interval: any = 1000; // 1 second, 1000ms
  estimatedTime!: number; // 10 minutes
  minutes!: number;
  seconds!: number;
  s: any;
  timerPaused = false;
  // faCoffee = faCoffee;

  constructor() { }

  ngOnInit(): void {
    this.setSelectedPeriod(this.periods[0]);
    this.resetCounter();
  }

  setSelectedPeriod(period: Period) {
    this.selectedPeriod = period;
    this.periods.forEach((p: Period) => {
      p.selected = !!(period.name === p.name);
    });
    this.emitPeriod();
    this.estimatedTime = 600; // 10 minutes
  }

  emitPeriod() {
    this.savePeriod.emit(this.selectedPeriod);
  }

  emitVisitorPoints(value: number) {
    this.visitorPoints.emit(value);
  }

  startTimer() {
    this.s = setInterval(() => {
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

export interface Period {
  name: number;
  displayName: string
  selected: boolean;
}
