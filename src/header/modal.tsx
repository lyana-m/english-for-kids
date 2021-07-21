import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IS_MODAL_OPENED } from '../constants';
import { RootState } from '../reducers/rootReducer';
import { getAccessToken } from '../services/api';

export const Modal = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const isModalOpened = useSelector((state: RootState) => state.cardSet?.isModalOpened);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleReset = () => {
    dispatch({ type: IS_MODAL_OPENED, isModalOpened: false });
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    
    let accessToken: string | undefined;
    await getAccessToken({login: login, password: password}).then(obj => accessToken = obj.token).catch(e => new Error('error'));    

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('mode', 'admin')
      dispatch({ type: IS_MODAL_OPENED, isModalOpened: false });
      history.push('/admin');
      setLoginError(false);
    } else {
      setLoginError(true);
    } 
  };

  return (
    <div className={'modal ' + (isModalOpened ? 'modal-opened' : '')}>
      <form className="form">
        <h2 className="modal-header">Login</h2>
        <input
          onChange={(e) => setLogin(e.target.value)}
          className="login-input login-name"
          type="name"
          placeholder="login"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="login-input login-pass"
          type="password"
          placeholder="password"
        />
        {loginError && <div className="error-mesage">Wrong authentificate data</div> }
        <div className="button-container">
          <button onClick={() => handleReset()} className="button modal-button reset-button" type="reset">
            Cancel
          </button>
          <button onClick={(e) => handleSubmit(e)} className="button modal-button submit-button" type="submit">
            Login
          </button>
        </div>
      </form>
      <div className="overlay"></div>
    </div>
  );
};
