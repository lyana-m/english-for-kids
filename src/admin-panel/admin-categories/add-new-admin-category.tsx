interface IUpdateAddCategory {
  (value: boolean): void
}

interface IProps {
  updateAddCategory: IUpdateAddCategory
}

export const AddNewAdminCategory = (props: IProps) => {
  return (
    <div onClick={() => props.updateAddCategory(true)} className="admin-category-card add-category">
      <h3 className="admin-category-card-header">Create new Category</h3>
      <div className="add-category-icon">
        <img src="/assets/icons/add-new.svg" alt="add" />
      </div>
    </div>
  )
}