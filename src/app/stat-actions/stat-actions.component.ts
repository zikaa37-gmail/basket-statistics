import { Component, Output, EventEmitter, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Player } from '../shared/models/shared.model';


@Component({
  selector: 'app-stat-actions',
  templateUrl: './stat-actions.component.html',
  styleUrls: ['./stat-actions.component.scss']
})
export class StatActionsComponent implements OnChanges {
  @Input() isSquadSet!: boolean;
  @Input() currentPlayers!: Player[];
  @Output() statAction = new EventEmitter<StatAction>();
  displayPopup = false;
  action: StatAction | null = null;

  constructor() { }

  ngOnChanges(changes: SimpleChanges & { isSquadSet: SimpleChange }): void {
    if (changes.isSquadSet) {
      this.isSquadSet = changes.isSquadSet.currentValue;
      // console.log(this.isSquadSet);
    }
  }

  prepareAction(type: '1' | 'Z' | '2' | '3' | 'F-' | 'F+' | 'OL' | 'IL' | 'AS' | 'BL' | 'SO' | 'SN', value: number) {
    this.action = {
      type: type,
      value: value
    }
    this.displayPopup = true;
  }

  setSelectedPlayer(player: Player | null) {
    if (!player) {
      this.displayPopup = false;
    }
    this.action!.player! = player!;
    // console.log(this.action);
    this.emitValue();
  }

  emitValue() {
    if (this.action?.player) {
      this.statAction.emit(this.action);
      this.action = null;
      this.displayPopup = false;
    }
  }

  resetBg() {
    this.displayPopup = false;
  }

}

export interface StatAction {
  player?: Player;
  type: '1' | 'Z' | '2' | '2p' | '3' | 'F-' | 'F+' | 'OL' | 'IL' | 'AS' | 'BL' | 'SO' | 'SN';
  value: number;
}
