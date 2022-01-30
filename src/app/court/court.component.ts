import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CourtAction, Player } from '../shared/models/shared.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.scss']
})
export class CourtComponent {
  @Input() isSquadSet!: boolean;
  @Input() currentPlayers!: Player[];
  @Output() courtAction = new EventEmitter<CourtAction>();
  @ViewChild('threePoint', { static: false }) threePoint!: ElementRef;
  @ViewChild('twoPoint', { static: false }) twoPoint!: ElementRef;
  @ViewChild('twoPointCircle', { static: false }) twoPointCircle!: ElementRef;
  @ViewChild('paint', { static: false }) paint!: ElementRef;
  @ViewChild('onePoint', { static: false }) onePoint!: ElementRef;
  selectedPosition!: string;
  displayPopup = false;
  action!: CourtAction;
  langs: string[];
  xPosition = 0;
  yPosition = 0;

  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'sr']);
    translate.setDefaultLang('sr');
    this.langs = ['en', 'sr'];
  }

  onLeftClick(event: any, position: '1' | 'Z' | '2' | '2p' | '3') {
    this.prepareAction(event, position, true);
  }

  onRightClick(event: any, position: '1' | 'Z' | '2' | '2p' | '3') {
    event.preventDefault();
    this.prepareAction(event, position, false);
  }

  prepareAction(event: any, position: '1' | 'Z' | '2' | '2p' | '3', scored: boolean) {
    this.selectedPosition = position;
    document.documentElement.style.setProperty('--mouse-x', (event.clientX + 'px'));
    document.documentElement.style.setProperty('--mouse-y', (event.clientY + 'px'));

    this.markShootingArea();
    this.action = {
      position: position,
      scored: scored,
      xPosition: event.clientX,
      yPosition: event.clientY
    }
    // this.xPosition = event.clientX;// + 'px';
    // this.yPosition = event.clientY;// + 'px';
    // console.log('x:', this.xPosition);
    // console.log('y:', this.yPosition);
    this.displayPopup = true;
  }

  markShootingArea() {
    switch (this.selectedPosition) {
      case '1':
        this.onePoint.nativeElement.classList.toggle('bg-orange');
        break;
      case 'Z':
        this.paint.nativeElement.classList.toggle('bg-yellow');
        break;
      case '2p':
        this.twoPointCircle.nativeElement.classList.toggle('bg-rose');
        break;
      case '2':
        this.twoPoint.nativeElement.classList.toggle('bg-light-green');
        break;
      case '3':
        this.threePoint.nativeElement.classList.toggle('bg-light-blue');
        break;
      default:
        break;
    }
  }

  setSelectedPlayer(player: Player) {
    this.action!.player = player;
    // console.log(this.action);
    this.emitValue();
  }

  emitValue() {
    if (this.action?.player) {
      this.courtAction.emit(this.action);
      this.resetBg();
    }
  }

  resetBg() {
    this.markShootingArea();
    this.displayPopup = false;
    this.selectedPosition = '';
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}


