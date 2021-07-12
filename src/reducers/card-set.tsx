import { SET_CARD_SET_NUMBER, IS_MENU_OPENED, MODE, IS_GAME_STARTED, GUESSED_CARDS,GAME_CARDS} from '../constants';
import { IWordCard } from '../word-set/cardsProps';

interface IAction {
  type: string;
  number: number;
  isMenuOpened: boolean;
  mode: string;
  isGameStarted: boolean;
  guessedCards: string[];
  gameCards: IWordCard[];
}

const initialState = {
  cardSetNumber: -1,
  isMenuOpened: false,
  mode: 'train',
  isGameStarted: false,
  guessedCards: new Array<string>(),
  gameCards: new Array<IWordCard>(),
};

export const cardSet = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_CARD_SET_NUMBER:
      return { ...state, cardSetNumber: action.number };

    case IS_MENU_OPENED:
      return { ...state, isMenuOpened: action.isMenuOpened };

    case MODE:
      return { ...state, mode: action.mode };

      case IS_GAME_STARTED:
      return { ...state, isGameStarted: action.isGameStarted };

      case GUESSED_CARDS:
      return { ...state, guessedCards: action.guessedCards };

      case GAME_CARDS:
      return { ...state, gameCards: action.gameCards };

    default:
      return state;
  }
};
