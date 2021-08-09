import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation } from './navigation';
import { RootState } from '../reducers/rootReducer';
import { IS_MENU_OPENED } from '../constants';

export const Menu = () => {
  const isMenuOpened = useSelector((state: RootState) => state.cardSet?.isMenuOpened);

  const dispatch = useDispatch();
  const menuClickHandler = () => {
    dispatch({
      type: IS_MENU_OPENED,
      isMenuOpened: !isMenuOpened,
    });
  };

  return (
    <>
      <div className="menu" onClick={() => menuClickHandler()}>
        <span className={isMenuOpened ? 'line active' : 'line'} />
      </div>
      <Navigation />
    </>
  );
};
