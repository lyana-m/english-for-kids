import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { playSound } from '../services/utils';
import { ISelectedCard } from './word-set';

interface IGameHandler {
  (card: ISelectedCard): void;
}

export interface IProps {
  word?: string;
  translation?: string;
  image?: string;
  audioSrc?: string;
  isGameStarted?: boolean;
  gameHandler?: IGameHandler;
  isCardGuessed?: boolean;
}

export const WordCard = (props: IProps) => {
  const [isFlipped, setFlipped] = useState(false);

  const mode = useSelector((state: RootState) => state.cardSet?.mode);
  const isGameStarted = useSelector((state: RootState) => state.cardSet?.isGameStarted);

  const saveClick = (card: ISelectedCard) => {
    const old = localStorage.getItem(card.word);

    if (old) {
      const savedCard = JSON.parse(old);
      localStorage.setItem(
        savedCard.word,
        JSON.stringify({
          word: savedCard.word,
          translation: savedCard.translation,
          category: savedCard.category,
          clicks: savedCard.clicks + 1,
          correct: savedCard.correct,
          wrong: savedCard.wrong,
          error: savedCard.error,
          image: savedCard.image,
          audio: savedCard.audio,
        }),
      );
    }
  };

  const playWord = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, src: string | undefined, card: ISelectedCard) => {
    if (!(e.target as HTMLElement).classList.contains('arrow-btn-icon') && mode === 'train') {
      playSound(src);
      saveClick(card);
    }
  };

  const cardImage = {
    background: `url(${props.image}) top left / cover no-repeat`,
  };

  let cardClassName = 'card';
  if (props.isCardGuessed && isGameStarted) {
    cardClassName += ' guessed';
  } else {
    cardClassName = 'card';
  }

  return (
    <div className={cardClassName}>
      <div
        onClick={(e) =>
          isGameStarted
            ? props.gameHandler!({ word: props.word!, translation: props.translation })
            : playWord(e, props.audioSrc, { word: props.word!, translation: props.translation })
        }
        className={!isFlipped ? 'front' : 'front front-flipped'}
        style={cardImage}>
        {mode === 'train' && (
          <div className="info">
            <p className="word">{props.word}</p>
            <div className="arrow-btn" onClick={() => setFlipped(true)}>
              <svg
                className="arrow-btn-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24">
                <path d="M12 0c3.31 0 6.291 1.353 8.459 3.522l2.48-2.48 1.061 7.341-7.437-.966 2.489-2.489c-1.808-1.807-4.299-2.928-7.052-2.928-5.514 0-10 4.486-10 10s4.486 10 10 10c3.872 0 7.229-2.216 8.89-5.443l1.717 1.046c-2.012 3.803-6.005 6.397-10.607 6.397-6.627 0-12-5.373-12-12s5.373-12 12-12z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      {mode === 'train' && (
        <div
          className={!isFlipped ? 'back' : 'back back-flipped'}
          style={cardImage}
          onMouseLeave={() => setFlipped(false)}>
          <div className="info">
            <p className="word">{props.translation}</p>
          </div>
        </div>
      )}
    </div>
  );
};
