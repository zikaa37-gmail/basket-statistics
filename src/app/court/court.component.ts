import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CourtAction, Player } from '../shared/models/shared.model';

@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.scss']
})
export class CourtComponent {
  @Input() isSquadSet!: boolean;
  @Input() currentPlayers!: Player[];
  @Output() courtAction = new EventEmitter<CourtAction>();
  @ViewChild('threePoint') threePoint!: ElementRef;
  @ViewChild('twoPoint') twoPoint!: ElementRef;
  @ViewChild('twoPointCircle') twoPointCircle!: ElementRef;
  @ViewChild('paint') paint!: ElementRef;
  @ViewChild('onePoint') onePoint!: ElementRef;
  selectedPosition!: string;
  displayPopup = false;
  action!: CourtAction;

  constructor() { }

  onLeftClick(event: any, position: '1' | 'Z' | '2' | '2p' | '3') {
    this.prepareAction(event, position, true);
  }

  onRightClick(event: any, position: '1' | 'Z' | '2' | '2p' | '3') {
    event.preventDefault();
    this.prepareAction(event, position, false);
  }

  prepareAction(event: any, position: '1' | 'Z' | '2' | '2p' | '3', scored: boolean) {
    this.selectedPosition = position;
    console.log(event);
    this.markShootingArea();
    this.action = {
      position: position,
      scored: scored,
      xPosition: event.clientX,
      yPosition: event.clientY
    }
    this.displayPopup = true;
  }

  markShootingArea() {
    switch (this.selectedPosition) {
      case '1':
        this.onePoint.nativeElement.classList.add('bg-primary');
        break;
      case 'Z':
        this.paint.nativeElement.classList.add('bg-primary');
        break;
      case '2p':
        this.twoPointCircle.nativeElement.classList.add('bg-primary');
        break;
      case '2':
        this.twoPoint.nativeElement.classList.add('bg-primary');
        break;
      case '3':
        this.threePoint.nativeElement.classList.add('bg-primary');
        break;
      default:
        break;
    }
  }

  unmarkShootingArea() {
    switch (this.selectedPosition) {
      case '1':
        this.onePoint.nativeElement.classList.remove('bg-primary');
        break;
      case 'Z':
        this.paint.nativeElement.classList.remove('bg-primary');
        break;
      case '2':
        this.twoPoint.nativeElement.classList.remove('bg-primary');
        break;
      case '2p':
        this.twoPointCircle.nativeElement.classList.remove('bg-primary');
        break;
      case '3':
        this.threePoint.nativeElement.classList.remove('bg-primary');
        break;
      default:
        break;
    }
  }

  setSelectedPlayer(player: Player) {
    this.action!.player = player;
    console.log(this.action);
    this.emitValue();
  }

  emitValue() {
    if (this.action?.player) {
      this.courtAction.emit(this.action);
      this.resetBg();
    }
  }

  resetBg() {
    this.unmarkShootingArea();
    this.displayPopup = false;
    this.selectedPosition = '';
  }
}


