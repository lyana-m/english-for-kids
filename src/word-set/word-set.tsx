import React from 'react';
// import cardsProps from './cardsProps';
import { WordCard } from './word-card';
import { cardsSet, IWordCard } from './cardsProps';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { useState } from 'react'

interface IState {
  cardsSetNumber: number;
}

// export class WordSet extends React.Component<{}, IState> {
  // constructor(props: {}) {
  //   super(props);
  //   this.state = {
  //     cardsSetNumber: 2,
  //   };
  // }
export const WordSet = () => {
  
  // const [count, setCount] = useState(0);
  
  // render() {
    const cardSetNumber = useSelector((state: RootState) => state.cardSet?.cardSetNumber);
    const cards: IWordCard[] = cardsSet[cardSetNumber!];

    return (
      <div className="wrapper">
        <div className="cards-contaiter">
          {cards?.map((card, index) => {
            return (
              <WordCard
                word={card.word}
                translation={card.translation}
                audioSrc={card.audioSrc}
                image={card.image}
                key={index}
              />
            );
          })}
        </div>
      </div>
    );
  }
// }

// export default connect(state: RootState => ({
//   cardSetNumber: state.cardSetNumber
// }))(WordSet)