import { Injectable } from '@angular/core';
import { Period } from '../shared/models/game.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodsService {

  constructor() { }

  getPeriods(): Period[] {
    return [
      { name: 1, displayName: 'I', selected: true, hostBonus: false, visitorBonus: false },
      { name: 2, displayName: 'II', selected: false, hostBonus: false, visitorBonus: false },
      { name: 3, displayName: 'III', selected: false, hostBonus: false, visitorBonus: false },
      { name: 4, displayName: 'IV', selected: false, hostBonus: false, visitorBonus: false },
      // { name: 5, displayName: 'Kraj', selected: false },
    ];
  }
}
