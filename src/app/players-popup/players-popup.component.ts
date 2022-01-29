import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, SimpleChange } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Player } from '../shared/models/shared.model';



@Component({
  selector: 'app-players-popup',
  templateUrl: './players-popup.component.html',
  styleUrls: ['./players-popup.component.scss']
})
export class PlayersPopupComponent implements OnChanges {
  @Input() currentPlayers!: Player[];
  @Input() position?: string; // = '1';
  @Input() isDisplayed = false;
  @Output() selectedPlayer = new EventEmitter<Player>();
  @Output() eventCancelled = new EventEmitter<boolean>();

  constructor(private toastr: ToastrService) { }

  ngOnChanges(changes: SimpleChanges & { isDisplayed: SimpleChange }): void {
    if (changes.isDisplayed) {
      this.isDisplayed = changes.isDisplayed.currentValue;
    }
  }

  emitValue(player: Player) {
    this.selectedPlayer.emit(player);
    this.isDisplayed = false;
  }

  cancelEvent(side: string, event: any) {
    if (side === 'right') {
      event.preventDefault();
    }

    this.isDisplayed = false;
    this.eventCancelled.emit(true);
    this.toastr.success('Hello world!', 'Toastr fun!');
    // this.toastr.error('Hello world!', 'Toastr fun!');
    // this.toastr.warning('Hello world!', 'Toastr fun!');
    // this.toastr.info('Hello world!', 'Toastr fun!');
  }

}
