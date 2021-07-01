import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SET_CARD_SET_NUMBER } from '../constants';

interface IProps {
  title?: string;
  image?: string;
  setNumber: number;
}

// interface State {
//   title: string;
// }

// export class CategoryCard extends React.Component<IProps, {}> {
//   constructor(props: IProps) {
//     super(props);
//   }

export const CategoryCard = (props: IProps) => {
  const dispatch = useDispatch();

  const setCardSetNumber = (number: number) => {
    dispatch({ type: SET_CARD_SET_NUMBER, number: number });
  };

  // render() {
  return (
    <Link
      onClick={() => setCardSetNumber(props.setNumber)}
      to="/wordset"
      className="card category-card">
      <div className="category-image">
        <img className="" src={'./assets/' + props.image} alt="dance"></img>
      </div>
      <h2 className="category-name">{props.title}</h2>
    </Link>
  );
};
// }
