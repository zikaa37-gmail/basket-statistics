import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { Period } from './periods/periods.component';
import { GameResult, QuarterStat } from './shared/models/game.model';
import { CourtAction, Player, PointMarks } from './shared/models/shared.model';
import { StatAction } from './stat-actions/stat-actions.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'basket-stat';
  allPlayers: Player[] = [];
  currentPlayers: Player[] = [];
  notSelectedPlayers: Player[] = [];
  scheduledPlayers: Player[] = [];
  notScheduledPlayers: Player[] = [];
  isSquadSet = false;
  isTeamSet = false;
  selectedPlayer!: Player;
  closePopup = true;
  home = 0;
  visitor = 0;
  teamAScored = 0;
  teamBScored = 0;
  pointMarks: PointMarks[] = [];
  gameResult: GameResult = new GameResult();
  curentPeriod!: Period;

  constructor(private _service: AppService) { }

  ngOnInit(): void {
    this.allPlayers = this._service.getPlayers();
    this.distinctPlayers();
    this.setInitialGameStats();
  }

  setInitialGameStats() {
    this.gameResult = {
      id: 1, result: [
        new QuarterStat(1),
        new QuarterStat(2),
        new QuarterStat(3),
        new QuarterStat(4),
      ]
    };
    // console.log((this.gameResult));
  }

  resetTeamScoredCounter() {
    this.teamAScored = 0;
    this.teamBScored = 0;
  }

  togglePlayerSelection(player: Player, event?: any) {
    if (event) {
      event.preventDefault();
    }
    const selectedPlayer = this.allPlayers.find((p: Player) => p.id === player.id)!;
    if (!this.isSquadSet || (this.isSquadSet && selectedPlayer.selected)) {
      selectedPlayer.selected = !selectedPlayer.selected;
      this.distinctPlayers();
    }

  }

  activatePlayer(player: Player) {
    const selectedPlayer = this.allPlayers.find((p: Player) => p.id === player.id)!;
    if (!this.isTeamSet) {
      selectedPlayer.selected = false;
    }
    this.distinctPlayers();
  }

  deactivatePlayer(player: Player, event: any) {
    event?.preventDefault();
    const selectedPlayer = this.allPlayers.find((p: Player) => p.id === player.id)!;
    selectedPlayer.selected = null;
    this.distinctPlayers();
  }

  distinctPlayers() {
    this.currentPlayers = this.allPlayers.filter((p: Player) => p.selected === true);
    this.notSelectedPlayers = this.allPlayers.filter((p: Player) => p.selected === false);
    this.notScheduledPlayers = this.allPlayers.filter((p: Player) => p.selected === null);
    this.scheduledPlayers = [... this.currentPlayers, ... this.notSelectedPlayers]

    this.isSquadSet = !!(this.currentPlayers?.length === 5);
    this.isTeamSet = !!((this.currentPlayers?.length + this.notSelectedPlayers?.length) === 12);
  }

  addPointsToTeamA(numberOfPoints: number) {
    const currentResult = this.gameResult.result.find((res: QuarterStat) => res.period === this.curentPeriod.name);
    currentResult!.teamAScored += numberOfPoints;
    currentResult!.teamAFinal += numberOfPoints;
    this.calculateQuarterFinalResult();
  }

  addPointsToTeamB(numberOfPoints: number) {
    this.visitor += numberOfPoints;
    const currentResult = this.gameResult.result.find((res: QuarterStat) => res.period === this.curentPeriod.name);
    currentResult!.teamBScored += numberOfPoints;
    currentResult!.teamBFinal += numberOfPoints;
    this.calculateQuarterFinalResult();
  }

  calculateQuarterFinalResult() {
    const game = this.gameResult.result;
    game.forEach((g: QuarterStat, index) => {
      if (index === 0) {
        game[index].teamAFinal = game[index].teamAScored;
        game[index].teamBFinal = game[index].teamBScored;
      } else {
        game[index].teamAFinal = game[index - 1].teamAFinal + game[index].teamAScored;
        game[index].teamBFinal = game[index - 1].teamBFinal + game[index].teamBScored;
      }
    })
  }

  saveCourtAction(action: CourtAction) {
    this.pointMarks.push({ cx: action.xPosition, cy: action.yPosition, fill: this.getFillColor(action.scored) });

    this.selectedPlayer = action.player!;
    switch (action.position) {
      case '1':
        this.selectedPlayer.stats.freeThrowAttempted++;
        if (action.scored) {
          this.selectedPlayer.stats.freeThrow++;
          this.home += 1;
          this.addPointsToTeamA(1);
        }
        break;
      case 'Z':
        this.selectedPlayer.stats.paintShotAttempted++;
        if (action.scored) {
          this.selectedPlayer.stats.paintShot++;
          this.home += 2;
          this.addPointsToTeamA(2);
        }
        break;
      case '2':
        this.selectedPlayer.stats.twoPointShotAttempted++;
        if (action.scored) {
          this.selectedPlayer.stats.twoPointShot++;
          this.home += 2;
          this.addPointsToTeamA(2);
        }
        break;
      case '2p':
        this.selectedPlayer.stats.twoPointShotAttempted++;
        if (action.scored) {
          this.selectedPlayer.stats.twoPointShot++;
          this.home += 2;
          this.addPointsToTeamA(2);
        }
        break;
      case '3':
        this.selectedPlayer.stats.threePointShotAttempted++;
        if (action.scored) {
          this.selectedPlayer.stats.threePointShot++;
          this.home += 3;
          this.addPointsToTeamA(3);
        }
        break;
      default:
        break;
    }
    this.calculateIndex();
  }

  saveStatAction(action: StatAction) {
    this.selectedPlayer = action.player!;
    switch (action.type) {
      case '1':
        if (action.value === 1) {
          this.selectedPlayer.stats.freeThrow += 1;
          this.selectedPlayer.stats.freeThrowAttempted += 1;
          this.addPointsToTeamA(1);
        } else if (action.value === -1 && this.selectedPlayer.stats.freeThrow > 0) {
          this.selectedPlayer.stats.freeThrow -= 1;
          this.selectedPlayer.stats.freeThrowAttempted -= 1;
          this.addPointsToTeamA(-1);
        } else if (action.value === -1 &&
          this.selectedPlayer.stats.freeThrow === 0 &&
          this.selectedPlayer.stats.freeThrowAttempted > 0) {
          this.selectedPlayer.stats.freeThrowAttempted -= 1;
        }
        break;
      case 'Z':
        if (action.value === 1) {
          this.selectedPlayer.stats.paintShot += 1;
          this.selectedPlayer.stats.paintShotAttempted += 1;
          this.addPointsToTeamA(2);
        } else if (action.value === -1 && this.selectedPlayer.stats.paintShot > 0) {
          this.selectedPlayer.stats.paintShot -= 1;
          this.selectedPlayer.stats.paintShotAttempted -= 1;
          this.addPointsToTeamA(-2);
        } else if (action.value === -1 &&
          this.selectedPlayer.stats.paintShot === 0 &&
          this.selectedPlayer.stats.paintShotAttempted > 0) {
          this.selectedPlayer.stats.paintShotAttempted -= 1;
        }
        break;
      case '2':
        if (action.value === 1) {
          this.selectedPlayer.stats.twoPointShot += 1;
          this.selectedPlayer.stats.twoPointShotAttempted += 1;
          this.addPointsToTeamA(2);
        } else if (action.value === -1 && this.selectedPlayer.stats.twoPointShot > 0) {
          this.selectedPlayer.stats.twoPointShot -= 1;
          this.selectedPlayer.stats.twoPointShotAttempted -= 1;
          this.addPointsToTeamA(-2);
        } else if (action.value === -1 &&
          this.selectedPlayer.stats.twoPointShot === 0 &&
          this.selectedPlayer.stats.twoPointShotAttempted > 0) {
          this.selectedPlayer.stats.twoPointShotAttempted -= 1;
        }
        break;
      case '2p':
        if (action.value === 1) {
          this.selectedPlayer.stats.twoPointShot += 1;
          this.selectedPlayer.stats.twoPointShotAttempted += 1;
          this.addPointsToTeamA(2);
        } else if (action.value === -1 && this.selectedPlayer.stats.twoPointShot > 0) {
          this.selectedPlayer.stats.twoPointShot -= 1;
          this.selectedPlayer.stats.twoPointShotAttempted -= 1;
          this.addPointsToTeamA(-2);
        } else if (action.value === -1 &&
          this.selectedPlayer.stats.twoPointShot === 0 &&
          this.selectedPlayer.stats.twoPointShotAttempted > 0
        ) {
          this.selectedPlayer.stats.twoPointShotAttempted -= 1;
        }
        break;
      case '3':
        if (action.value === 1) {
          this.selectedPlayer.stats.threePointShot += 1;
          this.selectedPlayer.stats.threePointShotAttempted += 1;
          this.addPointsToTeamA(3);
        } else if (action.value === -1 && this.selectedPlayer.stats.threePointShot > 0) {
          this.selectedPlayer.stats.threePointShot -= 1;
          this.selectedPlayer.stats.threePointShotAttempted -= 1;
          this.addPointsToTeamA(-3);
        } else if (action.value === -1 &&
          this.selectedPlayer.stats.threePointShot === 0 &&
          this.selectedPlayer.stats.threePointShotAttempted > 0
        ) {
          this.selectedPlayer.stats.threePointShotAttempted -= 1;
        }
        break;
      case 'F-':
        if (action.value === 1 && this.selectedPlayer.stats.foulCommited < 5) {
          this.selectedPlayer.stats.foulCommited += 1;
        } else if (action.value === -1 && this.selectedPlayer.stats.foulCommited > 0) {
          this.selectedPlayer.stats.foulCommited -= 1;
        }
        break;
      case 'F+':
        if (action.value === 1) {
          this.selectedPlayer.stats.foulTaken += 1;
        } else if (this.selectedPlayer.stats.foulTaken > 0 && action.value === -1) {
          this.selectedPlayer.stats.foulTaken -= 1;
        }
        break;
      case 'OL':
        if (action.value === 1) {
          this.selectedPlayer.stats.steal += 1;
        } else if (this.selectedPlayer.stats.steal > 0 && action.value === -1) {
          this.selectedPlayer.stats.steal -= 1;
        }
        break;
      case 'IL':
        if (action.value === 1) {
          this.selectedPlayer.stats.turnover += 1;
        } else if (this.selectedPlayer.stats.turnover > 0 && action.value === -1) {
          this.selectedPlayer.stats.turnover -= 1;
        }
        break;
      case 'AS':
        if (action.value === 1) {
          this.selectedPlayer.stats.assist += 1;
        } else if (this.selectedPlayer.stats.assist > 0 && action.value === -1) {
          this.selectedPlayer.stats.assist -= 1;
        }
        break;
      case 'BL':
        if (action.value === 1) {
          this.selectedPlayer.stats.blockedShot += 1;
        } else if (this.selectedPlayer.stats.blockedShot > 0 && action.value === -1) {
          this.selectedPlayer.stats.blockedShot -= 1;
        }
        break;
      case 'SO':
        if (action.value === 1) {
          this.selectedPlayer.stats.deffRebound += 1;
        } else if (this.selectedPlayer.stats.deffRebound > 0 && action.value === -1) {
          this.selectedPlayer.stats.deffRebound -= 1;
        }
        break;
      case 'SN':
        if (action.value === 1) {
          this.selectedPlayer.stats.offRebound += 1;
        } else if (this.selectedPlayer.stats.offRebound > 0 && action.value === -1) {
          this.selectedPlayer.stats.offRebound -= 1;
        }
        break;

      default:
        break;
    }
    this.calculateIndex();
  }

  calculateIndex() {
    const stat = this.selectedPlayer.stats;
    stat.index = (
      stat.freeThrow +
      stat.paintShot * 2 +
      stat.twoPointShot * 2 +
      stat.threePointShot * 3 +
      stat.foulTaken +
      stat.assist +
      stat.steal +
      stat.blockedShot +
      stat.deffRebound +
      stat.offRebound) - (
        stat.freeThrowAttempted - stat.freeThrow +
        stat.paintShotAttempted - stat.paintShot +
        stat.twoPointShotAttempted - stat.twoPointShot +
        stat.threePointShotAttempted - stat.threePointShot +
        stat.foulCommited +
        stat.turnover);
    this.distinctPlayers();
  }

  savePeriodStats(period: Period) {
    this.curentPeriod = period;
    console.log('save ' + period.name + ' period');
  }

  getPlayerButtonColor(player: Player): string {
    if (player.selected === null) {
      return 'btn-secondary';
    }
    return player.selected ? 'btn-success' : 'btn-danger';
  }

  getFillColor(scored: boolean): string {
    return scored ? 'green' : 'red';
  }

  removeCircle(pm: PointMarks) {
    const confirmation = confirm('Potvrda brisanja suta');
    if (confirmation) {
      const index = this.pointMarks.indexOf(pm);
      if (index > -1) {
        this.pointMarks.splice(index, 1);
      }
    }
  }

}
