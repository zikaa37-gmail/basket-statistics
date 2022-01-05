import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameResult } from '../shared/models/game.model';
import { StatAction } from '../stat-actions/stat-actions.component';

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

  constructor() { }

  ngOnInit(): void {
    this.setSelectedPeriod(this.periods[0]);
  }

  setSelectedPeriod(period: Period) {
    this.selectedPeriod = period;
    this.periods.forEach((p: Period) => {
      p.selected = !!(period.name === p.name);
    });
    this.emitPeriod();
  }

  emitPeriod() {
    this.savePeriod.emit(this.selectedPeriod);
  }

  emitVisitorPoints(value: number) {
    this.visitorPoints.emit(value);
  }
}

export interface Period {
  name: number;
  displayName: string
  selected: boolean;
}
