import { SET_CARD_SET_NUMBER, IS_MENU_OPENED, MODE } from '../constants';

interface IAction {
  type: string;
  number: number;
  isMenuOpened: boolean;
  mode: string;
}

const initialState = {
  cardSetNumber: -1,
  isMenuOpened: false,
  mode: 'train',
};

export const cardSet = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_CARD_SET_NUMBER:
      return { ...state, cardSetNumber: action.number };

    case IS_MENU_OPENED:
      return { ...state, isMenuOpened: action.isMenuOpened };

    case MODE:
      return { ...state, mode: action.mode };

    default:
      return state;
  }
};
