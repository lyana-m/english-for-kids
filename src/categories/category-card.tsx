import React from 'react';

interface IProps {
  title: string;
  image?: string
}

// interface State {
//   title: string;
// }

export class CategoryCard extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className="card category-card">
        <div className="category-image">
          <img className="" src={'./assets/' + this.props.image} alt="dance"></img>
        </div>
        <h2 className="category-name">{this.props.title}</h2>
      </div>
    );
  }
}
