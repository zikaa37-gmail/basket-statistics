import { Injectable } from '@angular/core';
import { Player, Stats } from './shared/models/shared.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }
  getPlayers(): Player[] {
    return [
      { id: 1, firstName: 'Filip', lastName: 'Mihailovic', nickname: 'Filip', jerseyNumber: '6', selected: true, stats: new Stats() },
      { id: 2, firstName: 'Jovan', lastName: 'Milosevic', nickname: 'Joca', jerseyNumber: '1', selected: true, stats: new Stats() },
      { id: 3, firstName: 'Pavle', lastName: 'Zdero', nickname: 'Paja', jerseyNumber: '2', selected: true, stats: new Stats() },
      { id: 4, firstName: 'Sergej', lastName: 'Rutovic', nickname: 'Ruta', jerseyNumber: '3', selected: true, stats: new Stats() },
      { id: 5, firstName: 'Viktor', lastName: 'Stevovic', nickname: 'Viktor', jerseyNumber: '4', selected: true, stats: new Stats() },
      { id: 6, firstName: 'Ilija', lastName: 'Martinovic', nickname: 'Ilija', jerseyNumber: '5', selected: false, stats: new Stats() },
      { id: 7, firstName: 'Andrej', lastName: 'Dragovic', nickname: 'Andrej', jerseyNumber: '7', selected: false, stats: new Stats() },
      { id: 8, firstName: 'Lazar', lastName: 'Bajovic', nickname: 'Bajovic', jerseyNumber: '8', selected: false, stats: new Stats() },
      { id: 9, firstName: 'Petar', lastName: 'Pavlovic', nickname: 'Peca', jerseyNumber: '9', selected: false, stats: new Stats() },
      { id: 10, firstName: 'Aleksa', lastName: 'Janicic', nickname: 'Aleksa', jerseyNumber: '11', selected: false, stats: new Stats() },
      { id: 11, firstName: 'Jakov', lastName: 'Kajmakovic', nickname: 'Jakov', jerseyNumber: '12', selected: false, stats: new Stats() },
      { id: 12, firstName: 'Milorad', lastName: 'Ljepovic', nickname: 'Mile', jerseyNumber: '13', selected: false, stats: new Stats() },
      { id: 13, firstName: 'Aleksandar', lastName: 'Markovic-Corac', nickname: 'Aca', jerseyNumber: '15', selected: null, stats: new Stats() },
      { id: 14, firstName: 'Mateja', lastName: 'Pacoski', nickname: 'Pacos', jerseyNumber: '19', selected: null, stats: new Stats() },
      { id: 15, firstName: 'Bogdan', lastName: 'Bunjevac', nickname: 'Bunjevac', jerseyNumber: '24', selected: null, stats: new Stats() },
      { id: 16, firstName: 'Petar', lastName: 'Zivanovic', nickname: 'Zile', jerseyNumber: '27', selected: null, stats: new Stats() },
      { id: 17, firstName: 'Lazar', lastName: 'Djordjic', nickname: 'Djordjic', jerseyNumber: '30', selected: null, stats: new Stats() },
      { id: 18, firstName: 'Sergej', lastName: 'Basa', nickname: 'Basa', jerseyNumber: '77', selected: null, stats: new Stats() },
    ]
    // return [
    //   { id: 1, firstName: 'Filip', lastName: 'Mihailovic', nickname: 'Filip', jerseyNumber: '6', selected: null, stats: new Stats() },
    //   { id: 2, firstName: 'Jovan', lastName: 'Milosevic', nickname: 'Joca', jerseyNumber: '1', selected: null, stats: new Stats() },
    //   { id: 3, firstName: 'Pavle', lastName: 'Zdero', nickname: 'Paja', jerseyNumber: '2', selected: null, stats: new Stats() },
    //   { id: 4, firstName: 'Sergej', lastName: 'Rutovic', nickname: 'Ruta', jerseyNumber: '3', selected: null, stats: new Stats() },
    //   { id: 5, firstName: 'Viktor', lastName: 'Stevovic', nickname: 'Viktor', jerseyNumber: '4', selected: null, stats: new Stats() },
    //   { id: 6, firstName: 'Ilija', lastName: 'Martinovic', nickname: 'Ilija', jerseyNumber: '5', selected: null, stats: new Stats() },
    //   { id: 7, firstName: 'Andrej', lastName: 'Dragovic', nickname: 'Andrej', jerseyNumber: '7', selected: null, stats: new Stats() },
    //   { id: 8, firstName: 'Lazar', lastName: 'Bajovic', nickname: 'Bajovic', jerseyNumber: '8', selected: null, stats: new Stats() },
    //   { id: 9, firstName: 'Petar', lastName: 'Pavlovic', nickname: 'Peca', jerseyNumber: '9', selected: null, stats: new Stats() },
    //   { id: 10, firstName: 'Aleksa', lastName: 'Janicic', nickname: 'Aleksa', jerseyNumber: '11', selected: null, stats: new Stats() },
    //   { id: 11, firstName: 'Jakov', lastName: 'Kajmakovic', nickname: 'Jakov', jerseyNumber: '12', selected: null, stats: new Stats() },
    //   { id: 12, firstName: 'Milorad', lastName: 'Ljepovic', nickname: 'Mile', jerseyNumber: '13', selected: null, stats: new Stats() },
    //   { id: 13, firstName: 'Aleksandar', lastName: 'Markovic-Corac', nickname: 'Aca', jerseyNumber: '15', selected: null, stats: new Stats() },
    //   { id: 14, firstName: 'Mateja', lastName: 'Pacoski', nickname: 'Pacos', jerseyNumber: '19', selected: null, stats: new Stats() },
    //   { id: 15, firstName: 'Bogdan', lastName: 'Bunjevac', nickname: 'Bunjevac', jerseyNumber: '24', selected: null, stats: new Stats() },
    //   { id: 16, firstName: 'Petar', lastName: 'Zivanovic', nickname: 'Zile', jerseyNumber: '27', selected: null, stats: new Stats() },
    //   { id: 17, firstName: 'Lazar', lastName: 'Djordjic', nickname: 'Djordjic', jerseyNumber: '30', selected: null, stats: new Stats() },
    //   { id: 18, firstName: 'Sergej', lastName: 'Basa', nickname: 'Basa', jerseyNumber: '77', selected: null, stats: new Stats() },
    // ]
  }
}
