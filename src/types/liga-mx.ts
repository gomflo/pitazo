export interface Match {
  time: string;
  home: string;
  away: string;
  channels: string[];
}

export interface LigaMx {
  updatedAt: string;
  matchesByDate: Record<string, Match[]>;
}
