import React, { FC } from 'react';
import ScoreLayout from './ScoreLayout';
import ScoreList from './ScoreList';
import { useGameContext } from '@/providers/GameProvider';
import { Player } from '@/types/gameTypes';


interface UpperLayerScoreProps {
  currentPlayer: Player
  inView?: boolean
}

const UpperLayerScore: FC<UpperLayerScoreProps> = ({currentPlayer, inView}) => {
  const { aces, twos, threes, fours, fives, sixes } = currentPlayer.stats.upper_layer;

  return (
    <ScoreLayout>
      <ScoreList
        title="Aces"
        value={aces}
        object_key="aces"
        layer="upper_layer"
        currentPlayer={currentPlayer}
        inView={inView}
      />
      <ScoreList
        title="Twos"
        value={twos}
        object_key="twos"
        layer="upper_layer"
        currentPlayer={currentPlayer}
        inView={inView}
      />
      <ScoreList
        title="Threes"
        value={threes}
        object_key="threes"
        layer="upper_layer"
        currentPlayer={currentPlayer}
        inView={inView}
      />
      <ScoreList
        title="Fours"
        value={fours}
        object_key="fours"
        layer="upper_layer"
        currentPlayer={currentPlayer}
        inView={inView}
      />
      <ScoreList
        title="Fives"
        value={fives}
        object_key="fives"
        layer="upper_layer"
        currentPlayer={currentPlayer}
        inView={inView}
      />
      <ScoreList
        title="Sixes"
        value={sixes}
        object_key="sixes"
        layer="upper_layer"
        currentPlayer={currentPlayer}
        inView={inView}
      />
    </ScoreLayout>
  );
};

export default UpperLayerScore;