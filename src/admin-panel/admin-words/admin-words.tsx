import React, { useEffect, useState } from 'react';
import { getWords } from '../../services/api';
import { AddNewAdminWord } from './add-new-admin-word';
import { AdminNewWord } from './admin-new-word';
import { AdminWordCard } from './admin-word-card';
import { RouteComponentProps } from 'react-router-dom';

interface IWord {
  _id: string;
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
  categoryId: string;
}

type TParams =  {[x: string]: string | undefined;  };

export const AdminWords = ({ match }: RouteComponentProps<TParams>) => {
  const [addWord, setAddWord] = useState(false);
  const [words, setWords] = useState<IWord[]>([]);
  const [isUpdateNeeded, setUpdateNeeded] = useState(false);

  const updateAddWord = (value: boolean) => {
    setAddWord(value);
  };

  const updateNeeded = (value: boolean) => {
    setUpdateNeeded(value)
  }

  useEffect(() => {
    const fetchData = async () => {
      const words = await getWords(match.params.categoryId!, 'admin');
      setWords(words);
      setUpdateNeeded(false);
    };
    fetchData();
  }, [isUpdateNeeded]);

  return (
    <div className="admin-words">
      <div className="wrapper">
        <div className="admin-words-inner">
          {words.map((word: IWord) => {
            return (
              <AdminWordCard
                key={word.word}
                word={word.word}
                translation={word.translation}
                image={word.image}
                audio={word.audioSrc}
                id={word._id}
                updateNeeded={updateNeeded}
              />
            );
          })}

          {addWord && <AdminNewWord updateNeeded={updateNeeded} updateAddWord={updateAddWord}/>}
          <AddNewAdminWord updateAddWord={updateAddWord} />
        </div>
      </div>
    </div>
  );
};
