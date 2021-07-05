import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CARD_SET_NUMBER } from '../constants';
import { RootState } from '../reducers/rootReducer';

interface IProps {
  category: string;
  cardSet: number;
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
        to="/wordset"
        onClick={() => {
          setCardSetNumber(props.cardSet);
        }}
        className={cardSetNumber === props.cardSet ? 'nav-link nav-link_active' : 'nav-link'}>
        {props.category}
      </Link>
    </li>
  );
};
