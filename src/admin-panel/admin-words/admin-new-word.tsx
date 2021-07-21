import { useRef, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { createWord } from '../../services/api';

interface IUpdateAddWord {
  (value: boolean): void;
}

interface IUpdateNeeded {
  (value: boolean): void;
}

interface IProps {
  updateNeeded: IUpdateNeeded;
  updateAddWord: IUpdateAddWord;
}

export const AdminNewWord = (props: IProps) => {
  const [imageFileName, setImageFileName] = useState('файл не выбран');
  const [imageFileFullName, setImageFileFullName] = useState('');
  const [audioFileName, setAudioFileName] = useState('файл не выбран');
  const [audioFileFullName, setAudioFileFullName] = useState('');
  const form = useRef(null);

  const categoryId = useSelector((state: RootStateOrAny) => state.cardSet?.categoryId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(form.current!);
    formData.append('categoryId', `${categoryId}`);
    await createWord(formData);
    props.updateNeeded(true);
    props.updateAddWord(false);
  };

  const shorFileName = (name: string) => {
    return name.substring(0, 5) + '...' + name.substring(name.length - 4);
  };

  return (
    <form ref={form} onSubmit={(e) => handleSubmit(e)} className="admin-word-card">
      <input className="admin-input new-word-input" type="text" name="word" placeholder="Word" required />
      <input className="admin-input new-word-input" type="text" name="translation" placeholder="Translation" required />
      <div className="file-input-container">
        <p className="file-input-header" title={audioFileFullName}>
          {audioFileName}
        </p>
        <label className="admin-button file-input file-input-add" htmlFor="upload-sound">
          Audio
          <input
            type="file"
            name="audio"
            onChange={(e) => {
              setAudioFileName(shorFileName(e.target.files![0].name));
              setAudioFileFullName(e.target.files![0].name);
            }}
            id="upload-sound"
            required
          />
        </label>
      </div>
      <div className="file-input-container file-input-container-image">
        <p className="file-input-header" title={imageFileFullName}>
          {imageFileName}
        </p>
        <label className="admin-button file-input file-input-add" htmlFor="upload-image">
          Image
          <input
            type="file"
            name="image"
            onChange={(e) => {
              setImageFileName(shorFileName(e.target.files![0].name));
              setImageFileFullName(e.target.files![0].name);
            }}
            id="upload-image"
            required
          />
        </label>
      </div>
      <div className="new-category-buttons-container">
        <button onClick={() => props.updateAddWord(false)} type="reset" className="admin-button admin-button-red">
          Cancel
        </button>
        <button type="submit" className="admin-button">
          Create
        </button>
      </div>
    </form>
  );
};
