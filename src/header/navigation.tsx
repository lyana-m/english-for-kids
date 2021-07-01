import React from 'react';
import { categoriesSet } from '../word-set/cardsProps';
import { NavItem } from './link';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { SET_CARD_SET_NUMBER } from '../constants';

interface IProps {
  isOpened: boolean;
}

export const Navigation = (props: IProps) => {
  const cardSetNumber = useSelector((state: RootState) => state.cardSet?.cardSetNumber);

  const dispatch = useDispatch();

  const setCardSetNumber = (number: number) => {
    dispatch({ type: SET_CARD_SET_NUMBER, number: number });
  };

  return (
    <div className={props.isOpened ? 'nav nav-opened' : 'nav'}>
      <ul className="nav-list">
        <li className="nav-item" onClick={() => setCardSetNumber(-1)}>
          <Link to="/" className={cardSetNumber === -1 ? 'nav-link nav-link_active' : 'nav-link'}>
            Main
          </Link>
        </li>

        {categoriesSet.map((cat, index) => {
          return <NavItem key={index} cardSet={index} category={cat} />;
        })}
      </ul>
    </div>
  );
};
