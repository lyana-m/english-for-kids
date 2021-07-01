import React from 'react';
import { cardsSet, categoriesSet } from '../word-set/cardsProps';
import { CategoryCard } from './category-card';

export class Categories extends React.Component {
  
  render() {
        
    return (
      <div className="categories">
        <div className="wrapper">
          <div className="categories-inner">
            {categoriesSet.map((title, index) => {
              return <CategoryCard key={index} title={title} image={cardsSet[index][2].image}/>
            })}
          </div>
        </div>
      </div>
    );
  }
}
