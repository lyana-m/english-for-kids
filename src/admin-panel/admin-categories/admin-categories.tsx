import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getCategories } from '../../services/api';
import { AddNewAdminCategory } from './add-new-admin-category';
import { AdminCategoryCard } from './admin-category-card';
import { AdminNewCategory } from './admin-new-category';

interface ICategory {
  _id: string;
  name: string;
  count: number;
}

export const AdminCategories = () => {
  const [addCategory, setAddCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isCategoryAdded, setCategoryAdded] = useState(false);
  const [isCategoryUpdated, setCategoryUpdated] = useState(false);

  const history = useHistory();

  const updateAddCategory = (value: boolean) => {
    setAddCategory(value);
  };

  const updateIsCategoryAdded = (value: boolean) => {
    setCategoryAdded(value);
  };

  const updateIsCategoryUpdated = (value: boolean) => {
    setCategoryAdded(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories('admin');
        setCategories(categories);
      } catch (error) {
        history.push('/');
      }    
    };
    fetchData();
    setCategoryAdded(false);
    setCategoryUpdated(false);
  }, [isCategoryAdded, isCategoryUpdated]);

  return (
    <div className="admin-categories">
      <div className="wrapper">
        <div className="admin-categories-inner">
          {categories && categories.map((category: ICategory) => {
            return <AdminCategoryCard id={category._id} key={category.name} name={category.name} count={category.count} updateIsCategoryUpdated={updateIsCategoryUpdated}/>;
          })}

          {addCategory && <AdminNewCategory updateIsCategoryAdded={updateIsCategoryAdded} updateAddCategory={updateAddCategory}/>}
          <AddNewAdminCategory updateAddCategory={updateAddCategory} />
        </div>
      </div>
    </div>
  );
};
