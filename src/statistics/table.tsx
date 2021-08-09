import React, { useEffect, useState } from 'react';
import { getAllWords } from '../services/api';
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

interface IStatisticsWord {
  word: string;
  translation: string;
  categoryName: string;
  image: string;
  audio: string;
}

export const Table = (props: ITableProps) => {
  const [statWords, setStatWords] = useState<IStatisticsWord[]>([]);
  const [sortCriteria, setSortCriteria] = useState('word');
  const [sortOrder, setSortOrder] = useState('ASC');

  useEffect(() => {
    const fetchData = async () => {
      const words = await getAllWords('user');
      setStatWords(words);
    };
    fetchData();
  }, []);

  if (props.clear === 'clear') {
    statWords.forEach((card) => {
      localStorage.setItem(
        card.word,
        JSON.stringify({
          word: card.word,
          translation: card.translation,
          category: card.categoryName,
          clicks: 0,
          correct: 0,
          wrong: 0,
          percentage: 0,
          image: card.image,
          audio: card.audio,
        }),
      );
    });
  }

  const excludedKey = ['length', 'clear', 'getItem', 'key', 'removeItem', 'setItem', 'admin', 'mode'];
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
