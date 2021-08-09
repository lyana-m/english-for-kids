import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/api';
import { CategoryCard } from './category-card';

interface ICategory {
  _id: string;
  name: string;
  count: number;
  image: string;
}

export const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {    
    const fetchData = async () => {
        const categories = await getCategories('user');
        setCategories(categories);
    };
    fetchData();
  }, []);

  return (
    <div className="categories">
      <div className="wrapper">
        <div className="categories-inner">
          {categories.map((category, index) => {
            return <CategoryCard key={index} setNumber={index} title={category.name} image={category.image} categoryId={category._id}/>;
          })}
        </div>
      </div>
    </div>
  );
};
