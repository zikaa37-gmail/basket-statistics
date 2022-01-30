export interface CourtAction {
  player?: Player;
  position: '1' | 'Z' | '2' | '2p' | '3';
  scored: boolean;
  xPosition: number;
  yPosition: number;
  time?: string;
}

export interface PointMarks {
  cx: number;
  cy: number;
  fill: string;
  time?: string;
}


export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  nickname: string;
  jerseyNumber: string;
  selected: boolean | null;
  stats: Stats;
}

export class Stats {
  freeThrow = 0;
  freeThrowAttempted = 0;
  paintShot = 0;
  paintShotAttempted = 0;
  twoPointShot = 0;
  twoPointShotAttempted = 0;
  threePointShot = 0;
  threePointShotAttempted = 0;
  totalPointsScored = 0;
  totalPointsAttempted = 0;
  totalPointsPercentage = 0;
  assist = 0;
  foulCommited = 0;
  foulTaken = 0;
  steal = 0;
  turnover = 0;
  blockedShot = 0;
  deffRebound = 0;
  offRebound = 0;
  index = 0;
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
  totalPointsScored = 0;
  totalPointsAttempted = 0;
  totalPointsPercentage = 0;
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

