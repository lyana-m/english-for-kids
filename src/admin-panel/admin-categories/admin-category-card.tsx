import React, { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CATEGORY_ID } from '../../constants';
import { deleteCategory, updateCategory } from '../../services/api';

interface IUpdateIsCategoryUpdated {
  (value: boolean): void;
}

interface IProps {
  name: string;
  count: number;
  id: string;
  updateIsCategoryUpdated: IUpdateIsCategoryUpdated;
}

export const AdminCategoryCard = (props: IProps) => {
  const [isCategoryUpdate, setCategoryUpdate] = useState(false);
  const [categoryName, setCategoryName] = useState(props.name);
  const history = useHistory();
  const dispatch = useDispatch();
  const form = useRef(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCategoryUpdate(false);
    const formData = new FormData(form.current!);
    formData.append('categoryId', props.id);
    await updateCategory(formData);
    props.updateIsCategoryUpdated(true);
  };

  const handleCancel = () => {
    setCategoryUpdate(false);
    setCategoryName(props.name);
  }

  const handleDeleteCategory = async () => {
    await deleteCategory(props.id);
    props.updateIsCategoryUpdated(true);
  };

  return (
    <div className="admin-category-card">
      {!isCategoryUpdate ? (
        <React.Fragment>
          <div onClick={() => handleDeleteCategory()} className="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
                fill="#4fbe79"
              />
            </svg>
          </div>
          <h3 className="admin-category-card-header">{props.name}</h3>
          <p className="admin-category-card-info">words: {props.count}</p>
          <div className="admin-category-card-buttons-container">
            <button onClick={() => setCategoryUpdate(true)} className="admin-button">
              Update
            </button>
            <button
              onClick={() => {
                history.push(`/${props.id}/words`);
                dispatch({ type: CATEGORY_ID, categoryId: props.id });
              }}
              className="admin-button">
              Add word
            </button>
          </div>
        </React.Fragment>
      ) : (
        <form ref={form} onSubmit={(e) => handleSubmit(e)}>
          <input
            name="name"
            className="admin-input update-category-input"
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
            type="text"
            placeholder="Category Name"
          />
          <div className="admin-category-card-buttons-container">
            <button onClick={() => handleCancel()} type="reset" className="admin-button admin-button-red">
              Cancel
            </button>
            <button type="submit" className="admin-button">
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
