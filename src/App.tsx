import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Header } from './header/header';
import { Footer } from './footer';
import { Categories } from './categories/categories';
import { WordSet } from './word-set/word-set';
import { IS_MENU_OPENED } from './constants';
import { Statistics } from './statistics/statistics';
import { Modal } from './header/modal';
import { AdminHeader } from './admin-panel/admin-header/admin-header';
import { AdminCategories } from './admin-panel/admin-categories/admin-categories';
import { AdminWords } from './admin-panel/admin-words/admin-words';
import GuardRoute from './services/guard-route';
import { getAllWords } from './services/api';

interface IStatisticsWord {
  word: string;
  translation: string;
  categoryName: string;
  image: string;
  audio: string;
}

const App = () => {
  const [allWords, setAllWords] = useState<IStatisticsWord[]>([]);
  const dispatch = useDispatch();

  const appClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (
      !(e.target as HTMLElement).classList.contains('nav') &&
      !(e.target as HTMLElement).classList.contains('menu') &&
      !(e.target as HTMLElement).classList.contains('line')
    ) {
      dispatch({
        type: IS_MENU_OPENED,
        isMenuOpened: false,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const words = await getAllWords('user');
      setAllWords(words);
    };
    fetchData();
  }, []);

  const initialStorageFill = () => {
    allWords.forEach((card: IStatisticsWord) => {
      const savedCard = localStorage.getItem(card.word);
      if (!savedCard) {
        localStorage.setItem(
          card.word,
          JSON.stringify({
            word: card.word,
            translation: card.translation,
            category: card.categoryName,
            clicks: 0,
            correct: 0,
            wrong: 0,
            percentage: 0,
            image: card.image,
            audio: card.audio,
          }),
        );
      }
    });
  };
  initialStorageFill();

  return (
    <div className="App" onClick={(e) => appClickHandler(e)}>
      <Switch>
        <Route
          path="/"
          render={() => (
            <React.Fragment>
              <Header />
              <Categories />
            </React.Fragment>
          )}
          exact
        />
        <Route
          path={`/wordset/:id`}
          render={(props) => (
            <React.Fragment>
              <Header />
              <WordSet {...props} />
            </React.Fragment>
          )}
        />
        <Route
          path="/statistics"
          render={() => (
            <React.Fragment>
              <Header />
              <Statistics />
            </React.Fragment>
          )}
        />
        <GuardRoute redirectPath="/" path="/admin">
          <Route
            render={() => (
              <React.Fragment>
                <AdminHeader />
                <AdminCategories />
              </React.Fragment>
            )}
          />
        </GuardRoute>
        <GuardRoute redirectPath="/" path="/:categoryId/words">
          <Route
            render={(props) => (
              <React.Fragment>
                <AdminHeader />
                <AdminWords {...props} />
              </React.Fragment>
            )}
          />
        </GuardRoute>
      </Switch>
      <Footer />
      <Modal />
    </div>
  );
};

export default App;
