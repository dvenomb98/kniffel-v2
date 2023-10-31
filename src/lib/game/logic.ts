import {
    BottomLayer,
    BottomLayerKeys,
    Die,
    GameStats,
    Layer,
    Player,
    PossibleScore,
    ScoreKeys,
    UpperLayer,
    UpperLayerKeys,
  } from '@/types/gameTypes'
  import { nanoid } from 'nanoid';
  
  const isUpperLayerKey = (key: ScoreKeys): key is UpperLayerKeys => {
    return ['aces', 'twos', 'threes', 'fours', 'fives', 'sixes'].includes(key);
  };
  
  const isBottomLayerKey = (key: ScoreKeys): key is BottomLayerKeys => {
    return [
      'threes_of_kind',
      'fours_of_kind',
      'small_straight',
      'large_straight',
      'full_house',
      'yahtzee',
      'chance',
    ].includes(key);
  };
  
  export const hasAtLeastNOfAKind = (n: number, counts: { [key: number]: number }): boolean => {
    return Object.values(counts).some((count) => count >= n);
  };
  
  export const sumAllDice = (dice: Die[]): number => {
    return dice.reduce((sum, die) => sum + die.value, 0);
  };
  
  export const isSmallStraight = (counts: { [key: number]: number }): boolean => {
    const straights = [
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [3, 4, 5, 6],
    ];
    return straights.some((straight) => straight.every((num) => counts[num] >= 1));
  };
  
  export const isLargeStraight = (counts: { [key: number]: number }): boolean => {
    const straights = [
      [1, 2, 3, 4, 5],
      [2, 3, 4, 5, 6],
    ];
    return straights.some((straight) => straight.every((num) => counts[num] >= 1));
  };
  
  export const isFullHouse = (counts: { [key: number]: number }): boolean => {
    const values = Object.values(counts);
    return values.includes(2) && values.includes(3);
  };
  
  export const calculateChance = (dice: Die[]): number => {
    return sumAllDice(dice);
  };
  
  export const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  };
  
  export const generateDice = () => {
    const newDice = [];
    for (let i = 0; i < 5; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  };
  
  export const countDice = (dice: Die[]): { [key: number]: number } => {
    const counts: { [key: number]: number } = {};
  
    for (let die of dice) {
      if (counts[die.value]) {
        counts[die.value]++;
      } else {
        counts[die.value] = 1;
      }
    }
    return counts;
  };
  
  export const canAddScore = (
    scoreType: ScoreKeys,
    possibleScores: PossibleScore,
    layer: Layer,
    currentPlayer: Player,
  ) => {
    if (layer === 'upper_layer' && isUpperLayerKey(scoreType)) {
      if (!!currentPlayer.stats.upper_layer[scoreType]) {
        return false; // Score has already been assigned
      }
      return possibleScores.upper_layer[scoreType] > 0;
    }
    if (layer === 'bottom_layer' && isBottomLayerKey(scoreType)) {
      if (!!currentPlayer.stats.bottom_layer[scoreType]) {
        return false; // Score has already been assigned
      }
      return possibleScores.bottom_layer[scoreType] > 0;
    }
    return false;
  };
  
  export const calculatePossibleScores = (dice: Die[]) => {
    const counts = countDice(dice);
    // const values = Object.keys(counts).map(Number);
  
    const upper_layer = {
      aces: counts[1] * 1 || 0,
      twos: counts[2] * 2 || 0,
      threes: counts[3] * 3 || 0,
      fours: counts[4] * 4 || 0,
      fives: counts[5] * 5 || 0,
      sixes: counts[6] * 6 || 0,
    };
    const bottom_layer = {
      threes_of_kind: hasAtLeastNOfAKind(3, counts) ? sumAllDice(dice) : 0,
      fours_of_kind: hasAtLeastNOfAKind(4, counts) ? sumAllDice(dice) : 0,
      small_straight: isSmallStraight(counts) ? 30 : 0,
      large_straight: isLargeStraight(counts) ? 40 : 0,
      full_house: isFullHouse(counts) ? 25 : 0,
      yahtzee: hasAtLeastNOfAKind(5, counts) ? 50 : 0,
      chance: sumAllDice(dice),
    };
  
    return { upper_layer, bottom_layer };
  };
  
  export const calculateFinalScore = (
    playerStats: GameStats,
  ): { final_score: number; bonus_points: number } => {
    let final_score = 0;
    let bonus_points = 0;
    let upperLayerTotal = 0;
  
    for (const layerKey in playerStats) {
      if (playerStats.hasOwnProperty(layerKey)) {
        const layer = playerStats[layerKey as keyof GameStats];
        for (const key in layer) {
          if (
            layer.hasOwnProperty(key) &&
            typeof layer[key as keyof (UpperLayer | BottomLayer)] === 'number'
          ) {
            final_score += layer[key as keyof (UpperLayer | BottomLayer)];
          }
        }
      }
    }
    for (const key in playerStats.upper_layer) {
      const score = playerStats.upper_layer[key as keyof UpperLayer];
      if (typeof score === 'number') {
        upperLayerTotal += score;
      }
    }
  
    if (upperLayerTotal >= 63) {
      bonus_points += 35;
    }
  
    return { final_score: final_score + bonus_points, bonus_points };
  };