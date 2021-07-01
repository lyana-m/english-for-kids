import React from 'react';
import { categoriesSet } from '../word-set/cardsProps';
import { NavItem } from './link';
import { Link } from 'react-router-dom';

interface IProps {
  isOpened: boolean;
} 

export class Navigation extends React.Component<IProps, {}> {
  constructor(props: IProps){
    super(props);  
  }
  render() {
    return (
      <div className={this.props.isOpened ? 'nav nav-opened' : 'nav'}>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to='/' className="nav-link">Main</Link>
          </li>

          {categoriesSet.map((cat, index) => {
            return <NavItem key={index} category={cat}/>
          })}
        </ul>
      </div>
    );
  }
}
