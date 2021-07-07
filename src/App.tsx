import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from './header/header';
import { Footer } from './footer';
import { Categories } from './categories/categories';
import { WordSet } from './word-set/word-set';
import { RootState } from './reducers/rootReducer';
import { IS_MENU_OPENED } from './constants';
import { Statistics } from './statistics/statistics';
import { cardsSet, categoriesSet } from './word-set/cardsProps';

const App = () => {
  const cardSetNumber = useSelector((state: RootState) => state.cardSet?.cardSetNumber);
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

  const initialStorageFill = () => {
    categoriesSet.forEach((set, index) => {
      cardsSet[index].forEach((card) => {
        const savedCard = localStorage.getItem(card.word);
        if (!savedCard) {
          localStorage.setItem(
            card.word,
            JSON.stringify({
              word: card.word,
              translation: card.translation,
              category: set,
              clicks: 0,
              correct: 0,
              wrong: 0,
              percentage: 0,
              image: card.image,
              audio: card.audioSrc,
            }),
          );
        }
      });
    });
  };
  initialStorageFill();
  return (
    <div className="App" onClick={(e) => appClickHandler(e)}>
      <Header />
      <Switch>
        <Route path="/" component={Categories} exact />
        <Route
          path="/wordset"
          render={() => (cardSetNumber === -1 ? <Redirect to="/" /> : <Route path="/wordset" component={WordSet} />)}
        />
        <Route path="/statistics" component={Statistics} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
