interface IUpdateAddWord {
  (value: boolean): void
}

interface IProps {
  updateAddWord: IUpdateAddWord
}

export const AddNewAdminWord = (props: IProps) => {
  return (
    <div onClick={() => props.updateAddWord(true)} className="admin-word-card add-admin-word-card">
      <h3 className="add-new-admin-word-header">Add new word</h3>
      <div className="add-category-icon add-word-icon">
        <img src="/assets/icons/add-new.svg" alt="add" />
      </div>
    </div>
  )
}