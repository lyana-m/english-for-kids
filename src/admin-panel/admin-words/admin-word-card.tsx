import React, { useRef, useState } from 'react';
import { deleteWord, updateWord } from '../../services/api';
import { playSound } from '../../services/utils';

interface IUpdateNeeded {
  (value: boolean): void;
}

interface IProps {
  id: string;
  word: string;
  translation: string;
  image: string;
  audio: string;
  updateNeeded: IUpdateNeeded;
}

export const AdminWordCard = (props: IProps) => {
  const [updateWordMode, setUpdateWordMode] = useState(false);
  const [word, setWord] = useState(props.word);
  const [translation, setTranslation] = useState(props.translation);
  const [imageFileName, setImageFileName] = useState('файл не выбран');
  const [imageFileFullName, setImageFileFullName] = useState('');
  const [audioFileName, setAudioFileName] = useState('файл не выбран');
  const [audioFileFullName, setAudioFileFullName] = useState('');
  // const [audio, setAudio] = useState(props.audio);
  // const [image, setImage] = useState(props.image);
  const form = useRef(null);

  const handleDeleteWord = async () => {
    await deleteWord(props.id);
    props.updateNeeded(true);
  };

  const handleUpdateWord = () => {
    setUpdateWordMode(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateWordMode(false);
    const formData = new FormData(form.current!);
    formData.append('id', props.id);
    await updateWord(formData);
    props.updateNeeded(true);
  };

  const handleCancel = () => {
    setUpdateWordMode(false);
    setWord(props.word);
    setTranslation(props.translation);
  };

  const shorFileName = (name: string) => {
    return name.substring(0, 5) + '...' + name.substring(name.length - 4);
  };

  return (
    <React.Fragment>
      {!updateWordMode ? (
        <div className="admin-word-card">
          <div onClick={() => handleDeleteWord()} className="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
                fill="#4fbe79"
              />
            </svg>
          </div>
          <p className="admin-word-info">
            Word: <span>{props.word}</span>
          </p>
          <p className="admin-word-info">
            Translation: <span>{props.translation}</span>
          </p>
          <p onClick={() => playSound(props.audio)} className="admin-word-info admin-word-info-sound">
            Sound file: <span>{`${props.word}.mp3`}</span>
          </p>
          <p className="admin-word-info">Image: </p>
          <div className="admin-word-image">
            <img src={props.image} alt={props.word} />
          </div>
          <button onClick={() => handleUpdateWord()} className="admin-button admin-word-button">
            Update
          </button>
        </div>
      ) : (
        <form ref={form} onSubmit={(e) => handleSubmit(e)} className="admin-word-card">
          <input
            className="admin-input new-word-input"
            onChange={(e) => setWord(e.target.value)}
            value={word}
            type="text"
            name="word"
            placeholder="Word"
            required
          />
          <input
            className="admin-input new-word-input"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            type="text"
            name="translation"
            placeholder="Translation"
            required
          />
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
            <button onClick={() => handleCancel()} type="reset" className="admin-button admin-button-red">
              Cancel
            </button>
            <button type="submit" className="admin-button">
              Save
            </button>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};
