import { useRef } from "react";
import { createCategory } from "../../services/api";

interface IUpdateIsCategoryAdded {
  (value: boolean): void
}

interface IUpdateAddCategory {
  (value: boolean): void
}

interface IProps {
  updateIsCategoryAdded: IUpdateIsCategoryAdded;
  updateAddCategory: IUpdateAddCategory;
}

export const AdminNewCategory = (props: IProps) => {
  const form = useRef(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(form.current!);
    await createCategory(formData, 'admin');
  }

  return (
    <form ref={form}  onSubmit={(e) => {handleSubmit(e); props.updateIsCategoryAdded(true); props.updateAddCategory(false)}} className="admin-category-card admin-new-category-card">
      <input name="name" className="admin-input new-category-input" type="text" placeholder="Category Name"/>
      <div className="new-category-buttons-container">
        <button onClick={() => props.updateAddCategory(false)} type="reset" className="admin-button admin-button-red">Cancel</button>
        <button type="submit" className="admin-button">Create</button>
      </div>
    </form>
  )
}