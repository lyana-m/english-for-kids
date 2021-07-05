import React from 'react';
import { cardsSet, categoriesSet } from '../word-set/cardsProps';
import { CategoryCard } from './category-card';

export const Categories = () => {
  return (
    <div className="categories">
      <div className="wrapper">
        <div className="categories-inner">
          {categoriesSet.map((title, index) => {
            return <CategoryCard key={index} setNumber={index} title={title} image={cardsSet[index][2].image} />;
          })}
        </div>
      </div>
    </div>
  );
};
