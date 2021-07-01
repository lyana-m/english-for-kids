import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  category: string;
}

export class NavItem extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <li className="nav-item">
        <Link to='/wordset' className="nav-link">{this.props.category}</Link>
      </li>
    );
  }
}
