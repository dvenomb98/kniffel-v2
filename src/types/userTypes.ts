export interface UserMetaData {
    playerName: string;
    condition_agreement: boolean;
  }

  export interface GameHistory {
    id: string
    won: boolean
    score: number
    opponentId: string
    opponentScore: number
  }

  export interface UserData {
    userId: string;
    email: string;
    playerName: string
    statistics: {
      wins: number
      losts: number
    }
    gameHistory: GameHistory[]
  }


  export interface Leaderboard {
    userId: string
    playerName: string
    statistics: {
      wins: number
      losts: number
    }
  }