import { Player} from '@/types/gameTypes';
import React, { FC } from 'react';
import ScoreLayout from './ScoreLayout';
import ScoreList from './ScoreList';


const layerType = 'bottom_layer';

interface BottomLayerScoreProps {
  currentPlayer: Player
  inView?: boolean
}

const BottomLayerScore: FC<BottomLayerScoreProps> = ({currentPlayer, inView}) => {
 
  const {
    threes_of_kind,
    fours_of_kind,
    small_straight,
    large_straight,
    full_house,
    yahtzee,
    chance,
  } = currentPlayer.stats.bottom_layer;

  return (
    <ScoreLayout>
      <ScoreList
        title="3 of kind"
        value={threes_of_kind}
        layer={layerType}
        object_key="threes_of_kind"
        currentPlayer={currentPlayer}
        inView={inView}
      />
      <ScoreList
        title="4 of kind"
        value={fours_of_kind}
        layer={layerType}
        object_key="fours_of_kind"
        currentPlayer={currentPlayer}
        inView={inView}
      />
      <ScoreList
        title="Small straight"
        value={small_straight}
        layer={layerType}
        object_key="small_straight"
        currentPlayer={currentPlayer}
        inView={inView}
      />
      <ScoreList
        title="Large straight"
        value={large_straight}
        layer={layerType}
        object_key="large_straight"
        currentPlayer={currentPlayer}
        inView={inView}
      />
      <ScoreList
        title="Full house"
        value={full_house}
        layer={layerType}
        object_key="full_house"
        currentPlayer={currentPlayer}
        inView={inView}
      />
      <ScoreList
        title="Yahtzee"
        value={yahtzee}
        layer={layerType}
        object_key="yahtzee"
        currentPlayer={currentPlayer}
        inView={inView}
      />
      <ScoreList
        title="Chance"
        value={chance}
        layer={layerType}
        object_key="chance"
        currentPlayer={currentPlayer}
        inView={inView}
      />
    </ScoreLayout>
  );
};

export default BottomLayerScore;