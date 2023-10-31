export interface UserMetaData {
    playerName: string;
    condition_agreement: boolean;
  }

  export interface UserData {
    userId: string;
    email: string;
    playerName: string
    statistics: {
      wins: number
      losts: number
    }
  }