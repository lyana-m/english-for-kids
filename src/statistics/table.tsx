import React, { useState } from 'react';

import { cardsSet, categoriesSet } from '../word-set/cardsProps';
import { Row } from './row';

export interface IStatWord {
  [key: string]: string | number;
  word: string;
  translation: string;
  category: string;
  clicks: number;
  correct: number;
  wrong: number;
  percentage: number;
}

interface ITableProps {
  clear: string;
}

export const Table = (props: ITableProps) => {
  const [sortCriteria, setSortCriteria] = useState('word');
  const [sortOrder, setSortOrder] = useState('ASC');

  if (props.clear === 'clear') {
    console.log('clear');
    categoriesSet.forEach((set, index) => {
      cardsSet[index].forEach((card) => {
        localStorage.setItem(
          card.word,
          JSON.stringify({
            word: card.word,
            translation: card.translation,
            category: set,
            clicks: 0,
            correct: 0,
            wrong: 0,
            percentage: 0,
            image: card.image,
            audio: card.audioSrc,
          }),
        );
      });
    });
  }

  const excludedKey = ['length', 'clear', 'getItem', 'key', 'removeItem', 'setItem'];
  const allWords: IStatWord[] = [];
  Object.keys(localStorage).forEach((key) => {
    if (!excludedKey.includes(key)) {
      allWords.push(JSON.parse(localStorage.getItem(key)!));
      allWords.sort((a, b) => {
        if (sortOrder === 'ASC') {
          return a[sortCriteria] > b[sortCriteria] ? 1 : -1;
        }
        return a[sortCriteria] < b[sortCriteria] ? 1 : -1;
      });
    }
  });

  const sort = (criteria: string) => {
    setSortCriteria(criteria);
    setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
  };

  return (
    <table className="table">
      <tbody>
        <tr>
          <th onClick={() => sort('word')}>Word</th>
          <th onClick={() => sort('translation')}>Translation</th>
          <th onClick={() => sort('category')}>Category</th>
          <th onClick={() => sort('clicks')}>Cliks</th>
          <th onClick={() => sort('correct')}>Correct</th>
          <th onClick={() => sort('wrong')}>Wrong</th>
          <th onClick={() => sort('percentage')}>% correct</th>
        </tr>
        {allWords.map((word: IStatWord) => {
          return (
            <Row
              key={word.word}
              word={word.word}
              translation={word.translation}
              category={word.category}
              clicks={word.clicks}
              correct={word.correct}
              wrong={word.wrong}
              percentage={word.percentage}
            />
          );
        })}
      </tbody>
    </table>
  );
};
