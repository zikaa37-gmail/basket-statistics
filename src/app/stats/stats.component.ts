import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Player } from '../shared/models/shared.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnChanges {
  @Input() players!: Player[];
  percentages = new Percentages();

  constructor() { }

  ngOnChanges(changes: SimpleChanges & { players: SimpleChange }): void {
    if (changes.players.currentValue) {
      this.players = changes.players.currentValue;
      this.calculatePercentages();
    }
  }

  calculatePercentages() {
    this.percentages = new Percentages();
    this.players.forEach((player: Player) => {
      this.percentages.ftAttempted += player.stats.freeThrowAttempted;
      this.percentages.ftScored += player.stats.freeThrow;
      this.percentages.ftPercentage = Math.floor(this.percentages.ftScored / this.percentages.ftAttempted * 100);

      this.percentages.paintAttempted += player.stats.paintShotAttempted;
      this.percentages.paintScored += player.stats.paintShot;
      this.percentages.paintPercentage = Math.floor(this.percentages.paintScored / this.percentages.paintAttempted * 100);

      this.percentages.twoPointAttempted += player.stats.twoPointShotAttempted;
      this.percentages.twoPointScored += player.stats.twoPointShot;
      this.percentages.twoPointPercentage = Math.floor(this.percentages.twoPointScored / this.percentages.twoPointAttempted * 100);

      this.percentages.threePointAttempted += player.stats.threePointShotAttempted;
      this.percentages.threePointScored += player.stats.threePointShot;
      this.percentages.threePointPercentage = Math.floor(this.percentages.threePointScored / this.percentages.threePointAttempted * 100);

      this.percentages.foulCommited += player.stats.foulCommited;
      this.percentages.foulTaken += player.stats.foulTaken;
      this.percentages.steal += player.stats.steal;
      this.percentages.turnover += player.stats.turnover;
      this.percentages.assist += player.stats.assist;
      this.percentages.blockedShot += player.stats.blockedShot;
      this.percentages.deffRebound += player.stats.deffRebound;
      this.percentages.offRebound += player.stats.offRebound;

      this.percentages.gameIndex = this.calculateGameIndex();
    })
  }

  calculateGameIndex(): number {
    const stat: number = (
      this.percentages.ftScored +
      this.percentages.paintScored * 2 +
      this.percentages.twoPointScored * 2 +
      this.percentages.threePointScored * 3 +
      this.percentages.foulTaken +
      this.percentages.assist +
      this.percentages.steal +
      this.percentages.blockedShot +
      this.percentages.deffRebound +
      this.percentages.offRebound) - (
        this.percentages.ftAttempted - this.percentages.ftScored +
        this.percentages.paintAttempted - this.percentages.paintScored +
        this.percentages.twoPointAttempted - this.percentages.twoPointScored +
        this.percentages.threePointAttempted - this.percentages.threePointScored +
        this.percentages.foulCommited +
        this.percentages.turnover);
    return stat;
  }
}

export class Percentages {
  ftAttempted = 0;
  ftScored = 0;
  ftPercentage = 0;
  paintAttempted = 0;
  paintScored = 0;
  paintPercentage = 0;
  twoPointAttempted = 0;
  twoPointScored = 0;
  twoPointPercentage = 0;
  threePointAttempted = 0;
  threePointScored = 0;
  threePointPercentage = 0;
  foulCommited = 0;
  foulTaken = 0
  steal = 0;
  turnover = 0;
  assist = 0;
  blockedShot = 0;
  deffRebound = 0;
  offRebound = 0;
  gameIndex = 0;
}
