import { SET_CARD_SET_NUMBER } from '../constants';

interface IAction {
  type: string,
  number: number
}

const initialState = {
  cardSetNumber: -1,
};

export const cardSet = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_CARD_SET_NUMBER:
      return {...state, cardSetNumber: action.number};

      default: 
      return state;
  }
};
