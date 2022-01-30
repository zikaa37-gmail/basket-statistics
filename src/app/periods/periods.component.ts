import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameResult, Period } from '../shared/models/game.model';
import { TimeCounterService } from '../shared/time-counter/time-counter.service';
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

  constructor(
    private periodsService: PeriodsService,
    private timeCounterService: TimeCounterService) { }

  ngOnInit(): void {
    this.setSelectedPeriod(this.periods[0]);
  }

  setSelectedPeriod(period: Period) {
    this.selectedPeriod = period;
    this.periods.forEach((p: Period) => {
      p.selected = !!(period.name === p.name);
    });
    this.emitPeriod();
    this.timeCounterService.estimatedTime$.next(600); // 10 minutes
  }

  emitPeriod() {
    this.savePeriod.emit(this.selectedPeriod);
  }

  emitVisitorPoints(value: number) {
    this.visitorPoints.emit(value);
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

