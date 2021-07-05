import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MODE } from '../constants';
import { RootState } from '../reducers/rootReducer';

export const Switch = () => {
  const mode = useSelector((state: RootState) => state.cardSet?.mode);

  const dispatch = useDispatch();
  const changeHandler = () => {
    dispatch({ type: MODE, mode: mode === 'train' ? 'game' : 'train' });
  };

  return (
    <div className="switch">
      <label className="switch" htmlFor="checkbox">
        <input type="checkbox" className="switch-input" id="checkbox" onChange={() => changeHandler()} />
        <span className="switch-label" data-on="Play" data-off="Train" />
        <span className="switch-handle" />
      </label>
    </div>
  );
};
