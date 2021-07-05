import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { playSound } from '../utils';

interface GameOverProps {
  isWon: boolean;
  mistakes: number;
}

export const GameOver = (props: GameOverProps) => {
  const history = useHistory();

  useEffect(() => {
    if (props.isWon) {
      playSound('audio/success.mp3');
    } else {
      playSound('audio/failure.mp3');
    }
    setTimeout(() => history.push('/'), 3000);
  });

  return (
    <div className="game-over">
      <h2 className="game-result">{props.isWon ? 'you won' : `${props.mistakes} mistakes`}</h2>
      <div className="result-image">
        <img
          src={props.isWon ? './assets/img/success.jpg' : './assets/img/failure.jpg'}
          alt={props.isWon ? 'success' : 'failure'}
        />
      </div>
    </div>
  );
};
