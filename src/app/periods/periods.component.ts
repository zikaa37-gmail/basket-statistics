import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameResult, Period } from '../shared/models/game.model';
import { PeriodsService } from './periods.service';

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
  periods: Period[] = this.periodsService.getPeriods();
  selectedPeriod!: Period;
  estimatedTime!: number;
  minutes!: number;
  seconds!: number;
  timerPaused = false;

  constructor(private periodsService: PeriodsService) { }

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

  toggleBonus(period: Period, side: string) {
    const p = this.periods.find((p: Period) => p.displayName.toLowerCase() === period.displayName.toLowerCase())!;
    if (side === 'host') {
      p.hostBonus = !p?.hostBonus;
    } else {
      p.visitorBonus = !p.visitorBonus;
    }
  }
}

