import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from './table';
import { WordCard } from '../word-set/word-card';
import { RootState } from '../reducers/rootReducer';
import { MODE } from '../constants';

interface IRepetedCard {
  word: string;
  translation: string;
  category: string;
  clicks: number;
  correct: number;
  wrong: number;
  percentage: number;
  image: string;
  audio: string;
}

export const Statistics = () => {
  const [clear, setClear] = useState('');
  const [isRepeatMode, setRepeatMode] = useState(false);
  const [difficultWordsToRepeat, setDifficultWordsToRepeat] = useState<IRepetedCard[]>([]);
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.cardSet?.mode);

  const trainDifficultWords = () => {
    dispatch({ type: MODE, mode: mode === 'game' ? 'train' : 'train' });

    setRepeatMode(true);
    const difficultWords: IRepetedCard[] = [];

    Object.keys(localStorage).forEach((key) => {
      difficultWords.push(JSON.parse(localStorage.getItem(key)!));
    });
    difficultWords.sort((a, b) => (a.wrong < b.wrong ? 1 : -1));
    const difficultWords2 = [...difficultWords].filter((word) => word.wrong).filter((word, index) => index < 8);
    console.log(difficultWords2);
    setDifficultWordsToRepeat(difficultWords2);
  };

  return (
    <div className="statistics">
      {isRepeatMode ? (
        <div className="wrapper">
          <div className="main-container cards-contaiter">
            {difficultWordsToRepeat.map((card) => {
              return (
                <WordCard
                  word={card.word}
                  translation={card.translation}
                  audioSrc={card.audio}
                  image={card.image}
                  key={card.word}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <div className="btn-container">
            <button onClick={() => trainDifficultWords()} className="button stat-button" type="button">
              Repeat
            </button>
            <button onClick={() => setClear(clear === '' ? 'clear' : '')} className="button stat-button" type="button">
              Reset
            </button>
          </div>
          <Table clear={clear} />
        </div>
      )}
    </div>
  );
};
