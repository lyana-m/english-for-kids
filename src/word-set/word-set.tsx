import React from 'react';
// import cardsProps from './cardsProps';
import { WordCard } from './word-card';
import { cardsSet, IWordCard } from './cardsProps';

export class WordSet extends React.Component<IWordCard, {}> {
  render() {
    const cards: IWordCard[] = cardsSet[1];

    return (
      <div className="wrapper">
        <div className="cards-contaiter">
          <WordCard
            word={cards[1].word}
            translation={cards[1].translation}
            audioSrc={cards[1].audioSrc}
            image={cards[1].image}
          />
        </div>
      </div>
    );
  }
}
