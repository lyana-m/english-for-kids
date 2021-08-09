import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WordCard } from './word-card';
import { RootState } from '../reducers/rootReducer';
import { RouteComponentProps } from 'react-router-dom';
import { playSound, getRandomInteger } from '../services/utils';
import { GameOver } from './game-over';
import { IS_GAME_STARTED } from '../constants';
import { getWords } from '../services/api';

export interface ISelectedCard {
  word: string;
  audioSrc?: string;
  translation?: string;
}
type TParams = { id: string };

interface IWordCard {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

export const WordSet = ({ match }: RouteComponentProps<TParams>) => {
  const [playedCard, setPlayedCard] = useState({ word: '', translation: '', image: '', audioSrc: '' });
  const [guessedCards, addGuessedCard] = useState<string[]>([]);
  const [answers, addAnswer] = useState<boolean[]>([]);
  const [isGameOver, setGameOver] = useState(false);
  const [words, setWords] = useState([]);

  const mode = useSelector((state: RootState) => state.cardSet?.mode);
  const isGameStarted = useSelector((state: RootState) => state.cardSet?.isGameStarted);

  useEffect(() => {
    const fetchData = async () => {
      const words = await getWords(match.params.id, 'user');
      setWords(words);
    };
    fetchData();
  }, [match.params.id]);

  let cards: IWordCard[] = words;

  const [gameCards, updateGameCards] = useState([...cards]);

  const dispatch = useDispatch();

  const setCurrentWord = (cardsArray: IWordCard[]) => {
    const randomCard = cardsArray[getRandomInteger(0, cardsArray.length - 1)];
    setPlayedCard(randomCard);
    setTimeout(() => playSound(randomCard.audioSrc), 1000);
  };

  const startGame = () => {
    addGuessedCard([]);
    addAnswer([]);
    const newGameGards = cards;
    updateGameCards(newGameGards);
    setCurrentWord(newGameGards);
    dispatch({ type: IS_GAME_STARTED, isGameStarted: true });
  };

  const repeat = () => {
    playSound(playedCard.audioSrc);
  };

  const saveCorrect = (card: ISelectedCard) => {
    const old = localStorage.getItem(card.word);

    if (old) {
      const savedCard = JSON.parse(old);
      localStorage.setItem(
        savedCard.word,
        JSON.stringify({
          word: savedCard.word,
          translation: savedCard.translation,
          category: savedCard.category,
          clicks: savedCard.clicks,
          correct: savedCard.correct + 1,
          wrong: savedCard.wrong,
          percentage: Math.ceil(((savedCard.correct + 1) / (savedCard.clicks ? savedCard.clicks : 1)) * 100) / 100,
          image: savedCard.image,
          audio: savedCard.audio,
        }),
      );
    }
  };

  const saveWrong = (card: ISelectedCard) => {
    const old = localStorage.getItem(card.word);
    if (old) {
      const savedCard = JSON.parse(old);
      localStorage.setItem(
        card.word,
        JSON.stringify({
          word: savedCard.word,
          translation: savedCard.translation,
          category: savedCard.category,
          clicks: savedCard.clicks,
          correct: savedCard.correct,
          wrong: savedCard.wrong + 1,
          percentage: savedCard.percentage,
          image: savedCard.image,
          audio: savedCard.audio,
        }),
      );
    }
  };

  const gameHandler = (card: ISelectedCard) => {
    const selectedCardWord = card.word;
    if (selectedCardWord === playedCard.word) {
      const updatedCards = [...gameCards].filter((gameCard) => gameCard.word !== selectedCardWord);
      addGuessedCard([...guessedCards, card.word!]);
      addAnswer([...answers, true]);
      playSound('/assets/audio/correct.mp3');
      saveCorrect(card);

      if (gameCards.length === 1) {
        dispatch({ type: IS_GAME_STARTED, isGameStarted: false });
        setGameOver(true);
      } else {
        updateGameCards(updatedCards);
        setCurrentWord(updatedCards);
      }
    } else {
      addAnswer([...answers, false]);
      playSound('/assets/audio/error.mp3');
      saveWrong(playedCard);
    }
  };

  return (
    <div className="main-container">
      <div className="wrapper">
        {isGameOver ? (
          <GameOver isWon={!answers.includes(false)} mistakes={answers.filter((answer) => answer === false).length} />
        ) : (
          <>
            <h2 className="selected-category"></h2>
            <div className="stars-container">
              {isGameStarted &&
                answers.map((answer, index) => {
                  if (answer === true) {
                    return (
                      <div key={index} className="star filled-star">
                        <img src="/assets/icons/star-filled.svg" alt="yes" />
                      </div>
                    );
                  }
                  return (
                    <div key={index} className="star outlined-star">
                      <img src="/assets/icons/star-outlined.svg" alt="no" />
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
                className={isGameStarted ? 'button game-button repeat' : 'button game-button'}
                onClick={() => (isGameStarted ? repeat() : startGame())}>
                {isGameStarted ? <img src="/assets/icons/repeat.svg" alt="repeat" /> : 'Start Game'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
