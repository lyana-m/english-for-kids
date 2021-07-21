import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NavItem } from './link';
import { RootState } from '../reducers/rootReducer';
import { IS_GAME_STARTED, IS_MODAL_OPENED, SET_CARD_SET_NUMBER } from '../constants';
import { getCategories } from '../services/api';

interface ICategory {
  _id: string;
  name: string;
  count: number;
  image: string;
}

export const Navigation = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const cardSetNumber = useSelector((state: RootState) => state.cardSet?.cardSetNumber);

  const dispatch = useDispatch();
  const setCardSetNumber = (number: number) => {
    dispatch({ type: SET_CARD_SET_NUMBER, number });
  };

  const isMenuOpened = useSelector((state: RootState) => state.cardSet?.isMenuOpened);
  const isModalOpened = useSelector((state: RootState) => state.cardSet?.isModalOpened);

  
  useEffect(() => {    
    const fetchData = async () => {
        const categories = await getCategories('user');
        setCategories(categories);
    };
    fetchData();
  }, []);

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

        {categories.map((cat, index) => {
          return <NavItem key={index} cardSet={index} category={cat.name} categoryId={cat._id}/>;
        })}
        <li
          className="nav-item"
          onClick={() => {
            setCardSetNumber(-2);
            dispatch({ type: IS_GAME_STARTED, isGameStarted: false });
          }}>
          <Link to="/statistics" className={cardSetNumber === -2 ? 'nav-link nav-link_active' : 'nav-link'}>
            Statistics
          </Link>
        </li>
      </ul>
      <button
        onClick={() => {
          dispatch({ type: IS_MODAL_OPENED, isModalOpened: isModalOpened ? false : true });
        }}
        type="button"
        className="button login-button">
        Login
      </button>
    </div>
  );
};
