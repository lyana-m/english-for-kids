import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { WordCard } from './word-card';
import { cardsSet, categoriesSet, IWordCard } from './cardsProps';
import { RootState } from '../reducers/rootReducer';

import { playSound, getRandomInteger } from '../utils';
import { GameOver } from './game-over';

export interface ISelectedCard {
  word: string;
  audioSrc: string;
}

export const WordSet = () => {
  const [isGameStarted, setStarted] = useState(false);
  const [playedCard, setPlayedCard] = useState({ word: '', translation: '', image: '', audioSrc: '' });
  const [guessedCards, addGuessedCard] = useState<string[]>([]);
  const [answers, addAnswer] = useState<boolean[]>([]);
  const [isGameOver, setGameOver] = useState(false);

  const mode = useSelector((state: RootState) => state.cardSet?.mode);
  const cardSetNumber = useSelector((state: RootState) => state.cardSet?.cardSetNumber);
  const cards: IWordCard[] = cardsSet[cardSetNumber!];

  const [gameCards, updateGameCards] = useState([...cards]);

  const setCurrentWord = (cardsArray: IWordCard[]) => {
    const randomCard = cardsArray[getRandomInteger(0, cardsArray.length - 1)];
    setPlayedCard(randomCard);
    setTimeout(() => playSound(randomCard.audioSrc), 1000);
  };

  const startGame = () => {
    setStarted(true);
    setCurrentWord(gameCards);
  };

  const repeat = () => {
    playSound(playedCard.audioSrc);
  };

  const gameHandler = (word: string | undefined) => {
    const selectedCardWord = word;
    if (selectedCardWord === playedCard.word) {
      const updatedCards = [...gameCards].filter((card) => card.word !== selectedCardWord);
      addGuessedCard([...guessedCards, word!]);
      addAnswer([...answers, true]);
      playSound('audio/correct.mp3');

      if (gameCards.length === 1) {
        setStarted(false);
        console.log('all matched');
        setGameOver(true);
      } else {
        updateGameCards(updatedCards);
        setCurrentWord(updatedCards);
      }
    } else {
      addAnswer([...answers, false]);
      playSound('audio/error.mp3');
    }
  };

  return (
    <div className="main-container">
      <div className="wrapper">
        {isGameOver ? (
          <GameOver isWon={!answers.includes(false)} mistakes={answers.filter((answer) => answer === false).length} />
        ) : (
          <>
            <h2 className="selected-category">{categoriesSet[cardSetNumber]}</h2>
            <div className="stars-container">
              {answers.map((answer, index) => {
                if (answer === true) {
                  return (
                    <div key={index} className="star filled-star">
                      <img src="./assets/icons/star-filled.svg" alt="yes" />
                    </div>
                  );
                }
                return (
                  <div key={index} className="star outlined-star">
                    <img src="./assets/icons/star-outlined.svg" alt="no" />
                  </div>
                );
              })}
            </div>
            <div className="cards-contaiter">
              {cards?.map((card, index) => {
                return (
                  <WordCard
                    word={card.word}
                    translation={card.translation}
                    audioSrc={card.audioSrc}
                    image={card.image}
                    key={index}
                    isGameStarted={isGameStarted}
                    gameHandler={gameHandler}
                    isCardGuessed={!!guessedCards.includes(card.word)}
                  />
                );
              })}
            </div>
            {mode === 'game' && (
              <button
                type="button"
                className={isGameStarted ? 'game-button repeat' : 'game-button'}
                onClick={() => (isGameStarted ? repeat() : startGame())}>
                {isGameStarted ? <img src="./assets/icons/repeat.svg" alt="repeat" /> : 'Start Game'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
