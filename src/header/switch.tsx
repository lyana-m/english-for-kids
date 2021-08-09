import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IS_GAME_STARTED, MODE } from '../constants';
import { RootState } from '../reducers/rootReducer';

export const Switch = () => {
  const mode = useSelector((state: RootState) => state.cardSet?.mode);
  const isGameStarted = useSelector((state: RootState) => state.cardSet?.isGameStarted);

  const dispatch = useDispatch();
  const changeHandler = () => {
    dispatch({ type: MODE, mode: mode === 'train' ? 'game' : 'train' });
    dispatch({type: IS_GAME_STARTED, isGameStarted: isGameStarted ? false : isGameStarted});
  };

  return (
    <div className="switch">
      <label className="switch" htmlFor="checkbox">
        <input
          type="checkbox"
          className="switch-input"
          id="checkbox"
          checked={mode === 'game' ? true : false}
          onChange={() => changeHandler()}
        />
        <span className="switch-label" data-on="Play" data-off="Train" />
        <span className="switch-handle" />
      </label>
    </div>
  );
};
