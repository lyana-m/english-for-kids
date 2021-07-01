import React from 'react';
import { IWordCard } from './cardsProps';

// export interface IWordCardProps {
//   [key: string]: string;
// }

// interface IWordCardState {
//   word?: string;
//   translation?: string;
//   image?: string;
//   audioSrc?: string;
//   isFlipped: boolean;
// }

// interface IUpdateCardsSetNumber {
//   (number: number): void;
// }

interface IProps {
  word?: string;
  translation?: string;
  image?: string;
  audioSrc?: string;
  // updateCardsSetNumber: IUpdateCardsSetNumber;
}

interface IState {
  isFlipped: boolean;
}

export class WordCard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isFlipped: false,
    };
  }

  handleArrowClick() {
    this.setState({ isFlipped: true });
  }

  handleMouseLeave() {
    this.setState({ isFlipped: false });
  }

  async playSound(src: string | undefined) {
    const audio = new Audio();
    if (src) audio.src = './assets/' + src;
    audio.currentTime = 0;
    audio.play();
  }

  render() {
    const cardImage = {
      background: 'url(./assets/' + this.props.image + ')',
    };

    return (
      <div className="card">
        <div
          onClick={() => this.playSound(this.props.audioSrc)}
          className={!this.state.isFlipped ? 'front' : 'front front-flipped'}
          style={cardImage}>
          <div className="info">
            <p className="word">{this.props.word}</p>
            <div className="arrow-btn" onClick={() => this.handleArrowClick()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24">
                <path d="M12 0c3.31 0 6.291 1.353 8.459 3.522l2.48-2.48 1.061 7.341-7.437-.966 2.489-2.489c-1.808-1.807-4.299-2.928-7.052-2.928-5.514 0-10 4.486-10 10s4.486 10 10 10c3.872 0 7.229-2.216 8.89-5.443l1.717 1.046c-2.012 3.803-6.005 6.397-10.607 6.397-6.627 0-12-5.373-12-12s5.373-12 12-12z" />
              </svg>
            </div>
          </div>
        </div>
        <div
          className={!this.state.isFlipped ? 'back' : 'back back-flipped'}
          style={cardImage}
          onMouseLeave={() => this.handleMouseLeave()}>
          <div className="info">
            <p className="word">{this.props.translation}</p>
          </div>
        </div>
      </div>
    );
  }
}
