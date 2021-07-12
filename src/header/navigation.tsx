import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { categoriesSet } from '../word-set/cardsProps';
import { NavItem } from './link';
import { RootState } from '../reducers/rootReducer';
import { IS_GAME_STARTED, SET_CARD_SET_NUMBER } from '../constants';

export const Navigation = () => {
  const cardSetNumber = useSelector((state: RootState) => state.cardSet?.cardSetNumber);

  const dispatch = useDispatch();
  const setCardSetNumber = (number: number) => {
    dispatch({ type: SET_CARD_SET_NUMBER, number });
  };

  const isMenuOpened = useSelector((state: RootState) => state.cardSet?.isMenuOpened);

  return (
    <div className={isMenuOpened ? 'nav nav-opened' : 'nav'}>
      <ul className="nav-list">
        <li
          className="nav-item"
          onClick={() => {
            setCardSetNumber(-1);
            dispatch({ type: IS_GAME_STARTED, isGameStarted: false });
          }}>
          <Link to="/" className={cardSetNumber === -1 ? 'nav-link nav-link_active' : 'nav-link'}>
            Main
          </Link>
        </li>

        {categoriesSet.map((cat, index) => {
          return <NavItem key={index} cardSet={index} category={cat} />;
        })}
        <li
          className="nav-item"
          onClick={() => {
            setCardSetNumber(-2);
            dispatch({ type: IS_GAME_STARTED, isGameStarted: false});
          }}>
          <Link to="/statistics" className={cardSetNumber === -2 ? 'nav-link nav-link_active' : 'nav-link'}>
            Statistics
          </Link>
        </li>
      </ul>
    </div>
  );
};
