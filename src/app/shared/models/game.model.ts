export class GameResult {
  id?: number;
  result: QuarterStat[] = [];
  // firstQuarterTeamA: number = 0;
  // firstQuarterTeamB: number = 0;
  // firstQuarterScoredTeamA: number = 0;
  // firstQuarterScoredTeamB: number = 0;

  // secondQuarterTeamA: number = 0;
  // secondQuarterTeamB: number = 0;
  // secondQuarterScoredTeamA: number = 0;
  // secondQuarterScoredTeamB: number = 0;

  // thirdQuarterTeamA: number = 0;
  // thirdQuarterTeamB: number = 0;
  // thirdQuarterScoredTeamA: number = 0;
  // thirdQuarterScoredTeamB: number = 0;

  // forthQuarterTeamA: number = 0;
  // forthQuarterTeamB: number = 0;
  // forthQuarterScoredTeamA: number = 0;
  // forthQuarterScoredTeamB: number = 0;
}

export class QuarterStat {
  period: number;
  teamAFinal: number = 0;
  teamBFinal: number = 0;
  teamAScored: number = 0;
  teamBScored: number = 0;

  constructor(period: number) {
    this.period = period;
  }
}


export interface Period {
  name: number;
  displayName: string
  selected: boolean;
  hostBonus: boolean;
  visitorBonus: boolean;
}

export interface FoulType {
  name: 'P' | 'P1' | 'P2' | 'P3' | 'U' | 'T' | 'B' | 'B2' | 'C' | 'GD' | 'F';
}

export interface PlayerErrorType {
  name: 'Bad Pass' | 'Travel' | 'Double Dribble' | 'Offensive Foul' | '3 Second Violation' | '5 Second Violation' | '8 second Violation' | 'Back Field Violation';
}

// export interface Timeout {
//   name: 'T1' | 'T2' | 'T3' | 'T4' | 'T5';
// }
