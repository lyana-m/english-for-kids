import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IS_GAME_STARTED, SET_CARD_SET_NUMBER } from '../constants';
import { RootState } from '../reducers/rootReducer';

interface IProps {
  category: string;
  cardSet: number;
  categoryId: string;
}

export const NavItem = (props: IProps) => {
  const dispatch = useDispatch();
  const setCardSetNumber = (number: number) => {
    dispatch({ type: SET_CARD_SET_NUMBER, number });
  };

  const cardSetNumber = useSelector((state: RootState) => state.cardSet?.cardSetNumber);

  return (
    <li className="nav-item">
      <Link
        to={`/wordset/${props.categoryId}`}
        onClick={() => {
          setCardSetNumber(props.cardSet);
          dispatch({ type: IS_GAME_STARTED, isGameStarted: false });
        }}
        className={cardSetNumber === props.cardSet ? 'nav-link nav-link_active' : 'nav-link'}>
        {props.category}
      </Link>
    </li>
  );
};
