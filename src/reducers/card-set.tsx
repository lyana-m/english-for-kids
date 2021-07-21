import {
  SET_CARD_SET_NUMBER,
  IS_MENU_OPENED,
  MODE,
  IS_GAME_STARTED,
  GUESSED_CARDS,
  GAME_CARDS,
  IS_MODAL_OPENED,
  CATEGORY_ID,
  GAME_CATEGORY_ID,
} from '../constants';

interface IAction {
  type: string;
  number: number;
  isMenuOpened: boolean;
  mode: string;
  isGameStarted: boolean;
  isModalOpened: boolean;
  categoryId: string;
  guessedCards: string[];
  gameCards: IWordCard[];
  gameCategoryId: string;
}
interface IWordCard {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

const initialState = {
  cardSetNumber: -1,
  isMenuOpened: false,
  mode: 'train',
  isGameStarted: false,
  isModalOpened: false,
  categoryId: '',
  guessedCards: new Array<string>(),
  gameCards: new Array<IWordCard>(),
  gameCategoryId: '',
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

    case IS_MODAL_OPENED:
      return { ...state, isModalOpened: action.isModalOpened };

    case CATEGORY_ID:
      return { ...state, categoryId: action.categoryId };

    case GAME_CATEGORY_ID:
      return { ...state, gameCategoryId: action.gameCategoryId };

    default:
      return state;
  }
};
