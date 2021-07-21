import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector,  } from 'react-redux';
import { GAME_CATEGORY_ID, SET_CARD_SET_NUMBER } from '../constants';
import { RootState } from '../reducers/rootReducer';

interface IProps {
  title: string;
  image: string;
  setNumber: number;
  categoryId: string;
}

export const CategoryCard = (props: IProps) => {
  const mode = useSelector((state: RootState) => state.cardSet?.mode);
  const dispatch = useDispatch();

  const setCardSetNumber = (number: number) => {
    dispatch({ type: SET_CARD_SET_NUMBER, number });
    dispatch({ type: GAME_CATEGORY_ID, gameCategoryId: props.categoryId});
  };

  return (
    <Link
      onClick={() => setCardSetNumber(props.setNumber)}
      to={`/wordset/${props.categoryId}`}
      className={mode === 'train' ? 'card category-card' : 'card category-card category-card-game'}>
      <div className="category-image">
        <img className="" src={props.image ? props.image : '/assets/img/default-image.jpg'} alt="dance" />
      </div>
      <h2 className="category-name">{props.title}</h2>
    </Link>
  );
};
