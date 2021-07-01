import React from 'react';
import { Navigation } from './navigation';

interface IState {
  isOpened: boolean,
}

interface IProps {} 

export class Menu extends React.Component<IProps, IState> {
  constructor(props: IProps){
    super(props);
    this.state = {
      isOpened: false
    }
  }

  menuClickHandler() {
    this.setState({ isOpened: this.state.isOpened ? false : true });
  }

  render() {
    return (
      <React.Fragment>
        <div className="menu" onClick={() => this.menuClickHandler()}>
          <span className={this.state.isOpened ? 'active' : ''}/>
        </div>
        <Navigation isOpened={this.state.isOpened}/>
      </React.Fragment>
    );
  }
}
