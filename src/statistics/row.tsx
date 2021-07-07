import React from 'react';

interface IRow {
  word: string;
  translation: string;
  category: string;
  clicks: number;
  correct: number;
  wrong: number;
  percentage: number;
}

export const Row = (props: IRow) => {
  return (
    <tr>
      <td>{props.word}</td>
      <td>{props.translation}</td>
      <td>{props.category}</td>
      <td>{props.clicks}</td>
      <td>{props.correct}</td>
      <td>{props.wrong}</td>
      <td>{props.percentage}</td>
    </tr>
  );
};
