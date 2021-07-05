import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CARD_SET_NUMBER } from '../constants';
import { RootState } from '../reducers/rootReducer';

interface IProps {
  title: string;
  image: string;
  setNumber: number;
}

export const CategoryCard = (props: IProps) => {
  const mode = useSelector((state: RootState) => state.cardSet?.mode);
  const dispatch = useDispatch();

  const setCardSetNumber = (number: number) => {
    dispatch({ type: SET_CARD_SET_NUMBER, number });
  };

  return (
    <Link
      onClick={() => setCardSetNumber(props.setNumber)}
      to="/wordset"
      className={mode === 'train' ? 'card category-card' : 'card category-card category-card-game'}>
      <div className="category-image">
        <img className="" src={`./assets/${props.image}`} alt="dance" />
      </div>
      <h2 className="category-name">{props.title}</h2>
    </Link>
  );
};
