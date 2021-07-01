import React from 'react';

export class Switch extends React.Component {
  render() {
    return (
      <div className="switch">
        <label className="switch__box" htmlFor="switch">
          <input className="switch__input" type="checkbox" id="switch"/>
          <span className="switch__slider round"></span>
        </label>
      </div>
    );
  }
}
