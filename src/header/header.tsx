import React from 'react';
import { Menu } from './menu';
import { Switch } from './switch';

export class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="wrapper">
          <div className="header-inner">
            <Menu />
            <Switch />
          </div>
        </div>
      </header>
    );
  }
}
